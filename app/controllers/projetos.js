const authMiddleware = require('../middlewares/autenticacao')

module.exports = app => {
    
    app.get('/projetos', authMiddleware, (req, res) => {        
        return res.send({ msg: `Acessou com Sucesso a Rota Protegida, seu id é ${req.usuarioId}` })
    })

}

