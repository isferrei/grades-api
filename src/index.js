import express from 'express';
import gradesRoute from './routes/grades.js';
import { promises as fs, writeFile } from 'fs';

const app = express();
app.use(express.json());

app.use('/grades', gradesRoute);

app.listen(3000, async () => {
  grades: [];
  try {
    await fs.readFile('grades.json');
    console.log('API STARTED');
  } catch (err) {
    const grades = {
      nextId: 1,
      grades: [],
    };
    writeFile('grades.json', JSON.stringify(grades))
      .then(() => {
        console.log('FILE CREATED');
      })
      .catch((err) => {
        console.log('ERROR');
      });
  }
});
