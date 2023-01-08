module.exports = (request, response, next) => {
  // Wildcard -> Curinga -> *
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  response.setHeader('Access-Control-Allow-Max-Age', '10');
  next();
};