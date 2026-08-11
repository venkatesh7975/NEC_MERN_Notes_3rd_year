// 003 Node Event Emitter & Stream Processing
const EventEmitter = require('events');
const { Readable } = require('stream');

class CourseStreamEmitter extends EventEmitter {}

const emitter = new CourseStreamEmitter();

emitter.on('chunkProcessed', (chunkIndex) => {
  console.log(`[EVENT EMITTER] Stream chunk #${chunkIndex} emitted successfully.`);
});

// Create readable stream from string array
const courseDataChunks = ['[HTML5]', '[CSS3 Grid]', '[JavaScript ES6+]', '[React 19]', '[Node.js API]'];
let index = 0;

const stream = new Readable({
  read() {
    if (index < courseDataChunks.length) {
      const data = courseDataChunks[index++];
      emitter.emit('chunkProcessed', index);
      this.push(data);
    } else {
      this.push(null); // End of stream
    }
  }
});

stream.on('data', (chunk) => {
  console.log('Stream Received Chunk:', chunk.toString());
});

stream.on('end', () => {
  console.log('Stream reading completed!');
});
