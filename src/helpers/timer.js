module.exports = function getElapsedTime(start, end) {
  return `(${Math.ceil((end.getTime() - start.getTime()) / 1000)} s)`;
}

