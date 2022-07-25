// importing express
const express = require('express');
// importing mysql2 package
const mysql = require('mysql2');
// adding PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();
// import function that returns error message to client as 400 status code, to prompt for diff user request w JSON object that contains the reasons for the errors
const inputCheck = require('./utils/inputCheck');

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
// GET ALL candidates
app.get('/api/candidates', (req, res) => {
	const sql = `SELECT * FROM candidates`;

	db.query(sql, (err, rows) => {
		if (err) {
			res.status(500).json({ error: err.message });
			return;
		}
		res.json({
			message: 'success',
			data: rows
		});
	});
});



// create query for READ operation
// GET a single candidate
app.get('/api/candidate/:id', (req, res) => {
	const sql = `SELECT * FROM candidates WHERE id = ?`;
	const params = [req.params.id];

	db.query(sql, params, (err, row) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: 'success',
			data: row
		});
	});
});


// create Query for Delete operation
// Delete a candidate
app.delete('/api/candidate/:id', (req, res) => {
	const sql = `DELETE FROM candidates WHERE id = ?`;
	const params = [req.params.id];

	db.query(sql, params, (err, result) => {
		if (err) {
			res.statusMessage(400).json({ error: err.message });
		} else if (!result.affectedRows) {
			res.json({
				message: 'Candidate not found'
			});
		} else {
			res.json({
				message: 'deleted',
				changes: result.affectedRows,
				id: req.params.id
			});
		}
	});
});


// create query for CREATE operation
// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
	// validate user data before changes are inserted into database
	const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
	if (errors) {
		res.status(400).json({ error: errors });
		return;
	}

	// db call for POST 
	const sql = `INSERT INTO candidates (first_name, last_name, industry_connected)
	VALUES (?,?,?)`;
	const params = [body.first_name, body.last_name, body.industry_connected];

	db.query(sql, params, (err, result) => {
		if (err) {
			res.status(400).json({ error: err.message });
			return;
		}
		res.json({
			message: 'success',
			data: body
		});
	});
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