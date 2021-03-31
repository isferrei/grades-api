import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

const { readFile, writeFile } = fs;

router.post('/', async (req, res) => {
  try {
    let grade = req.body;

    const data = JSON.parse(await readFile('grades.json'));

    grade.id = data.nextId;
    data.nextId++;
    data.grades.push(grade);

    await writeFile('grades.json', JSON.stringify(data));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;
