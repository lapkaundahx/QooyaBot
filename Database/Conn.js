const { connect, connection } = require('mongoose');

async function connDatabase() {
    connect('mongodb+srv://sqooya:zxc228zxc@cluster0.rnjkahc.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.once("open", () => {
        console.log('Database is ready!');
    });
    return;
};

module.exports = { connDatabase };