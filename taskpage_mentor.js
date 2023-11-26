const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3003;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_details" // Replace with your database name
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/taskpage_mentor.html'); // Replace 'index.html' with the actual filename
});

// Endpoint to handle task form submission
app.post('/submitTitleDescriptionDueDate', (req, res) => {
    const { title, description, dueDate } = req.body;

    const insertTaskQuery = `INSERT INTO tasks (title, description, dueDate) VALUES (?, ?, ?)`;

    db.query(insertTaskQuery, [title, description, dueDate], (err, result) => {
        if (err) {
            console.error('Error inserting task:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Task submitted successfully' });
        }
    });
});

// Endpoint to handle link form submission
app.post('/submitLinkAndTime', (req, res) => {
    const { link, time } = req.body;

    const insertLinkQuery = `INSERT INTO links (link, time) VALUES (?, ?)`;

    db.query(insertLinkQuery, [link, time], (err, result) => {
        if (err) {
            console.error('Error inserting link:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json({ message: 'Link submitted successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
