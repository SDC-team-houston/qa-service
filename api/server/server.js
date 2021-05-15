const express = require('express');
const queries = require('../db/queries.js');
const cors = require('cors');
const loader = require('./loader.txt');

const app = express();

app.use(cors());

// just making the sure the server by itself is working!
app.get(`/test`, (req, res) => {
  res.send('Hello!')
});

// loader.io get request
app.get(`/loaderio-ce4e83dc4c356f2e672c834e1d566dd7`, (req, res) => {
  res.send(loader);
});

// Get questions and answers for a specified product
app.get(`/qa/:id`, (req, res) => {
  const product_id = req.params.id;
  queries.getQAs(product_id, (err, questionsAnswers) => {
    if (err) {
      res.status(400).send('Data not found.');
    } else {
      res.send(questionsAnswers);
    }
  });
});

// Post a new question for a specified product
app.post(`/qa/:id`, (req, res) => {
  const product_id = req.params.id;
  const { text, name, email } = req.query;

  queries.askQuestion(product_id, text, name, email, (err, response) => {
    if (err) {
      res.status(400).send('Post unsuccessful.');
    } else {
      res.send('Question posted!');
    }
  });
});

// Post an answer to a specified question
app.post(`/qa/questions/:id/`, (req, res) => {
  const question_id = req.params.id;
  const { text, name, email } = req.query;

  queries.answerQuestion(question_id, text, name, email, (err, response) => {
    if (err) {
      res.status(400).send('Post unsuccessful.');
    } else {
      res.send('Answer posted!');
    }
  });
});

// Post a photo to attach to an answer
app.post(`/qa/answers/:id/`, (req, res) => {
  const answer_id = req.params.id;
  const url = req.query.url;

  queries.addPhoto(answer_id, url, (err, response) => {
    if (err) {
      res.status(400).send('Post unsuccessful.');
    } else {
      res.send('Photo posted!');
    }
  });
});

// Update helpfulness of question
app.put(`/qa/questions/:id/helpful`, (req, res) => {
  const question_id = req.params.id;
  queries.markQuestionHelpful(question_id, (err, response) => {
    if (err) {
      res.status(400).send('Post unsuccessful.');
    } else {
      res.send('Question marked as helpful!');
    }
  });
});

// Report question
app.put(`/qa/questions/:id/report`, (req, res) => {
  const question_id = req.params.id;
  queries.reportQuestion(question_id, (err, response) => {
    if (err) {
      res.status(400).send('Post unsuccessful.');
    } else {
      res.send('Question reported!');
    }
  });
});

// Update helpfulness of answer
app.put(`/qa/answers/:id/helpful`, (req, res) => {
  const answer_id = req.params.id;
  queries.markAnswerHelpful(answer_id, (err, response) => {
    if (err) {
      res.status(400).send('Post unsuccessful.');
    } else {
      res.send('Question marked as helpful!');
    }
  });
});

// Report answer
app.put(`/qa/answers/:id/report`, (req, res) => {
  const answer_id = req.params.id;
  queries.reportAnswer(answer_id, (err, response) => {
    if (err) {
      res.status(400).send('Post unsuccessful.');
    } else {
      res.send('Answer reported!');
    }
  });
});

const PORT = 3004;

app.listen(PORT, () => {
  console.info(`listening on ${PORT}...`);
});
