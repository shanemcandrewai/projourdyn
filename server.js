import express from 'express';
import path from 'path';
import log from 'loglevel';

log.enableAll();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'));
});

app.listen(port, () => {
  log.info('Node.js HTTP server listening to port', port);
});
