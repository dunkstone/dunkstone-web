# Passo a passo: www e buscadores

O domínio `dunkstone.com` tem o DNS na **GoDaddy** (servidores `domaincontrol.com`), e o site é hospedado na **Vercel**.

O `www` já aponta para o site, mas a Vercel ainda não conhece esse endereço, e por isso ele dá erro de certificado.

## 1. www.dunkstone.com → dunkstone.com (Vercel + GoDaddy)

### Na Vercel
1. Entre em vercel.com e abra o projeto do site (o que publica o repositório `dunkstone/Website`).
2. Vá em **Settings → Domains**.
3. Em **Add Domain**, digite `www.dunkstone.com` e confirme.
4. Se a Vercel perguntar como tratar o domínio, escolha **Redirect to dunkstone.com** (redirecionamento 308, permanente). Se ela adicionar sem perguntar, clique em **Edit** no `www.dunkstone.com` e marque o redirecionamento para `dunkstone.com`.
5. A Vercel mostra o registro DNS que espera. Normalmente é um **CNAME** `www` com o valor `cname.vercel-dns.com`, ou um valor próprio do projeto. Anote o valor que ela mostrar.

### Na GoDaddy
1. Entre em godaddy.com e vá em **Meus produtos → dunkstone.com → DNS** (ou "Gerenciar DNS").
2. Encontre o registro **CNAME** de nome `www`. Hoje ele aponta para `dunkstone.com` (ou `@`).
3. Clique em editar, troque o valor pelo que a Vercel mostrou e salve.
4. Não mexa no registro **A** do `@`: é ele que mantém o `dunkstone.com` no ar.

### Conferir
- Volte em **Settings → Domains** na Vercel. Em alguns minutos (às vezes até uma hora), o `www.dunkstone.com` fica com o selo **Valid Configuration**, e a Vercel emite o certificado sozinha.
- Abra `https://www.dunkstone.com`. Ele deve ir direto para `https://dunkstone.com/`, sem aviso de segurança.

## 2. Google Search Console

1. Abra **search.google.com/search-console** com a conta Google do estúdio. Use uma conta que os dois sócios possam acessar, ou adicione o outro como proprietário depois.
2. Clique em **Adicionar propriedade** e escolha **Domínio** (a opção da esquerda, não "Prefixo do URL"). Digite `dunkstone.com` e clique em **Continuar**.
3. O Google mostra um registro **TXT** que começa com `google-site-verification=...`. Copie esse texto.
4. Na GoDaddy, em **DNS**, clique em **Adicionar novo registro** e preencha:
   - Tipo: **TXT**
   - Nome: **@**
   - Valor: o texto copiado do Google
   - TTL: o padrão (1 hora)

   Salve.
5. Volte ao Search Console e clique em **Verificar**. Se aparecer "não encontrado", espere de 10 a 30 minutos e tente de novo: o DNS leva um tempo para propagar.
6. Com a propriedade verificada, vá em **Sitemaps** no menu da esquerda. O campo já mostra `https://dunkstone.com/`: complete com `sitemap.xml` e clique em **Enviar**. O status deve ficar "Processado".
7. Opcional, para acelerar: em **Inspeção de URL**, cole `https://dunkstone.com/` e clique em **Solicitar indexação**. Repita com `https://dunkstone.com/cargoahoy/`.
8. Para conferir os dados estruturados, abra **search.google.com/test/rich-results** e cole `https://dunkstone.com/cargoahoy/`. Ele deve reconhecer o jogo e o estúdio sem erros.

> Deixe o registro TXT na GoDaddy para sempre: se ele for apagado, o Google perde a verificação.

## 3. Bing Webmaster Tools (alimenta o Copilot e parte do ChatGPT)

1. Abra **bing.com/webmasters** e entre com a mesma conta Google, ou com uma conta Microsoft.
2. Escolha **Importar do Google Search Console**, autorize e selecione `dunkstone.com`. O Bing copia a verificação e o sitemap, sem precisar de outro registro no DNS.
3. Depois de importado, confira em **Sitemaps** se `https://dunkstone.com/sitemap.xml` aparece. Se não aparecer, adicione-o ali.
4. Opcional: em **IndexNow** ou **Envio de URL**, envie as duas páginas principais para o Bing rastrear logo.

## Quanto tempo leva
- O www funciona em minutos, no máximo em algumas horas.
- O Google costuma começar a mostrar o site nas buscas por "Dunkstone" e "Cargo Ahoy" em alguns dias a duas semanas. Os relatórios do Search Console aparecem depois de 2 a 3 dias.
