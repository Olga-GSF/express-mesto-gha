const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const bodyParser = require('body-parser');

mongoose.connect(MONGO_URL);

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '634f1866af678273c9596322',
  };

  next();
});

app.use(express.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Не найдено' });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
