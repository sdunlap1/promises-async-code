$(document).ready(function() {
  const favoriteNumber = 7;

  // 1. Get a fact about your favorite number
  fetch(`http://numbersapi.com/${favoriteNumber}?json`)
      .then(response => response.json())
      .then(data => {
          $('#number-fact').text(data.text);
      })
      .catch(error => console.error('Error:', error));

  // 2. Get data on multiple numbers in a single request
  const numbers = [3, 7, 10];
  fetch(`http://numbersapi.com/${numbers}?json`)
      .then(response => response.json())
      .then(data => {
          const facts = Object.values(data);
          const factsList = facts.map(fact => `<p>${fact}</p>`).join('');
          $('#multiple-facts').html(factsList);
      })
      .catch(error => console.error('Error:', error));

  // 3. Get 4 facts about your favorite number
  const promises = [];
  for (let i = 0; i < 4; i++) {
      promises.push(fetch(`http://numbersapi.com/${favoriteNumber}?json`).then(response => response.json()));
  }

  Promise.all(promises)
      .then(results => {
          const factsList = results.map(fact => `<p>${fact.text}</p>`).join('');
          $('#favorite-facts').html(factsList);
      })
      .catch(error => console.error('Error:', error));
});
