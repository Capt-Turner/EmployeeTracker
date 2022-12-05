const mysql=require('mysql2');
const sqlUser=process.env.USER;
const pass=process.env.PW;
const db=process.env.DB

const connection=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employees"
});

connection.connect(function(err){
    if(err) throw err;
});

module.exports=connection;