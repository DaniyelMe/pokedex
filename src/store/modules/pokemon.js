import { debounce } from 'quasar';

const baseUrl = 'https://pokeapi.co/api/v2/';

const state = {
  pokemons: [],
  isLoading: false
};

const actions = {
  fetchPokemons: debounce(async ({ state, dispatch, commit }) => {
    commit('TOGGLE_LOADING');
    const offset = state.pokemons.length / 151;
    let allPokemons = [];

    const { results } = await fetch(
      `${baseUrl}pokemon?limit=151&offset=${offset}`
    ).then((res) => res.json());

    const length = state.pokemons.length;
    results.forEach((_, index) => {
      const p = fetch(
        `https://pokeapi.co/api/v2/pokemon/${length + index + 1}/`
      ).then((res) => res.json());
      allPokemons.push(p);
    });

    allPokemons = await Promise.all(allPokemons);

    allPokemons = allPokemons.map((pokemon) => {
      const id = pokemon.id;

      const paddingZeros = id.toString().padStart(3, '0');

      return {
        ...pokemon,
        image: `https://serebii.net/pokemongo/pokemon/${paddingZeros}.png`
      };
    });

    commit('SET_POKEMONS', allPokemons);
    commit('TOGGLE_LOADING');
  }),

  async fetchTypePokemons({ commit }) {
    const { results } = await fetch(`${baseUrl}type/`).then((res) =>
      res.json()
    );

    commit('SET_TYPES', results);
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
  },
  TOGGLE_LOADING(state) {
    state.isLoading = !state.isLoading;
  },
  CLEAR_ALL(state) {
    state.pokemons = [];
  }
};

export default {
  state,
  actions,
  mutations
};
