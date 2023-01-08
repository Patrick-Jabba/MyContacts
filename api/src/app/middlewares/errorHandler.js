module.exports = (error, request, response, next) => {
  console.log('###### ERROR HANDLER');
  console.log(error);
  response.sendStatus(500);
}