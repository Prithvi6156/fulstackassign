// Import required modules
const http = require('http');
const express = require('express');
const fs = require('fs');
const app = express();

// Create a Node.js web server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Full Stack Development');
});

// Start the Node.js server on port 3000
server.listen(3000, () => {
    console.log('Node.js server running on http://localhost:3000');
});

// Middleware for logging incoming requests
app.use((req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFileSync('server.log', log);
    console.log(log);
    next();
});

// Express.js routes
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js application!');
});

app.get('/about', (req, res) => {
    res.send('This is an Express.js application for Full Stack Development.');
});

// Start the Express.js server on port 3001
app.listen(3001, () => {
    console.log('Express.js server running on http://localhost:3001');
});
