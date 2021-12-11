const connection = require('../infraestructure/connection')
const bcrypt = require('bcrypt')
const JWTHelper = require('../utils/JWTHelper')
require('dotenv').config();

class User {
    async register(user, res) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;

            const sql = 'INSERT INTO users SET ?'

            connection.query(sql, user, (error, results) => {
                if(error) {
                    res.status(400).json(error);
                } else {

                    user.id = results.insertId;
                    res.status(201).json(JWTHelper.getUserToken(user));
                }
            })
        } catch {
            res.status(500).json("Could not register user");
        }
    }

    async login(credentials, res) {
        const sql = `SELECT * FROM users WHERE email='${credentials.email}'`;

        connection.query(sql, (error, results) => {
            let user = results[0];
            if(error) {
                res.status(400).json(error);
            } else {
                this._getUserToken(credentials, user, res);
            }
        })
    }

    logout(req, res) {
        res.json({ auth: false, token: null });
    }

    list(res) {
        const sql = 'SELECT * FROM users';

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                for (let i=0; i<results.length; i++) {
                    results[i] = this._removePasswordHash(results[i]);
                }

                res.status(200).json(results);
            }
        })
    }

    searchById(id, res) {
        const sql = `SELECT * FROM users WHERE id=${id}`;

        connection.query(sql, (error, results) => {
            let user = results[0];
            if(error) {
                res.status(400).json(error);
            } else {
                user = this._removePasswordHash(user);
                res.status(200).json(user);
            }
        })
    }

    patch(id, values, res) {
        delete values.password;

        const sql = 'UPDATE users SET ? WHERE id=?';

        connection.query(sql, [values, id], (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({...values, id});
            }
        })
    }
    
    delete(id, res) {
        const sql = 'DELETE FROM users WHERE id=?';

        connection.query(sql, id, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id});
            }
        })
    }
    
    async _getUserToken(credentials, user, res) {
        try {
            if (await bcrypt.compare(credentials.password, user.password)) {
                return res.status(201).json(JWTHelper.getUserToken(user));
            } else {
                res.status(401).json({message: "Wrong credentials"});
            }
        } catch (e) {
            res.status(500).json({message: "Error authenticating the user"});
        }
    }

    _removePasswordHash(user) {
        delete user.password;
        return user;
    }
}

module.exports = new User