const customExpress = require('./config/customExpress')
const connection = require('./infraestructure/connection');
const Tables = require('./infraestructure/tables')

connection.connect(error =>  {
    if (error) {
        console.log(error);
    } else {
        console.log("successfully connected");
        
        Tables.init(connection);
        const app = customExpress();

        app.listen(3000, ()=> console.log('server running on port 3000'));
    }
})

