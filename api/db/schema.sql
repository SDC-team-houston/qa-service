DROP TABLE IF EXISTS questions;

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  body TEXT,
  date_written TIMESTAMP,
  asker_name VARCHAR(50),
  asker_email VARCHAR(50),
  reported BOOLEAN,
  helpful INTEGER
);

-- local machine file path
COPY questions
FROM '/Users/Sunil/HackReactor/coding/sdc/qa-service/api/data/csv/transformedQuestions.csv'
DELIMITER ','
CSV HEADER;

-- docker container file path
COPY questions
FROM '/api/data/csv/transformedQuestions.csv'
DELIMITER ','
CSV HEADER;

ALTER SEQUENCE questions_id_seq
RESTART WITH 3518967;

CREATE INDEX idx_questions_product_id
ON questions(product_id);

/*====================================*/
DROP TABLE IF EXISTS answers;

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER,
  body TEXT,
  date_written TIMESTAMP,
  answerer_name VARCHAR(50),
  answerer_email VARCHAR(50),
  reported BOOLEAN,
  helpful INTEGER
);

-- local machine file path
COPY answers
FROM '/Users/Sunil/HackReactor/coding/sdc/qa-service/src/data/csv/transformedAnswers.csv'
DELIMITER ','
CSV HEADER;

-- docker container file path
COPY answers
FROM '/api/data/csv/transformedAnswers.csv'
DELIMITER ','
CSV HEADER;


ALTER SEQUENCE answers_id_seq
RESTART WITH 6879309;

CREATE INDEX idx_answers_question_id
ON answers(question_id);

/*====================================*/
DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER,
  url VARCHAR
);

-- local machine file path
COPY answers_photos
FROM '/Users/Sunil/HackReactor/coding/sdc/qa-service/src/data/csv/transformedPhotos.csv'
DELIMITER ','
CSV HEADER;

-- docker container file path
COPY answers_photos
FROM '/api/data/csv/transformedPhotos.csv'
DELIMITER ','
CSV HEADER;

ALTER SEQUENCE answers_photos_id_seq RESTART WITH 2063761;

CREATE INDEX idx_photos_answer_id
ON answers_photos(answer_id);