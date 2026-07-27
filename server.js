/**
 * PORTFOLIO SERVER & DATABASE API
 * ================================
 * Node.js server that serves static portfolio files and handles contact form submissions,
 * saving all messages into a database file (database/contacts.json).
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DB_DIR = path.join(__dirname, 'database');
const DB_FILE = path.join(DB_DIR, 'contacts.json');

// Ensure database directory and file exist
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), 'utf8');
}

// MIME types for static files
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Handle Contact Form Submission API Endpoint
  if (req.url === '/api/contact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);

        if (!data.name || !data.email || !data.message) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Name, email, and message are required.' }));
          return;
        }

        const newSubmission = {
          id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
          name: data.name.trim(),
          email: data.email.trim(),
          message: data.message.trim(),
          submittedAt: new Date().toISOString()
        };

        // Read existing database
        let dbRecords = [];
        try {
          const rawData = fs.readFileSync(DB_FILE, 'utf8');
          dbRecords = JSON.parse(rawData);
        } catch (e) {
          dbRecords = [];
        }

        // Add new record & save
        dbRecords.push(newSubmission);
        fs.writeFileSync(DB_FILE, JSON.stringify(dbRecords, null, 2), 'utf8');

        console.log(`[Database] New message saved from: ${newSubmission.name} (${newSubmission.email})`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          message: 'Data successfully saved to database.',
          id: newSubmission.id
        }));
      } catch (err) {
        console.error('[Database Error]', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Failed to save submission to database.' }));
      }
    });
    return;
  }

  // Handle API Endpoint to Fetch Database Submissions (for testing/admin view)
  if (req.url === '/api/contact' && req.method === 'GET') {
    try {
      const rawData = fs.readFileSync(DB_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(rawData);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Could not read database' }));
    }
    return;
  }

  // Static File Server
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  filePath = decodeURIComponent(filePath);

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`[Portfolio Server] Running at http://localhost:${PORT}`);
  console.log(`[Database] File storage initialized at ${DB_FILE}`);
});
