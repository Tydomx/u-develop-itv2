// importing mysql2 package
const mysql = require('mysql2');

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
);

module.exports = db;