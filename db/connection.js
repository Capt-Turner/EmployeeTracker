const mysql=require('mysql2');
const user=process.env.USER;
const pass=process.env.PW;
const db=process.env.DB

const connection=mysql.createConnection({
    host: "localhost",
    user: user,
    password: pass,
    database: db
});

connection.connect(function(err){
    if(err) throw err;
});

module.exports=connection;