# Pendências do site

Marque `[x]` quando concluir e apague o item quando não fizer mais falta. Nada aqui vai para o ar: o site publica só a pasta `dist/`.

## Agora
- [ ] **www e buscadores**:
  - Na Vercel, adicionar `www.dunkstone.com` com redirecionamento para `dunkstone.com`.
  - Na GoDaddy, trocar o CNAME do `www` pelo valor que a Vercel indicar.
  - Verificar o domínio no Google Search Console e enviar o `sitemap.xml`.
  - Importar o site no Bing Webmaster Tools.

## No lançamento do Cargo Ahoy
- [ ] **Links das lojas**: preencher `appStoreUrl` e `playStoreUrl` em `dist/games.js`. Os selos viram links sozinhos e a legenda "Coming soon" some.
- [ ] **Dados estruturados do jogo**: acrescentar os links das lojas e a oferta (grátis) ao JSON-LD de `dist/cargoahoy/index.html`. Nota e avaliações só quando forem reais.
- [ ] **Texto de Android**: revisar suporte e privacidade contra as respostas de Data Safety do Play Console quando o Android sair (CargoAhoy M6, D-144).
- [ ] **Privacidade**: atualizar a política e a data sempre que o jogo ganhar ou perder um SDK, em sintonia com `docs/STORE_LISTING.md` do CargoAhoy.
- [ ] **`app-ads.txt`**: acrescentar as linhas de cada nova rede de anúncios que entrar.
- [ ] **Capturas**: recapturar as três telas no Device Simulator sempre que o visual do jogo mudar (veja "Asset provenance" no README).

## Para crescer
- [ ] **Redes sociais do estúdio**: quando existirem, pôr os perfis no rodapé e em `sameAs` no JSON-LD da home.
- [ ] **Página de imprensa** (`/press/`): descrição do estúdio e do jogo, logos, ícone, capturas e contato. Precisa de decisão antes, porque o download de press kit ficou de fora até agora.
- [ ] **Notícias ou devlog**: posts curtos que deem ao Google e às IAs texto para citar.
- [ ] **Métricas de visita**: Vercel Web Analytics, que não usa cookies, mais uma linha sobre o site na política de privacidade.
- [ ] **Português**: versão pt-BR das páginas principais, se o público brasileiro importar.
