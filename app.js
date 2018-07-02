const express = require('express');
const path = require('path');
const app = express();

// Load View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Setup public folder
app.use(express.static(path.join(__dirname, 'public')));

// Server Setup
app.listen(3000, () => {
    console.log("Server start on port 3000");
});

// Routing
app.get('/', (req, res) => {
    res.render("index");
});