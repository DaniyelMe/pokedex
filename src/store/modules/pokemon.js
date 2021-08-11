import { debounce } from 'quasar';

const baseUrl = 'https://pokeapi.co/api/v2/';

const state = {
  pokemons: [],
  types: [],
  isLoading: false
};

const actions = {
  async fetchPokemons({ state, commit }) {
    commit('TOGGLE_LOADING');

    const length = state.pokemons.length;
    let allPokemons = [];

    for (let index = 0; index < 151; index++) {
      const p = fetch(
        `https://pokeapi.co/api/v2/pokemon/${length + index + 1}/`
      ).then((res) => res.json());

      allPokemons.push(p);
    }

    allPokemons = await Promise.all(allPokemons);

    allPokemons = allPokemons.map((pokemon) => {
      const paddingZeros = pokemon.id.toString().padStart(3, '0');

      return {
        ...pokemon,
        image: `https://serebii.net/pokemongo/pokemon/${paddingZeros}.png`
      };
    });

    commit('SET_POKEMONS', allPokemons);
    commit('TOGGLE_LOADING');
  },

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
