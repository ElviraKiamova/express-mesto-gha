class RegistrationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RegistrationError';
    this.statusCode = 409;
  }
}

module.exports = RegistrationError;
