class Tables {
    init (connection) {
        //this.connection = connection;
        console.log("tables creation was called");

        this.connection = connection;
        this.createBooksTable();
    }

    createBooksTable() {
        const sql = 'CREATE TABLE IF NOT EXISTS books (id int NOT NULL AUTO_INCREMENT, name varchar(50) NOT NULL, description text, price int NOT NULL, PRIMARY KEY(id))';

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