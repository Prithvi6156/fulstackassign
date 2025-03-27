const http = require('http');
const express = require('express');
const fs = require('fs');
const app = express();

app.use((req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFileSync('server.log', log);
    console.log(log);
    next();
});
app.get('/', (req, res) => {
    res.send('Welcome to the Express.js application!');
});

app.get('/about', (req, res) => {
    res.send('This is an Express.js application for Full Stack Development.');
});

app.listen(3001, () => {
    console.log('Express.js server running on http://localhost:3001');
});
