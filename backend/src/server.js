const express = require('express');
const routes = require('./routes'); 
const app = express();

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Funcionou a rota?');
});

app.listen(3000, () => {
  console.log("Ouvindo na porta 3000");
});