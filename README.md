# POC backend seed project using node.js
Backend seed project based on Node.js. This project is meant to give you a head start in the development of simple or proof of concept projects.

For the backend project please see [poc-seed-front-end](https://github.com/guilschaidhauer/poc-seed-front-end). 

## Prerequisites
- Node.js installed
- [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/) installed

## Project setup
1. Clone this repository locally and navigate into it
    ```sh
    git clone https://github.com/guilschaidhauer/poc-seed-front-end.git
    cd poc-seed-back-end
    ```
2. Install all dependencies
    ```sh
    npm install
    ```
3. Create an SQL Database following the guide [here](https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html).

4. Update the "connection.json" file with the information from the Database connection you created on step 3
    ```
    const connection = mysql.createConnection({
      host: 'localhost',
      port: 3307, 
      user: 'root',
      password: '1234',
      database: 'library'
    });
    ```

## Running project locally
1. Start a local server and run the application (http://localhost:3000)
    ```sh
    npm start
    ```
2. Test the project by opening http://localhost:3000/books. You should receive a json file as a response.
