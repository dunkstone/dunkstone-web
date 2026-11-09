(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const video = document.getElementById('logo-reveal');
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (video) {
    const stage = video.parentElement;
    const showStatic = () => {
      video.classList.remove('is-playing');
      video.pause();
      stage.classList.add('show-still');
    };
    video.addEventListener('ended', showStatic);
    video.addEventListener('error', showStatic);
    // With multiple <source> elements, failures can fire only on the sources.
    const sources = Array.from(video.querySelectorAll('source'));
    let failedSources = 0;
    sources.forEach(source => source.addEventListener('error', () => {
      failedSources += 1;
      if (failedSources === sources.length) showStatic();
    }));
    video.addEventListener('waiting', () => video.classList.remove('is-playing'));
    video.addEventListener('playing', () => {
      if (motion.matches) showStatic();
      else video.classList.add('is-playing');
    });
    motion.addEventListener('change', event => { if (event.matches) showStatic(); });
    if (motion.matches) showStatic();
    else {
      video.muted = true;
      video.play().catch(showStatic);
    }
  }

  const list = document.getElementById('game-list');
  const games = window.DUNKSTONE_GAMES || [];
  if (!list || !games.length) return;

  // Live listings turn the matching official badge into a link; until then the badge stays unlinked.
  const linkBadges = (article, game) => {
    for (const [key, name, selector] of [
      ['appStoreUrl', 'App Store', '.store-badge--apple'],
      ['playStoreUrl', 'Google Play', '.store-badge--google']]) {
      const badge = article.querySelector(selector);
      if (!game[key] || !badge || badge.closest('a')) continue;
      try {
        const url = new URL(game[key]);
        if (url.protocol !== 'https:') continue;
        const link = document.createElement('a');
        link.href = url.href;
        link.setAttribute('aria-label', `${game.title} on ${name}`);
        badge.replaceWith(link);
        link.append(badge);
        link.nextElementSibling?.remove();
      } catch { /* Leave the badge unlinked until the URL is corrected. */ }
    }
  };

  const entries = games.map(game => {
    // Reuse the accessible, server-readable feature instead of duplicating it.
    const featured = Array.from(list.children).find(article =>
      article.querySelector('h3')?.textContent.trim() === game.title);
    const article = featured || document.createElement('article');
    article.classList.add('game-entry');
    if (!featured) {
      if (game.artwork) {
        const image = document.createElement('img');
        image.className = 'catalogue-artwork';
        image.src = game.artwork;
        image.alt = `${game.title} game artwork`;
        image.loading = 'lazy';
        article.append(image);
      }
      const details = document.createElement('div');
      details.className = 'game-details';
      const title = document.createElement('h3');
      title.textContent = game.title;
      const description = document.createElement('p');
      description.className = 'game-description';
      description.textContent = game.description || '';
      details.append(title, description);
      const platforms = document.createElement('div');
      platforms.className = 'game-platforms';
      details.append(platforms);
      article.append(details);
    }
    const details = article.querySelector('.game-details');
    const heading = details.querySelector('h3');
    heading.textContent = game.title;
    if (!featured && game.url?.startsWith('/')) {
      const link = document.createElement('a');
      link.href = game.url;
      link.textContent = game.title;
      heading.replaceChildren(link);
    }
    details.querySelector('.game-description').textContent = game.description || '';
    const artwork = article.querySelector('.game-entry-icon, .catalogue-artwork');
    if (artwork && game.artwork) artwork.src = game.artwork;
    const platforms = article.querySelector('.game-platforms');
    let status = platforms.querySelector('.development');
    if (!status) {
      status = document.createElement('span');
      status.className = 'development';
    }
    // Keep the pill's dot: only its text changes.
    status.replaceChildren(...status.querySelectorAll('.status-dot'), ` ${game.status || 'In development'}`);
    platforms.replaceChildren(status);
    if (Array.isArray(game.platforms) && game.platforms.length) {
      const text = document.createElement('p');
      text.textContent = `Planned for ${game.platforms.join(', ')}`;
      platforms.append(text);
    }
    linkBadges(article, game);
    return article;
  });
  list.replaceChildren(...entries);
})();
