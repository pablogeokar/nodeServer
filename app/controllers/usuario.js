const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function gerarToken(params = {}) {
    return jwt.sign({ params }, process.env.HASH_JWT || 'P4RGDTA524AFZVAFUSJUPOI42SD89', {
        expiresIn: 86400,
    })
}

module.exports.novo = async (app, req, res) => {
    const { nome, email, senha } = req.body

    try {

        if (await Usuario.findOne({ email: email })) {
            return res.status(400).send({ erro: 'Este usuário já existe no banco de dados' })
        }

        const usuario = new Usuario({ nome, email, senha })
        await usuario.save()
        usuario.senha = undefined
        return res.send({
            usuario,
            token: gerarToken({id: usuario.id})
        })

    } catch (err) {
        return res.status(400).send({ erro: 'Falha ao cadastrar' })
    }
}

module.exports.listagem = async (app, req, res) => {
    const usuarios = await Usuario.find()
    return res.send(usuarios)
}

module.exports.autenticacao = async (app, req, res) => {
    const { nome, email, senha } = req.body
    const usuario = await Usuario.findOne({ email }).select('+senha')

    if (!usuario) {
        return res.status(400).send({ erro: 'Usuário não encontrado' })
    }

    if (!await bcrypt.compare(senha, usuario.senha)) {
        return res.status(400).send({ erro: 'Senha Inválida' })
    }

    usuario.senha = undefined

    return res.send({
        usuario,
        token: gerarToken({ id: usuario.id })
    })
}