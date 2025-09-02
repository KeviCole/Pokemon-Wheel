Root
-> eslintrc.json
- Eslint Rules
-> Package JSON
- Manages Descriptions and Scripts
-> .gitignore
- Ignores Git Changes
-> allPokemon.js
- Returns Pokemon Information via PokeAPI
-> generatePokemon.py
- Scrapes Pokemon PDF's from PokemonDB

src
-> index.js and App.js
- Start of Components/Website

src/Images
-> /pokemon_images
- Folder of Pokemon Images in Consistent Format
-> /types_large
- Folder of Large Pokemon Type Images (deprecated)
-> /types_small
- Folder of Small Pokemon Type Images
-> Miscellaneous
- Other Temporary PNG's and GIF's

src/Constants
-> pokemonData.jsx
- Array of Pokemon Info Objects
-> pokemonImage.jsx
- Methods to Return Pokemon/Type PNG's

src/Components
-> layout.jsx
- Sets up the Layout for the Wheel and Info Box
-> wheel.jsx
- The Wheel Canvas Object

src/Components/infoBox
-> index.js
- Export File
-> infoBox.jsx
- Layout for Everything in the Info Box
-> pokemonSelection.jsx
- Displays the Slots on Left Side of Info Box
-> titleBar.jsx
- Displays the Dex Number, Name, and Type(s) of Pokemon
-> evolutionLine.jsx
- Displays Evolution Line of Current Pokemon

src/Components/infoBox/Stats
-> pokemonStats.jsx
- Displays the Layout for the Stats of Current Pokemon
-> pokeStatBar.jsx
- Displays Bar of Relevant Stat Line