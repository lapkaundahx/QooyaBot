const mongoose = require('mongoose');

async function connDatabase() {

  mongoose.set('strictQuery', true);

  mongoose.connect('mongodb+srv://sqooya:zxc228zxc@cluster0.rnjkahc.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.once("open", () => {
    console.log('Database is ready!');
  });
  return;
};

module.exports = { connDatabase };