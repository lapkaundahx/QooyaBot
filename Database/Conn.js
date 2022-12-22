const { connect, connection } = require('mongoose');

async function connDatabase(mongoUrl) {
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