import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
  console.log(req.body);
  res.end();
});

export default router;
