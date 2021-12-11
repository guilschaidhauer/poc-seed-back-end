const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
require('dotenv').config();

class JWTHelper {

    verifyJWT(req, res, next){
        const token = req.headers['x-access-token'];
        if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
        
        jwt.verify(token, process.env.secret, function(err, decoded) {
          if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
          
          req.userId = decoded.returnUser.id;
          next();
        });
    }

    getUserToken(user) {
        const id = user.id; 
        const returnUser = { id: id };

        const token = jwt.sign({ returnUser }, process.env.secret, {
            expiresIn: 300 // expires in 5min
        });

        return { auth: true, token: token };
    }
}

module.exports = new JWTHelper