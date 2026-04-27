const express = require("express");
const mysql = require("mysql");
const { resourceLimits } = require("node:worker_threads");

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

//Get all users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if(err){
            res.json({
                err: true,
                message: err
            });
        }else{
            res.json({
                list: result
            });
        }
    })
})

//Create user
app.post("/users", (req, res) => {
    const {name} = req.body;
    db.query("INSERT INTO users (name) VALUES (?)", [name], (err, result) => {
        if(err){
            res.status(500).json({               
                err: true,
                message: err
            })
        }else{
            res.json({
                message: "User created successfully",
                id: result.insertId
            });
        }
    });
})


//Get user by id
app.get("/users/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "SELECT * FROM users WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    err: true,
                    message: err
                });
            }

            res.json({
                user: result
            });
        }
    );
});

// Update user
app.put("/users/:id", (req, res) => {

    const id = req.params.id;
    const { name } = req.body;

    db.query(
        "UPDATE users SET name = ? WHERE id = ?",
        [name, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    err: true,
                    message: err
                });
            }

            res.json({
                message: "User updated successfully"
            });

        }
    );

});

//Delete
app.delete("/users/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM users WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    err: true,
                    message: err
                });
            }

            res.json({
                message: "User deleted successfully"
            });

        }
    );

});

app.listen(3000, () => {
    console.log("Server is run on port http://localhost:3000");
})

