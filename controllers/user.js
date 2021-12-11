const User = require('../models/user')
const JWTHelper = require('../utils/JWTHelper')

module.exports = app => {
    app.get('/users', (req, res, next) => {
        User.list(res);
    })

    app.get('/users/:id', (req, res) => {
        const id = parseInt(req.params.id);

        User.searchById(id, res);
    })

    app.post('/register', (req, res) => {
        const credentials = req.body;
        
        User.register(credentials, res);
    })

    app.post('/login', (req, res) => {
        const user = req.body;
        
        User.login(user, res);
    })

    app.post('/logout', (req, res) => {        
        User.logout(req, res);
    })

    app.patch('/users/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;
        
        User.patch(id, values, res);
    })

    app.delete('/users/:id', (req, res) => {
        const id = parseInt(req.params.id);
        
        User.delete(id, res);
    })
}  