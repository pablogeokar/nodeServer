module.exports = app => {

    app.get('/usuarios', async (req, res) => {
        app.app.controllers.usuario.listagem(app, req, res)
    })

    app.post('/usuarios', async (req, res) => {
        app.app.controllers.usuario.novo(app, req, res)
    })

    app.post('/usuarios/autenticacao', async (req, res) => {
        app.app.controllers.usuario.autenticacao(app, req, res)
    })

}