const { Pool, Client } = require('pg');

// pools will use environment variables
// for connection information
const pool = new Pool({
  user: 'Sunil',
  host: 'localhost',
  database: 'sdc',
  password: '',
  port: '5432',
});

// Get questions and answers for a passed-in product ID
const getQAs = (product_id, callback) => {
  const combinedQuery = `
    SELECT *,
    (
      SELECT (jsonb_agg(json_build_object(
        'id', answers.id,
        'question_id', answers.question_id,
        'body', answers.body,
        'date_written', answers.date_written,
        'answerer_name', answers.answerer_name,
        'answerer_email', answers.answerer_email,
        'helpful', answers.helpful,
        'photos',
          (
            SELECT (jsonb_agg(answers_photos.url)) AS photos
            FROM answers_photos
            WHERE answers_photos.answer_id = answers.id
          )
      ))) AS answers
      FROM answers
      WHERE question_id = questions.id AND answers.reported = false
    )
    FROM questions
    WHERE product_id = $1 AND questions.reported = false
  `
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(combinedQuery, [product_id]);
      callback(null, res.rows);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
}

// Post a new question for a specified product
const askQuestion = (product_id, text, name, email, callback) => {
  const questionQuery = `
    INSERT INTO questions (
      product_id,
      body,
      date_written,
      asker_name,
      asker_email,
      reported,
      helpful
    )
    VALUES (
      $1, $2, NOW(), $3, $4, false, 0
    )
    RETURNING *
  `
  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(questionQuery, [product_id, text, name, email]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Post a new Answer
const answerQuestion = (question_id, text, name, email, callback) => {
  const answerQuery = `
    INSERT INTO answers (
      question_id,
      body,
      date_written,
      answerer_name,
      answerer_email,
      reported,
      helpful
    )
    VALUES (
      $1, $2, NOW(), $3, $4, false, 0
    )
    RETURNING *
  `

  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(answerQuery, [question_id, text, name, email]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Post a photo to an answer
const addPhoto = (answer_id, url, callback) => {
  const photoQuery = `
    INSERT INTO answers_photos (
      answer_id,
      url,
    )
    VALUES (
      $1, $2
    )
    RETURNING *
  `

  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(photoQuery, [answer_id, url]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Update helpfulness of question
const markQuestionHelpful = (question_id, callback) => {
  const questionHelpfulQuery = `
    UPDATE questions
    SET helpful = helpful + 1
    WHERE question_id = $1
    RETURNING *
  `

  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(questionHelpfulQuery, [question_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Report question
const reportQuestion = (question_id, callback) => {
  const reportQuestionQuery = `
    UPDATE questions
    SET reported = true
    WHERE question_id = $1
    RETURNING *
  `

  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(reportQuestionQuery, [question_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Update helpfulness of answer
const markAnswerHelpful = (answer_id, callback) => {
  const answerHelpfulQuery = `
    UPDATE answers
    SET helpful = helpful + 1
    WHERE answer_id = $1
    RETURNING *
  `

  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(answerHelpfulQuery, [answer_id]);
      callback(null, res);
    } finally {
      client.release();
    }
  })().catch(err => console.log(err.stack));
};

// Report answer
const reportAnswer = (answer_id, callback) => {
  const reportQuestionQuery = `
    UPDATE answers
    SET reported = true
    WHERE answer_id = $1
    RETURNING *
  `

  ; (async () => {
    const client = await pool.connect();
    try {
      const res = await client.query(reportQuestionQuery, [answer_id]);
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