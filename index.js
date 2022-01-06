const express = require('express');
const bodyParser = require('body-parser');

const error = require('./middlewares/error');
const root = require('./controllers/root');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

root(app);

error(app);

app.listen(PORT, () => console.log('ouvindo porta 3000!'));