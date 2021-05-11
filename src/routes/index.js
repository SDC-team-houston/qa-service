const getQAs = require('./getQAs');
// more routes here

module.exports = getQAs => {
  getQAs.use('/getQAs', getQAs);
  // more routes here
}