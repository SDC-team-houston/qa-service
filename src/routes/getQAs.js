// const Router = require('express-promise-router');
const express = require('express');
const router = express.Router();

const db = require('../db');

// const router = new Router();
// router.use(function timeLog)

module.exports = { router };

router.get('/qa/:id', async (req, res) => {
  const { id } = req.params;
  const { question } = await db.query('SELECT * FROM questions WHERE id = $1', [id]);
  const { answers } = await db.query('SELECT * FROM answers WHERE question_id = $1', [id]);
  res.send({ question, answers });
})