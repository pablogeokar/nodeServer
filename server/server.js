const path = require('path')
const express = require('express')
const app = express()
const helmet = require('helmet')
const consign = require('consign')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const expressSession = require('express-session')

/**
 *  CONFIGURAÇÕES DO MÓDULO EXPRESS
 */
app.set('views', path.join('app', 'views'))
app.set('view engine', 'ejs')

/**
 *  MIDDLEWARES
 */
/* helmet para fornecer uma camada extra de segurança no servidor */
app.use(helmet())
/* configurar o middleware express static (pasta public) */
app.use(express.static(path.join('app', 'public')))
/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({ extended: false }))
/* configurar o middleware express-validator */
app.use(expressValidator())
/** configurar o middleware express-session */
app.use(expressSession({
	secret: process.env.SESSION_SECRET || 'chave Secreta',
	resave: false,
	saveUninitialized: false
}));
/** configura resposta fake, induzindo o invasor a creditar que o app funciona com PHP */

app.use((req,res,next) => {
	res.set('X-Powered-By', 'PHP/7.1.7')
	next()
})


/**
 *  AUTOLOAD utilizando o consign (usar com atenção a fim de evitar muito acoplamento na aplicação)
 */
consign()
	.include(path.join('app', 'routes'))
	.then(path.join('app', 'controllers'))
.into(app)

require('./database')

/* exportar o objeto app */
module.exports = app

