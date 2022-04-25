import express from 'express';
import next from 'next';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev: isDevelopment });
const handle = nextApp.getRequestHandler();

const port = process.env.PORT || 3000;

nextApp.prepare().then(() => {
  // use routes
  app.use('/api/video', require('./api/video'));

  app.all('*', (req, res) => handle(req, res));

  app.listen(port, () => console.log(`Server running on port ${port}`));
});