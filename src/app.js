import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { router } from './routes';

const app = express();

// SERVE IMAGENS STATICAS
app.use('/uploads', express.static(path.resolve(__dirname, '../', 'uploads')));
app.use(express.json());

// Enable CORS
app.use(cors());

// CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://front-imobi.onrender.com');
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(router);

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});

console.log(process.env.DATABASE_URL);
