// importing express
const express = require('express');
// adding PORT designation and app expression
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// route that handles user requests that aren't supported by the app
// default response for any other request (NOT FOUND)
app.use((req, res) => {
	res.status(404).end();
});

// function that starts Express.js server on PORT 3001
app.listen(PORT, () => {
	console.log(`Server running on PORT ${3001}`);
});