const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UsuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}, lowercase: true},
    senha: {type: String, required: true, select: false},
    data_criacao: {type: Date, default: Date.now }
})

UsuarioSchema.pre('save',async function(next){
    const hash = await bcrypt.hash(this.senha, 10)
    this.senha = hash
})

module.exports = mongoose.model('usuarios', UsuarioSchema)