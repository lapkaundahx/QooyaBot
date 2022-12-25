const { connect, connection } = require('mongoose');

let url = "mongodb+srv://sqooya:zxc228zxc@cluster0.rnjkahc.mongodb.net/?retryWrites=true&w=majority";

async function connDatabase(url) {
    connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.once("open", () => {
        console.log('Database is ready!');
    });
    return;
};

module.exports = { connDatabase };