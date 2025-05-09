const express = require('express');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
