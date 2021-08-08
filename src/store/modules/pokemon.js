const baseUrl = 'https://pokeapi.co/api/v2/';
const state = {
  pokemons: [],
};

const actions = {
  async fetchPokemonByName({ state, commit }, name) {


    const pokemonData = await fetch(`${baseUrl}pokemon/${name}`).then((res) =>
      res.json()
    );

    const id = pokemonData.id;

    const paddingZeros = id.toString().padStart(3, '0');

    const pokemonObject = {
      ...pokemonData,
      image: `https://serebii.net/pokemongo/pokemon/${paddingZeros}.png`
    };

    commit('SET_POKEMON', pokemonObject);
  },

  async fetchPokemons({ state, dispatch, commit }) {
    const offset = state.pokemons.length / 151;

    const { results } = await fetch(
      `${baseUrl}pokemon?limit=151&offset=${offset}`
    ).then((res) => res.json());

    // results.forEach((poke, index) => {
    //   dispatch('fetchInfoPokemon', { id: index + 1, ...poke });
    // });

    console.log('results', results);
    commit('SET_POKEMONS', results);
  },

  fetchInfoPokemon: async ({ state, commit }, pokemon) => {
    const pokemonData = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`
    ).then((res) => res.json());

    const id = pokemonData.id;

    const paddingZeros = id.toString().padStart(3, '0');
    console.log('paddingZeros', paddingZeros);

    const pokemonObject = {
      ...pokemonData,
      image: `https://serebii.net/pokemongo/pokemon/${paddingZeros}.png`
    };

    console.log('pokemonObject', pokemonObject);
    if (pokemonObject.abilities) commit('SET_POKEMON', pokemonObject);
  },

  async fetchTypePokemons({ commit }) {
    const { results } = await fetch(`${baseUrl}type/`).then((res) =>
      res.json()
    );

    const types = results.map((p) => p);
    commit('SET_TYPES', types);
  }
};

const mutations = {
  SET_POKEMONS(state, pokemons) {
    state.pokemons = [...state.pokemons, ...pokemons];
  },
  SET_POKEMON(state, pokemon) {
    const index = pokemon.id - 1;
    state.pokemons[index] = pokemon;
  },
  SET_TYPES(state, types) {
    state.types = types;
  }
};

export default {
  state,
  actions,
  mutations
};
