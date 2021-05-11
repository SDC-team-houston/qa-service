// Import required modules
const fs = require('fs');
const moment = require('moment');
const csvParse = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const timer = require('../helpers/timer.js');

// raw/transformed csv files
const inputFile = path.join(__dirname, '/csv/answers.csv');
const transformedFile = path.join(__dirname, '/csv/transformedAnswers.csv');

// holder array for photo rows
let transformedAnswers = [];

// initialize csvWriter
const csvWriter = createCsvWriter({
  path: transformedFile,
  header: [
    { id: 'id', title: 'id' },
    { id: 'question_id', title: 'question_id' },
    { id: 'body', title: 'body' },
    { id: 'date_written', title: 'date_written' },
    { id: 'answerer_name', title: 'answerer_name' },
    { id: 'answerer_email', title: 'answerer_email' },
    { id: 'reported', title: 'reported' },
    { id: 'helpful', title: 'helpful' },
  ]
});

// start timer
const start = new Date();

// Standardize date_written property and filter out incomplete data
const fileStream = fs
  .createReadStream(inputFile)
  .pipe(csvParse())
  .on('error', (error) => {
    console.error(error);
  })
  .on('data', (row) => {
    if (row.helpful) {
      let date = row.date_written;

      if (!date.match(/[A-z]/g)) {
        date = Number(row.date_written);
      }

      date = new Date(date);
      date = moment(date).format();
      row.date_written = date;

      transformedAnswers.push(row);
    }
  })
  // Writing transformed data to new file
  .on('end', async () => {
    const endRaw = new Date();
    console.info(`Raw CSV file successfully processed ✅ ${timer(start, endRaw)} ...`);

    await fs.truncate(transformedFile, 0, () => console.info(`...transformed CSV file emptied, ready to write ✅ ...`));

    // Files are really big! Writing in two parts
    const half = Math.floor(transformedAnswers.length / 2);
    const transformedAnswers1 = transformedAnswers.slice(0, half);
    const transformedAnswers2 = transformedAnswers.slice(half, transformedAnswers.length);

    csvWriter
      .writeRecords(transformedAnswers1)
      .then(() => {
        const write1 = new Date();
        console.info(`...first half of file written ✅ ${timer(endRaw, write1)} ...`);
        csvWriter.writeRecords(transformedAnswers2)
      })
      .then(() => {
        const endWrite = new Date();
        console.info(`...done writing transformed data 🥳 ${timer(write1, endWrite)}`);
      })
      .catch(err => console.error(err));
  });


// \COPY answers from '/Users/Sunil/HackReactor/coding/sdc/qa-service/src/data/csv/transformedAnswers.csv' DELIMITER ',' CSV HEADER;