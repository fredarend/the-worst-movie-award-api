# The Worst Movie Award API

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm (versão 6 ou superior)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/the-worst-movie-award-api.git
   cd the-worst-movie-award-api
   ```

2. Instale as dependências:

   ```bash
   npm i
   ```

3. Inicie o servidor:

   ```bash
   npm run start
   ```

4. Acesse a API em [http://localhost:3000/api/producers/awards/intervals](http://localhost:3000/api/producers/awards/intervals).

## Testes

Para rodar os testes, execute:

```bash
npm run test
```

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte forma:

```
the-worst-movie-api/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middlewares/
│   ├── migrations/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── types/
├── tests/
├── package.json
├── README.md
└── tsconfig.json
```

- **src/config/**: Contém arquivos de configuração.
- **src/controllers/**: Contém os controladores da aplicação.
- **src/data/**: Contém arquivos de dados estáticos.
- **src/middlewares/**: Contém middlewares da aplicação.
- **src/migrations/**: Contém arquivos de migração de banco de dados.
- **src/models/**: Contém os modelos de dados.
- **src/repositories/**: Contém a lógica de acesso a dados.
- **src/routes/**: Contém as definições de rotas.
- **src/services/**: Contém a lógica de negócios.
- **src/types/**: Contém definições de tipos TypeScript.
- **tests/**: Contém os testes da aplicação.
