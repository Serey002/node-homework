const express = require("express");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node_homework",
    //My Mysql run on port 3307
    port: 3307
})

//Make sure that database is connected or doesn't connected
db.connect((err) => {
    if(err){
        console.log("Database connection failed", err);
        return;
    }else{
        console.log("Database connected successully");
    }
})


app.listen(3000, () => {
    console.log("Server is run on port http://localhost:3000");
})

