const mysql = require('mysql2');

//connect to database
const db =mysql.createConnection(
    {
    host: 'localhost',
    //your MYSQL username,
    user:'root',
    //Your mySQL password
    password: 'password',
    database: 'election'
    },
    console.log('connected to the election database.')
);

module.exports=db;