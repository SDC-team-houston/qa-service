const { Pool } = require('pg');
require('dotenv').config();
const q = require('./questionQueries.js');
const a = require('./answerQueries.js')

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATA,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

/* QUESTIONS =============================================== */

// Get questions and answers for a passed-in product ID
const getQAs = (product_id, callback) => {
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(q.getAll, [product_id]);
      callback(null, res.rows);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Post a new question for a specified product
const askQuestion = (product_id, text, name, email, callback) => {
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(q.askQuestion, [product_id, text, name, email]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Update helpfulness of question
const markQuestionHelpful = (question_id, callback) => {
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(q.markQuestionHelpful, [question_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Report question
const reportQuestion = (question_id, callback) => {
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(q.reportQuestion, [question_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

/* ANSWERS =============================================== */

// Post a new Answer
const answerQuestion = (question_id, text, name, email, callback) => {
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(a.answerQuestion, [question_id, text, name, email]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Post a photo to an answer
const addPhoto = (answer_id, url, callback) => {
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(a.answerPhoto, [answer_id, url]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Update helpfulness of answer
const markAnswerHelpful = (answer_id, callback) => {
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(a.markAnswerHelpful, [answer_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Report answer
const reportAnswer = (answer_id, callback) => {
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(a.reportAnswer, [answer_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};


module.exports = {
  getQAs,
  askQuestion,
  answerQuestion,
  addPhoto,
  markQuestionHelpful,
  markAnswerHelpful,
  reportQuestion,
  reportAnswer
};
