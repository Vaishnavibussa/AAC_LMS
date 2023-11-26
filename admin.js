const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'login_details',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

// Handle mentor form submission
app.post('/mentor', (req, res) => {
  const mentorData = {
    AAC_ID: req.body.AAC_ID,
    PASSWORD: req.body.PASSWORD,
    Name: req.body.Name,
    email: req.body.email,    
    phoneno: req.body.phoneno,
    mentor1_id: parseInt(req.body.mentor1_id),    
    mentor2_id: parseInt(req.body.mentor2_id),
  };

  // Insert data into mentor_login table
  db.query('INSERT INTO mentor_login SET ?', mentorData, (err, result) => {
    if (err) throw err;
    console.log('Mentor data inserted:', result);
    res.send('Mentor data inserted successfully!');
  });
});

// Handle mentee form submission
app.post('/mentee', (req, res) => {
  const menteeData = {
    AAC_ID: req.body.AAC_ID,
    PASSWORD: req.body.PASSWORD,
    Name: req.body.Name,
    email: req.body.email,    
    phoneno: req.body.phoneno,
    mentor1_id: parseInt(req.body.mentor1_id),    
    mentor2_id: parseInt(req.body.mentor2_id),
  };

  // Insert data into mentee_login table
  db.query('INSERT INTO mentee_login SET ?', menteeData, (err, result) => {
    if (err) throw err;
    console.log('Mentee data inserted:', result);
    res.send('Mentee data inserted successfully!');
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
