class Tables {
    init (connection) {
        //this.connection = connection;
        console.log("tables creation was called");

        this.connection = connection;
        this.createUsersTable();
        this.createBooksTable();
    }

    createUsersTable() {
        const sql = 'CREATE TABLE IF NOT EXISTS users (id int NOT NULL AUTO_INCREMENT, firstName varchar(30) NOT NULL, lastName varchar(40) NOT NULL, email varchar(100) NOT NULL, password CHAR(60) BINARY NOT NULL, PRIMARY KEY(id))';

        this.connection.query(sql, (error => {
            if(error) {
                console.log(error);
            } else {
                console.log("Users table created successfully")
            }
        }));
    }

    createBooksTable() {
        const sql = 'CREATE TABLE IF NOT EXISTS books (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, description text, price int NOT NULL, ownerId int NOT NULL, PRIMARY KEY(id), FOREIGN KEY (ownerId) REFERENCES users(id))';

        this.connection.query(sql, (error => {
            if(error) {
                console.log(error);
            } else {
                console.log("Books table created successfully")
            }
        }));
    }
}

module.exports = new Tables