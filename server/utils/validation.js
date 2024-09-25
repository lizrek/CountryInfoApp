const isValidCountryCode = (code) => /^[A-Z]{2,3}$/.test(code);

module.exports = {
  isValidCountryCode,
};
