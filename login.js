const mysql=require("mysql");
const express = require("express");
const path = require('path')
const bodyParser=require("body-parser");
const encoder=bodyParser.urlencoded();


const app = express();
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use("/assets", express.static("assets"));
app.use(bodyParser.urlencoded({ extended: true }));

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"login_details"
});

//connect to db

connection.connect(function (error){
    if (error) throw error;
    else console.log("connected to db successfully!!")
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});

app.post("/",encoder,function(req,res){
    var AAC_ID=req.body.AAC_ID;
    var PASSWORD = req.body.PASSWORD;
    var loginType = req.body.loginType;
    var table = loginType == "mentor" ? "mentor_login" : "mentee_login";

    if (!AAC_ID || !PASSWORD) {
        // If AAC_ID or PASSWORD is not filled, show an alert
        return res.send('<script>alert("Please fill in both AAC ID and Password"); window.location="/";</script>');
    }
    
    connection.query(`SELECT * from ${table} where AAC_ID = ? and PASSWORD = ?`,[AAC_ID,PASSWORD],function(error,results,fields){
            if (error) {
                console.error("Error executing the query: " + error.message);
            }
           else if (results && results.length > 0) {
               if(loginType == "mentee"){
                   res.render("welcome", { user_name: results[0].AAC_ID, name: "Hi" });
               }
               else {
                    res.render("mentor", { user_name: results[0].AAC_ID, name:"Hi" });
               }
        }else{
            res.send(
                `<script>
                    alert("Incorrect AAC ID or Password");
                    document.getElementById('popup-msg').innerText = "Incorrect AAC ID or Password";
                </script>`
            );
        }
        res.end();
    
    })
})

//set app port
app.listen(2001);



// const mysql = require("mysql");
// const express = require("express");
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const path = require("path");


// const app = express();
// const encoder = bodyParser.urlencoded({ extended: true });

// // Set up session
// app.use(session({
//     secret: 'your-secret-key',
//     resave: true,
//     saveUninitialized: true
// }));

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
// app.use("/assets", express.static("assets"));
// app.use(bodyParser.urlencoded({ extended: true }));

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "login_details"
// });

// // Connect to the database
// connection.connect((error) => {
//     if (error) throw error;
//     else console.log("Connected to the database successfully!!");
// });

// // Middleware to check if user is logged in
// const isLoggedIn = (req, res, next) => {
//     if (req.session && req.session.user) {
//         return next();
//     } else {
//         res.redirect("/");
//     }
// };

// // Middleware to check if the user has a specific role
// const hasRole = (role) => {
//     return (req, res, next)=>{
//     if (req.session && req.session.user && req.session.user.role === role) {
//       return next();
//   } else {
//       res.redirect("/");
//   }
// };

// };

// // Routes
// app.get("/", (req, res) => {
// res.sendFile(__dirname + "/index.html");
// });

// app.post("/", encoder, (req, res) => {
// const AAC_ID = req.body.AAC_ID;
// const PASSWORD = req.body.PASSWORD;
// const loginType = req.body.loginType;
// const table = loginType === "mentor" ? "mentor_login" : "mentee_login";

// connection.query(`SELECT * from ${table} where AAC_ID = ?`, [AAC_ID], (error, results) => {
//   if (error) {
//       console.error("Error executing the query: " + error.message);
//   } else if (results && results.length > 0) {
//       const user = results[0];

//       bcrypt.compare(PASSWORD, user.PASSWORD, (err, match) => {
//           if (err) throw err;

//           if (match) {
//               req.session.user = {
//                   id: user.id,
//                   AAC_ID: user.AAC_ID,
//                   role: loginType
//               };

//               console.log("User logged in:", req.session.user); // Add this line for debugging

//               if (loginType === "mentee") {
//                   res.render("welcome", { user_name: user.AAC_ID, name: "Hi" });
//               } else {
//                   res.render("mentor", { user_name: user.AAC_ID, name: "Hi" });
//               }
//           } else {
//               res.redirect("/");
//           }
//       });
//   } else {
//       res.redirect("/");
//   }
// });
// });

// app.listen(2001, () => {
// console.log("Server is running on port 2001");
// });

