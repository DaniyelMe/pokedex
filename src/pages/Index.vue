<template>
  <q-page class="q-pa-md">
    <header>
      <q-select
        filled
        v-model="typeFilters"
        multiple
        :options="types"
        use-chips
        stack-label
        label="Type Criterias"
      />

      <q-btn @click="fetchMorePokemons" label="fetch more pokemons"></q-btn>
    </header>

    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="pokemon in pokemons"
          :key="pokemon.url"
          class="pokemons-card-item"
        >
          <PokemonCard :pokemon="pokemon" />
        </q-intersection>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import PokemonCard from '../components/PokemonCard.vue';

export default defineComponent({
  name: 'PageIndex',

  components: { PokemonCard },

  data() {
    return {
      typeFilters: ['Electric', 'Fire', 'Psychic'],
      skills: ['Thunder Shock', 'Quick Attack', 'Electro Ball', 'Thunder Wave']
    };
  },

  methods: {
    fetchMorePokemons() {
      this.$store.dispatch('fetchPokemons');
    }
  },

  computed: {
    filterdPokemons() {
      return this.pokemons;
    },
    pokemons() {
      return this.$store.state.pokemon?.pokemons || [];
    },
    types() {
      return this.$store.state.pokemon.types;
    }
  }
});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
}
::v-deep .q-field__control {
  height: 60px;
  margin-right: 20px;
}
.pokemons-card-item {
  height: 290px;
  width: 290px;
}
</style>
