class DataIncorrect extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataIncorrect';
    this.statusCode = 400;
  }
}

module.exports = DataIncorrect;
