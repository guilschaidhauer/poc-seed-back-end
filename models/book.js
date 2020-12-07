const moment = require('moment')
const connection = require('../infraestructure/connection')

class Book {
    add(book, res) {
        const sql = 'INSERT INTO books SET ?'

        connection.query(sql, book, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(201).json(book);
            }
        })
    }

    list(res) {
        const sql = 'SELECT * FROM books';

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(results);
            }
        })
    }

    searchById(id, res) {
        const sql = `SELECT * FROM books WHERE id=${id}`;

        connection.query(sql, (error, results) => {
            const book = results[0];
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(book);
            }
        })
    }

    patch(id, valores, res) {
        if(valores.data){
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss');
        }

        const sql = 'UPDATE books SET ? WHERE id=?';

        connection.query(sql, [valores, id], (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({...valores, id});
            }
        })
    }
    
    delete(id, res) {
        const sql = 'DELETE FROM books WHERE id=?';

        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id});
            }
        })
    }
}

module.exports = new Book