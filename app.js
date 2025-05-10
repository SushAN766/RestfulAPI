const express = require('express');
const cors = require('cors');
require('dotenv').config();

const numbersRoute = require('./routes/numbers');
const productRoutes = require('./routes/products');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/numbers', numbersRoute);
app.use('/products', productRoutes);

module.exports = app;
