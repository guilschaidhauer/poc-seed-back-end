const Book = require('../models/book')

module.exports = app => {
    app.get('/books', (req, res) => {
        Book.list(res);
    })

    app.get('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Book.searchById(id, res);
    })

    app.post('/books', (req, res) => {
        const book = req.body;
        
        Book.add(book, res);
    })

    app.patch('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const values = req.body;
        
        Book.patch(id, values, res);
    })

    app.delete('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        
        Book.delete(id, res);
    })
}  