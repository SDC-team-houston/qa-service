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
FROM '/Users/Sunil/HackReactor/coding/sdc-qa/qa-service/data/csv/transformedQuestions.csv'
DELIMITER ','
CSV HEADER;