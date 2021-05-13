// Import required modules
const fs = require('fs');
const moment = require('moment');
const path = require('path');
const csvParse = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const timer = require('./timer.js');

// raw/transformed csv files & target table
const inputFile = path.join(__dirname, '/csv/questions.csv');
const transformedFile = path.join(__dirname, '/csv/transformedQuestions.csv');
var table = 'public.questions';

// holder array for transformed data
let transformedData = [];

// initialize csvWriter
const csvWriter = createCsvWriter({
  path: transformedFile,
  header: [
    { id: 'id', title: 'id' },
    { id: 'product_id', title: 'product_id' },
    { id: 'body', title: 'body' },
    { id: 'date_written', title: 'date_written' },
    { id: 'asker_name', title: 'asker_name' },
    { id: 'asker_email', title: 'asker_email' },
    { id: 'reported', title: 'reported' },
    { id: 'helpful', title: 'helpful' },
  ]
});

// start timer
const start = new Date();

// Standardize Date property and filter out incomplete data
const fileStream = fs
  .createReadStream(inputFile)
  .pipe(csvParse())
  .on('data', (row) => {
    if (row.helpful) {
      let date = row.date_written;

      if (!date.match(/[A-z]/g)) {
        date = Number(row.date_written);
      }

      date = new Date(date);
      date = moment(date).format();
      row.date_written = date;

      transformedData.push(row);
    }
  })
  .on('end', async () => {
    const endRaw = new Date();
    console.info(`Raw CSV file successfully processed ✅ ${timer(start, endRaw)} ...`);

    await fs.truncate(transformedFile, 0, () => console.info(`...transformed CSV file emptied, ready to write ✅ ...`));

    csvWriter.writeRecords(transformedData)
      .then(() => {
        const endWrite = new Date();
        console.info(`...done writing transformed data 🥳 ${timer(endRaw, endWrite)}`);
      });
  });