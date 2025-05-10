const cache = new Map();

function setCache(key, value, ttl = 60) {
  const expiry = Date.now() + ttl * 1000;
  cache.set(key, { value, expiry });
}

function getCache(key) {
  const cached = cache.get(key);
  if (!cached) return null;
  if (Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }
  return cached.value;
}

module.exports = { setCache, getCache };
