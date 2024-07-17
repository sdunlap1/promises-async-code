$(document).ready(function() {
  let baseURL = "https://deckofcardsapi.com/api/deck";
  let deckId = null;
  let $btn = $('#draw-card');
  let $cardContainer = $('#card-container');

  // Create a new shuffled deck
  $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
      deckId = data.deck_id;
      $btn.show();
  });

  // Draw a card when the button is clicked
  $btn.on('click', function() {
      $.getJSON(`${baseURL}/${deckId}/draw/?count=1`).then(data => {
          if (data.remaining === 0) {
              $btn.hide();
              alert('No more cards left in the deck!');
          } else {
              let card = data.cards[0];
              $cardContainer.append(
                  `<img src="${card.image}" alt="${card.value} of ${card.suit}">`
              );
              if (data.remaining === 0) {
                  $btn.hide();
              }
          }
      });
  });
});
