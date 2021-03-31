import express from 'express';
import { promises as fs } from 'fs';

const router = express.Router();

const { readFile, writeFile } = fs;

/* POST */
router.post('/', async (req, res) => {
  try {
    let grade = req.body;

    const data = JSON.parse(await readFile(global.grades));

    grade = { id: data.nextId++, ...grade };
    data.grades.push(grade);

    await writeFile(global.grades, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

/* GET */
router.get('/', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.grades));
    delete data.nextId;

    res.send(data);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.grades));

    const grade = data.grades.find(
      (grade) => grade.id == req.params.id
    ); /*  por ter '==' ele faz conversão para o parseInt automaticamente */

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

/* DELETE */
router.delete('/:id', async (req, res) => {
  try {
    const data = JSON.parse(await readFile(global.grades));

    const grade = data.grades.delete(
      (grade) => grade.id !== parseInt(req.params.id)
    );

    await writeFile(global.grades, JSON.stringify(data, null, 2));

    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

export default router;

/* PUT */
router.put('/', async (req, res) => {
  try {
    const grade = req.body;

    const data = JSON.parse(await readFile(global.grades));
    const index = data.grades.findIndex((a) => a.id === parseInt(grade.id));

    data.grades[index] = grade;

    await writeFile(global.grades, JSON.stringify(data, null, 2));

    res.send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

/* PATCH*/
router.patch('/', async (req, res) => {
  try {
    const grade = req.body;

    const data = JSON.parse(await readFile(global.grades));
    const index = data.grades.findIndex((a) => a.id === parseInt(grade.id));

    data.grades[index].id = grade.id;

    await writeFile(global.grades, JSON.stringify(data, null, 2));

    res.send(data.grades[index]);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
