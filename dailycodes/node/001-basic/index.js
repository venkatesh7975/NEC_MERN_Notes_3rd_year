// 001 Basic Node HTTP Server
const http = require('http');

const PORT = 5050;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: true,
    message: 'Native Node.js Server Active',
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`Node basic server running on http://localhost:${PORT}`);
  // Automatically shut down after 2 seconds for runnable demo
  setTimeout(() => {
    server.close();
    console.log('Server demo completed.');
  }, 2000);
});
