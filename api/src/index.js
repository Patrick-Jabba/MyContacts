const express = require('express');

const cors = require('./app/middlewares/cors');
const errorHandler = require('./app/middlewares/errorHandler');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(cors);
app.use(routes);
// Error Handler (Middleware express) -> Manipulador de error
app.use(errorHandler);

app.listen(3001, () => console.log('🔥 Server started at http://localhost:3001'));
