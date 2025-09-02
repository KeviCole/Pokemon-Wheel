import os
import requests
from bs4 import BeautifulSoup

# Step 1: Scrape Pokémon names in National Dex order
print("🔎 Fetching Pokémon names from Pokemondb...")
url = "https://pokemondb.net/pokedex/national"
# Returns HTML Source as String
html = requests.get(url).text
# Parses HTML into structured Object
soup = BeautifulSoup(html, "html.parser")

pokemon_names = []
# Finds all Pokemon Name Spans
for span in soup.select(".infocard-lg-data .ent-name"):
    # Extracts name from span
    pokemon_names.append(span.text)

print(f"✅ Found {len(pokemon_names)} Pokémon names")

# Step 2: Make output directory
save_dir = "pokemon_images"
os.makedirs(save_dir, exist_ok=True)

# Step 3: Download each PNG
# Loops through Pokemon Names
for num, name in enumerate(pokemon_names, start=1):
    # Ensures #'s are padded
    num_str = str(num).zfill(3)  # 001, 002, ...
    # Constructs image url
    img_url = f"https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/{num_str}.png"
    # Builds File Name
    filename = f"{num_str}-{name}.png"
    # Glues together into Correct File Path regardless of System
    filepath = os.path.join(save_dir, filename)

    # Downloads image
    response = requests.get(img_url)
    if response.status_code == 200:
        with open(filepath, "wb") as f:
            f.write(response.content)
        print(f"✅ Saved {filename}")
    else:
        print(f"❌ Missing: {img_url}")
