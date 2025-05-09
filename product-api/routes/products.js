const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { setCache, getCache } = require('../cache/memoryCache');

const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 800, category: 'electronics' },
  { id: 2, name: 'Book', price: 20, category: 'books' },
  { id: 3, name: 'Phone', price: 500, category: 'electronics' }
];


router.get('/', auth, (req, res) => {
  const { category, min_price = 0, max_price = Infinity, sort_by = 'id' } = req.query;

  let result = PRODUCTS.filter(p => 
    p.price >= parseFloat(min_price) &&
    p.price <= parseFloat(max_price) &&
    (!category || p.category === category)
  );

  result.sort((a, b) => {
    if (a[sort_by] < b[sort_by]) return -1;
    if (a[sort_by] > b[sort_by]) return 1;
    return 0;
  });

  res.json(result);
});


router.get('/:id', auth, (req, res) => {
  const id = parseInt(req.params.id);

  const cached = getCache(id);
  if (cached) {
    return res.json({ fromCache: true, product: cached });
  }

  const product = PRODUCTS.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  setCache(id, product, 60); 
  res.json({ fromCache: false, product });
});

module.exports = router;
