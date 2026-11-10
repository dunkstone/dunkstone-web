// Deters casual saving of the studio's artwork: no "Save image" menu and no drag-out on pictures.
// Text stays selectable and text links keep their menu. Screenshots and dev tools still work; see README.
(() => {
  const picture = event => event.target instanceof Element && event.target.closest('img, video, picture');
  for (const type of ['contextmenu', 'dragstart']) {
    document.addEventListener(type, event => { if (picture(event)) event.preventDefault(); });
  }
})();
