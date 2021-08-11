import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import pokemon from './modules/pokemon.js';

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      pokemon
    },
    plugins: [createPersistedState()],

    strict: process.env.DEBUGGING
  });

  return Store;
});
