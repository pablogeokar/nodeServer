module.exports = app => {

    app.get('/', (req, res) => {
        return res.send({ msg: 'Servidor on-line' })
    })

}