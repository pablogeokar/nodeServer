const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization    
    if (!authHeader) return res.status(401).send({ erro: 'O Token não foi informado' })

    const parts = authHeader.split(' ')
    if (!parts.length === 2) return res.status(401).send({ erro: 'Erro de Token' })    

    const [ scheme, token] = parts
    if(!/^Bearer$/i.test(scheme)) return res.status(401).send({erro: 'Token malformatado'})

    jwt.verify(token, process.env.HASH_JWT || 'P4RGDTA524AFZVAFUSJUPOI42SD89', (err, decoded) => {
        if(err) return res.status(401).send({erro: 'Token Inválido'})

        req.usuarioId = decoded.params.id 
        return next()
    })
}