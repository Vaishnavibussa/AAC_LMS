const express = require('express');
const mysql = require('mysql');
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

// Serve HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '../html/mymentor.html');
});

// Endpoint to fetch mentor details
app.get('/mentors', (req, res) => {
  // Replace 'loggedInUser' with the actual user ID or AAC ID of the logged-in user
  const loggedInUser = 'AAC_ID';  // Replace with actual logged-in user's AAC_ID

  // Fetch mentor details based on mentor1_id and mentor2_id
  db.query(
    'SELECT m1.Name AS mentor1_name, m1.email AS mentor1_email, m1.phoneno AS mentor1_phoneno, m2.Name AS mentor2_name, m2.email AS mentor2_email, m2.phoneno AS mentor2_phoneno ' +
    'FROM mentee_login AS mentee ' +
    'JOIN mentor_login AS m1 ON mentee.mentor1_id = m1.AAC_ID ' +
    'JOIN mentor_login AS m2 ON mentee.mentor2_id = m2.AAC_ID ' +
    'WHERE mentee.AAC_ID = ?',
    [loggedInUser],
    (error, results, fields) => {
      if (error) {
        console.error('Error fetching mentor details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        if (results.length > 0) {
          const mentorDetails = {
            mentor1: {
              name: results[0].mentor1_name,
              email: results[0].mentor1_email,
              phoneno: results[0].mentor1_phoneno,
            },
            mentor2: {
              name: results[0].mentor2_name,
              email: results[0].mentor2_email,
              phoneno: results[0].mentor2_phoneno,
            },
          };
          res.json(mentorDetails);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
