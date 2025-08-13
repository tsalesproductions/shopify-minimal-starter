# Boilerplate Shopify Theme

Este é um boilerplate mínimo para iniciar o desenvolvimento de um tema Shopify do zero.

## Estrutura de Pastas

- `layout/` — Layout principal do tema (`theme.liquid`)
- `templates/` — Templates de páginas (home, produto, coleção, busca, etc.)
- `sections/` — Seções reutilizáveis (ex: header, footer)
- `snippets/` — Pequenos trechos de código reutilizáveis
- `assets/` — Arquivos estáticos (CSS, JS, imagens minificadas)
- `config/` — Configurações do tema (`settings_schema.json`)
- `locales/` — Traduções
- `src/scss/` — SASS de desenvolvimento
- `src/js/` — JS de desenvolvimento
- `src/components/` — Componentes reutilizáveis (SASS e JS)
- `src/images/` — Imagens de desenvolvimento (otimizadas para `assets/images/`)

## Desenvolvimento

- Rode `npm install` para instalar as dependências.
- Use `npm run dev` para iniciar o desenvolvimento com live reload (Browsersync).
- Coloque seus arquivos `.scss` em `src/scss/` e componentes em `src/components/`.
- Coloque seus arquivos `.js` em `src/js/` e componentes em `src/components/`.
- Coloque imagens em `src/images/` para serem otimizadas automaticamente.
- Os arquivos minificados finais são gerados em `assets/store.min.css`, `assets/store.min.js` e `assets/images/`.
- Use `npm run lint` para checar padrões de código SASS e JS.

## Scripts úteis
- `npm run dev` — Watch + live reload
- `npm run build` — Build de produção (CSS, JS, imagens)
- `npm run lint` — Lint de SASS e JS
- `npm run serve` — Apenas live reload

## Dicas
- Organize componentes reutilizáveis em `src/components/`.
- Mantenha o README atualizado para facilitar a colaboração. 



## Shopify utils
- (Input Settings)[https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings#range]