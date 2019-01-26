require('dotenv').config()

let app = require('./server/server');

app.listen(process.env.WEBSERVICE_PORT || '3000', () =>{
	console.log(`Servidor iniciado na porta: ${process.env.WEBSERVICE_PORT || '3000'}`)
})