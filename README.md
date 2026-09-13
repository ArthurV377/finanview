# FinanView

## Autor
Arthur Valéiro Cavalcante Costa — Matrícula: 22612204

## Descrição
O FinanView é uma aplicação web para conversão de moedas. O usuário informa um valor, escolhe a moeda de origem e a moeda de destino, e a aplicação consulta uma API pública para apresentar o resultado e os detalhes da cotação.

## API utilizada

- **Frankfurter API**
- Documentação: https://frankfurter.dev/
- Endpoint utilizado:
  `https://api.frankfurter.dev/v2/rate/{moeda_origem}/{moeda_destino}`

A API é pública e não exige chave de autenticação.

## Funcionalidades

- Conversão entre diferentes moedas.
- Consulta assíncrona usando `fetch()`.
- Exibição do valor convertido.
- Exibição da moeda de origem e da moeda de destino.
- Exibição da taxa de câmbio.
- Exibição da data da cotação.
- Botão para inverter as moedas.
- Mensagem de carregamento durante a consulta.
- Tratamento de erros quando a API não responde ou a consulta é inválida.
- Interface responsiva para computador e celular.
- Botão para limpar a conversão.

## Como executar localmente

1. Clone o repositório:

   `git clone https://github.com/ArthurV377/finanview.git`

2. Entre na pasta do projeto.
 cd finanview

4. Abra o arquivo `index.html` no navegador.

Também é possível usar a extensão **Live Server** no VS Code.

## Estrutura

```text
finanview/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Links

- **Aplicação no ar (GitHub Pages):** https://arthurv377.github.io/finanview/
- **Repositório:** https://github.com/ArthurV377/finanview
## Tecnologias

- HTML5
- CSS3
- JavaScript
- Fetch API
- Frankfurter API
- Git e GitHub
- GitHub Pages
