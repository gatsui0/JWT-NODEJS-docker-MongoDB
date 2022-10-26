const mongoose = require('mongoose');
const database = require('./db.config');


const tryConnect = () => {

mongoose.Promise = global.Promise;
mongoose.connect(database.local.localUrlDatabase, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Banco de dados foi conectado com sucesso");
}).catch((err) => {
    console.log(err);
    setTimeout(tryConnect, 5000);
})}

tryConnect();