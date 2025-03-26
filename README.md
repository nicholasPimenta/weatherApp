# Weather App

Este projeto é uma aplicação web para exibição da previsão do tempo. Ao informar o nome de uma cidade, o usuário consegue visualizar as condições climáticas atuais, incluindo temperatura, umidade, velocidade do vento, e outras informações relevantes. A aplicação também oferece uma previsão estendida para os próximos dias.

## Funcionalidades

- **Pesquisa por Cidade**: O usuário pode digitar o nome de uma cidade para buscar as condições climáticas atuais.
- **Mensagens de Erro**: Caso o nome da cidade não seja encontrado ou o campo de pesquisa esteja vazio, a aplicação exibe mensagens de erro informando o que ocorreu (ex: "Por favor, digite o nome da cidade" ou "Cidade não encontrada").
- **Exibição de Previsão do Tempo**: Após a pesquisa bem-sucedida, são exibidas informações detalhadas sobre o clima da cidade, como temperatura, umidade, velocidade do vento, entre outras.
- **Previsão Estendida**: Exibe a previsão do tempo para os próximos dias, com as máximas e mínimas de temperatura e ícones representando o clima.
- **Responsividade**: A interface se adapta a diferentes tamanhos de tela, garantindo uma boa experiência de usuário tanto em dispositivos móveis quanto em desktop.

## Tecnologias e Bibliotecas Utilizadas

- **React**: A biblioteca principal para construção da interface do usuário.
- **TypeScript**: Utilizado para tipar o código e garantir a segurança do tipo de dados durante o desenvolvimento.
- **Font Awesome**: Biblioteca para ícones usados na interface, proporcionando uma melhor experiência visual ao usuário.
- **Context API**: Utilizada para gerenciar o estado da aplicação, incluindo o gerenciamento das informações de clima e erros.
- **Tailwind CSS**: Framework de CSS utilitário usado para o estilo e layout da aplicação, garantindo uma construção rápida e responsiva.
- **Vercel**: Plataforma para o deploy do projeto, garantindo alta performance e escalabilidade da aplicação.

## Como Rodar o Projeto Localmente
Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:
   ```sh
   git clone https://github.com/nicholasPimenta/weatherApp.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd info-pc
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Execute o projeto:
   ```sh
   npm run dev
   ```
5. Acesse no navegador:
   ```sh
   http://localhost:5173
   ```

## 🌐 Deploy
O projeto está hospedado na **Vercel** e pode ser acessado através do seguinte link:
[🔗 Weather App - Deploy](https://weather-app-chi-ten-54.vercel.app/)

## 📜 Licença
Este projeto foi desenvolvido para fins de aprendizado e portfólio. Sinta-se à vontade para explorar o código e adaptá-lo conforme necessário.

---
Desenvolvido por **Nicholas Pimenta** 🚀
