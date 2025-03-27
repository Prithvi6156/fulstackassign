const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to Full Stack Development');
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Node.js server running on http://localhost:3000');
});
