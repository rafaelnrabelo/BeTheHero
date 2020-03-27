<h1 align="center">
  <br/>
<img src="https://user-images.githubusercontent.com/55251721/77788953-ee82f880-7040-11ea-9b7b-ecefde44fa78.png" width=250 />

<h2 align="center">
  Projeto da Semana Omnistack 11 <br/> <br/>
  <a href="https://github.com/rafaelnrabelo/BeTheHero#testando">
    <img src="https://img.shields.io/badge/Testing-Install-%23e02041" alt="testing"/>
  </a>
</h2>

![Captura de tela de 2020-03-27 15-08-27 (1)](https://user-images.githubusercontent.com/55251721/77789834-8df4bb00-7042-11ea-99dc-2bddb498646f.png)

#### Dependências do Mobile
  - React Native
  - Expo
  - Axios
  - React Navigation
  - Expo Mail Composer
   
#### Dependências do Front-end
  - ReactJS
  - React Icons
  - Axios
    
#### Dependências do Backend
  - NodeJS
  - Express
  - Knex
  - Jest
  - Celebrate
  - SQLite
   
## Testando:
   1. Clone o repositorio usando `git clone https://github.com/rafaelnrabelo/BeTheHero.git`
   2. Mova para a pasta clonada usando `cd BeTheHero`
  ### Backend
   1. Mova para a pasta backend usando `cd backend`
   2. Instale todas dependecias usando `yarn install`
   4. Execute `yarn knex migrate:latest` para criar as tabelas do banco de dados.
   5. Execute `yarn dev` para iniciar o servidor.
  ### Web
   1. Mova para a pasta web usando `cd web`
   2. Instale todas dependecias usando `yarn install`
   4. Adicione a url de conexão do backend no campo `API_URL` no arquivo `.env.json` na pasta `src`
   5. Execute `yarn start` para iniciar a aplicação web.
  ### Mobile
   1. Mova para a pasta mobile usando `cd mobile`
   2. Instale todas dependecias usando `yarn install`
   4. Adicione a url de conexão do backend no campo `API_URL` no arquivo `.env.json` na pasta `src`
   5. Execute `yarn start` para iniciar o expo.
