const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());

const db = mysql.createConnection({
  host: "mysql-db",
  user: "root",
  password: "root",
  database: "appdb"
});

app.post("/users", (req, res) => {
  db.query("INSERT INTO users (name) VALUES (?)",
    [req.body.name],
    () => res.send("saved")
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.json(result);
  });
});

app.listen(3000, () => console.log("Backend running"));
