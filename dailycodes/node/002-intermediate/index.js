// 002 Asynchronous File Operations
const fs = require('fs').promises;
const path = require('path');

async function runFileOperations() {
  const filePath = path.join(__dirname, 'temp_notes.txt');
  try {
    console.log('Writing file asynchronously...');
    await fs.writeFile(filePath, 'HTML5, CSS3, JavaScript ES6+, React 19, Node.js, Express, MongoDB');
    
    console.log('Reading file asynchronously...');
    const content = await fs.readFile(filePath, 'utf-8');
    console.log('File Content:', content);

    console.log('Cleaning up temp file...');
    await fs.unlink(filePath);
    console.log('File operations complete!');
  } catch (err) {
    console.error('Error handling file:', err);
  }
}

runFileOperations();
