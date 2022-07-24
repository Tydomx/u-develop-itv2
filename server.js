// importing express
const express = require('express');
// importing mysql2 package
const mysql = require('mysql2');
// adding PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connecting app to MySQL database
const db = mysql.createConnection(
	{
		host: 'localhost',
		// MySQL username
		user: 'root',
		// MySQL password
		password: 'Randomsammicat@05',
		database: 'election_db'
	},
	console.log('Connected to the election database.')
);

// returning all data in candidates table
// err = error response, rows = database query response
// db.query(`SELECT * FROM candidates`, (err, rows) => {
// 	console.log(rows);
// });

// create query for READ operation
// GET a single candidate
// db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	console.log(row);
// });

// create Query for Delete operation
// Delete a candidate
// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
// 	if (err) {
// 		console.log(err);
// 	}
// 	console.log(result);
// });

// create query for CREATE operation
// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)\
VALUES (?,?,?,?)`;

const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result) => {
	if (err) {
		console.log(err);
	}
	console.log(result);
});


// route that handles user requests that aren't supported by the app
// default response for any other request (NOT FOUND)
app.use((req, res) => {
	res.status(404).end();
});

// function that starts Express.js server on PORT 3001
app.listen(PORT, () => {
	console.log(`Server running on PORT ${3001}`);
});