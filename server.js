import express from 'express';
import path from 'path';
import log from 'loglevel';

log.enableAll();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('pub'));
app.use(express.static('test'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve('pub/index.html'));
});
app.get('/test', (req, res) => {
  res.sendFile(path.resolve('pub/test/test.html'));
});

app.listen(port, () => {
  log.info('Node.js HTTP server listening to port', port);
});
