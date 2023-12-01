
const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;


app.use(express.static('public'));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_details"
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../../AAC_LMS/mentor/html/createTask.html');
});

// Endpoint to fetch data from the 'tasks' table
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Endpoint to fetch data from the 'links' table
app.get('/links', (req, res) => {
    db.query('SELECT * FROM links', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


