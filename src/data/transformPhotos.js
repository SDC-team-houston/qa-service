// Import required modules
const fs = require('fs');
const moment = require('moment');
const csvParse = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const timer = require('./timer.js');

// raw/transformed csv files
const inputFile = path.join(__dirname, '/csv/answers_photos.csv');
const transformedFile = path.join(__dirname, '/csv/transformedPhotos.csv');

// holder array for photo rows
let transformedPhotos = [];

// initialize csvWriter
const csvWriter = createCsvWriter({
  path: transformedFile,
  header: [
    { id: 'id', title: 'id' },
    { id: 'answer_id', title: 'answer_id' },
    { id: 'url', title: 'url' },
  ]
});

// start timer
const start = new Date();

// Filter out incomplete data
const fileStream = fs
  .createReadStream(inputFile)
  .pipe(csvParse())
  .on('data', (row) => {
    if (row.url) {
      transformedPhotos.push(row);
    }
  })
  // write filtered to file
  .on('end', async () => {
    const endRaw = new Date();

    console.info(`Raw CSV file successfully processed ✅ ${timer(start, endRaw)} ...`);

    await fs.truncate(transformedFile, 0, () => {
      console.info(`...transformed CSV file emptied, ready to write ✅ ...`
    )});

    csvWriter.writeRecords(transformedPhotos)
      .then(() => {
        const endWrite = new Date();
        console.info(`...done writing transformed data 🥳 ${timer(endRaw, endWrite)}`);
      })
      .catch(err => console.error(err));
  });


// \COPY answers_photos from '/Users/Sunil/HackReactor/coding/sdc/qa-service/src/data/csv/transformedPhotos.csv' DELIMITER ',' CSV HEADER;