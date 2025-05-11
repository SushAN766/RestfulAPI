const axios = require('axios');
require('dotenv').config();
const WINDOW_SIZE = 5;
let window = [];
let set = new Set();
async function fetchNumbersFromAPI() {
  return new Promise((resolve) => {
    // Simulate API data
    const mockData = { numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };
    resolve(mockData.numbers);
  });
}
function updateWindow(numbers) {
  for (let num of numbers) {
    if (!set.has(num)) {
      if (window.length >= WINDOW_SIZE) {
        const removed = window.shift();
        set.delete(removed);
      }
      window.push(num);
      set.add(num);
    }
  }
  return window;
}
module.exports = {
  fetchNumbersFromAPI,
  updateWindow
};
