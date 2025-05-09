const express = require('express');
const app = express();
const numbersRoute = require('./routes/numbers');

// Use the numbers route at /numbers path
app.use('/numbers', numbersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
