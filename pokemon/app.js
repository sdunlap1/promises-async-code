$(document).ready(function() {
  let baseURL = "https://pokeapi.co/api/v2/pokemon?limit=1000";
  let $btn = $('#fetch-pokemon');
  let $pokemonContainer = $('#pokemon-container');

  // Fetch names and URLs of all Pokémon
  $.getJSON(baseURL).then(data => {
      let allPokemon = data.results;

      // Handle button click to fetch random Pokémon data
      $btn.on('click', function() {
          $pokemonContainer.empty(); // Clear the container

          // Pick three random Pokémon
          let randomPokemon = [];
          for (let i = 0; i < 3; i++) {
              let randomIndex = Math.floor(Math.random() * allPokemon.length);
              randomPokemon.push(allPokemon[randomIndex]);
          }

          // Fetch data for each random Pokémon
          let promises = randomPokemon.map(pokemon => $.getJSON(pokemon.url));

          Promise.all(promises).then(results => {
              results.forEach(pokemonData => {
                  let speciesUrl = pokemonData.species.url;
                  let pokemonName = pokemonData.name;
                  let pokemonImage = pokemonData.sprites.front_default;

                  // Fetch species data
                  $.getJSON(speciesUrl).then(speciesData => {
                      let flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
                      let description = flavorTextEntry ? flavorTextEntry.flavor_text : "No description available";

                      // Append Pokémon data to the container
                      $pokemonContainer.append(
                          `<div class="pokemon-card">
                              <h2>${pokemonName}</h2>
                              <img src="${pokemonImage}" alt="${pokemonName}">
                              <p>${description}</p>
                          </div>`
                      );
                  });
              });
          });
      });
  });
});
