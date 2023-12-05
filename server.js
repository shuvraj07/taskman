import express from 'express';
import dotenv from "dotenv";
//import testDatabaseConnection from './db/db.js';
//import taskRoute from './route/taskRoute';
import { syncDatabase } from './model/registerModel.js';
const app = express();
import router from './route/taskRoute.js'
const port = 3000;
import cors from "cors";
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());



app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello, World from this is for intern project hai !');
});




syncDatabase().then(() => {
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
