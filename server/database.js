const mongoose = require('mongoose')
/** CRIA CONEXÃO AO MONGOOSE */
let uri = `mongodb://${process.env.MONGOOSE_HOST || 'localhost'}:${process.env.MONGOOSE_PORT || '27017'}/${process.env.MONGOOSE_DATABASE || 'app_test'}`

mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
})
.then(db => console.log('Banco de Dados conectado com Sucesso!'))
.catch(err => console.log('ERRO ao conectar ao banco de dados com a url ' + uri + ' ' + err))
