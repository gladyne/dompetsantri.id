const mongoose = require('mongoose');

const connected = async () => {
    //await mongoose.connect('mongodb+srv://gladyne:pinuspintar@cluster0.vu5nyhe.mongodb.net/dompetsantri?retryWrites=true&w=majority');
    await mongoose.connect('mongodb://gladyne:pinuspintar@ac-knblval-shard-00-00.vu5nyhe.mongodb.net:27017,ac-knblval-shard-00-01.vu5nyhe.mongodb.net:27017,ac-knblval-shard-00-02.vu5nyhe.mongodb.net:27017/dompetsantri?ssl=true&replicaSet=atlas-7hwg1w-shard-0&authSource=admin&retryWrites=true&w=majority')
}

connected().then(() => console.log('connected')).catch(err => console.log(err));
