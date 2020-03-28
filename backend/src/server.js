// npm start irá chamar server e iniciar a aplicação e escutar na porta informada
// npm test não irá chamar serve, deixando a aplicaçao indisponível na rede
const app = require('./app');

// escutar na porta
app.listen(3333);