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

COPY questions
FROM '/Users/Sunil/HackReactor/coding/sdc/qa-service/src/data/csv/transformedQuestions.csv'
DELIMITER ','
CSV HEADER;

ALTER SEQUENCE questions_id_seq RESTART WITH 3518964;

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

COPY answers
FROM '/Users/Sunil/HackReactor/coding/sdc/qa-service/src/data/csv/transformedAnswers.csv' DELIMITER ','
CSV HEADER;

ALTER SEQUENCE answers_id_seq RESTART WITH 6879307;

/*====================================*/
DROP TABLE IF EXISTS answers_photos;

CREATE TABLE answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INTEGER,
  url VARCHAR
);

COPY answers_photos
FROM '/Users/Sunil/HackReactor/coding/sdc/qa-service/src/data/csv/transformedPhotos.csv' DELIMITER ','
CSV HEADER;

ALTER SEQUENCE answers_photos_id_seq RESTART WITH 2063760;