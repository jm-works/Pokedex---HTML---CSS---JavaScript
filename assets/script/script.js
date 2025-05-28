function buscarPokemon() {

  const pokemon = document.getElementById('pesquisar').value.trim().toLowerCase();

  if (!pokemon) return; // Se não for digidado, nada acontence, feijoada

  const url = `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(pokemon)}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("Pokémon não encontrado");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById('nome-pokemon').textContent = data.name;
      document.getElementById('id-pokemon').textContent = `#${data.id}`;
      document.getElementById('pokemon-img').src = data.sprites.front_default;

      document.getElementById('altura-pokemon').textContent = `${data.height / 10} m`;
      document.getElementById('peso-pokemon').textContent = `${data.weight / 10} kg`;

      const abilities = data.abilities.map(a => a.ability.name).join(', ');
      document.getElementById('habilidades-pokemon').textContent = abilities;

      const types = data.types.map(t => `<span class="tipos-pokemon ${t.type.name}">${t.type.name}</span>`).join('');
      document.getElementById('tipos-pokemon').innerHTML = types;

      document.getElementById('status-hp').style.width = `${data.stats[0].base_stat}%`;
      document.getElementById('status-atk').style.width = `${data.stats[1].base_stat}%`;
      document.getElementById('status-def').style.width = `${data.stats[2].base_stat}%`;
      document.getElementById('status-spd').style.width = `${data.stats[5].base_stat}%`;

      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`)
        .then(response => response.json())
        .then(speciesData => {
          const entry = speciesData.flavor_text_entries.find(entry => entry.language.name === "en");
          document.getElementById('descricao-pokemon').textContent = entry ? entry.flavor_text.replace(/\f/g, ' ') : "Sem descrição.";
        });

    })
    .catch(error => {
      alert(error.message);
    });
}

document.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    buscarPokemon();
  }
});