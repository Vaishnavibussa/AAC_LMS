const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_details"
});

app.use(express.static('public'));
app.use(express.json());

// Helper function to identify user type (mentor or mentee)
const identifyUserType = (req) => {
    const isMentor = req.headers['user-type'] === 'mentor';
    return isMentor ? 'mentor' : 'mentee';
};

// Submit project endpoint
app.post('/submitProject', upload.single('codeFile'), (req, res) => {
    const userType = identifyUserType(req); // Identify user type

    const { abstract, projectLink } = req.body;
    const codeFile = req.file.buffer;

    const tableName = `projects_${userType}`; // Determine table based on user type

    const insertQuery = `INSERT INTO ${tableName} (project_id, ${userType}_aac_id, abstract, codeFile, projectLink) VALUES (NULL, ?, ?, ?, ?)`;

    db.query(insertQuery, [req.headers['user-id'], abstract, codeFile, projectLink], (err, result) => {
        if (err) {
            console.error('Error submitting project:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const selectQuery = `SELECT * FROM ${tableName} WHERE ${userType}_aac_id = ?`;

            db.query(selectQuery, [req.headers['user-id']], (err, results) => {
                if (err) {
                    console.error('Error fetching projects:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    // After inserting, send the HTML file again to display the updated projects
                    res.sendFile(__dirname + '/individualProjects.html');
                }
            });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/individualProjects.html'); // Replace 'index.html' with your desired file
  });
  
// Fetch projects for a specific user
app.get('/individualProjects.html', (req, res) => {
    const userType = identifyUserType(req); // Identify user type
    const userId = req.headers['user-id']; // Get user's unique ID from headers

    const tableName = `projects_${userType}`; // Determine table based on user type

    const selectQuery = `SELECT * FROM ${tableName} WHERE ${userType}_aac_id = ?`;

    db.query(selectQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching projects:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.status(200).json(results);
        }
    });
});

// ... (other code remains the same)

// Submit project endpoint
app.post('/submitProject', upload.single('codeFile'), (req, res) => {
    const userType = identifyUserType(req); // Identify user type

    const { abstract, projectLink } = req.body;
    const codeFile = req.file.buffer;

    const tableName = `projects_${userType}`; // Determine table based on user type

    const insertQuery = `INSERT INTO ${tableName} (${userType}_aac_id, abstract, codeFile, projectLink) VALUES (?, ?, ?, ?)`;

    db.query(insertQuery, [req.headers['user-id'], abstract, codeFile, projectLink], (err, result) => {
        if (err) {
            console.error('Error submitting project:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const selectQuery = `SELECT * FROM ${tableName} WHERE ${userType}_aac_id = ?`;

            db.query(selectQuery, [req.headers['user-id']], (err, results) => {
                if (err) {
                    console.error('Error fetching projects:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    res.status(200).sendFile(__dirname + '/individualProjects.html');
                }
            });
        }
    });
});

// Fetch and display projects for a specific user
app.get('/individualProjects.html', (req, res) => {
    const userType = identifyUserType(req); // Identify user type
    const userId = req.headers['user-id']; // Get user's unique ID from headers

    const tableName = `projects_${userType}`; // Determine table based on user type

    const selectQuery = `SELECT * FROM ${tableName} WHERE ${userType}_aac_id = ?`;

    db.query(selectQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching projects:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            // Modify this part to render the HTML with the retrieved projects data
            res.sendFile(__dirname + '/individualProjects.html');
        }
    });
});

// ... (rest of the code remains the same)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
