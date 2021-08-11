<template>
  <q-page class="q-pa-md pokemon-page">
    <header>
      <q-select
        filled
        v-model="typeFilters"
        multiple
        :options="types"
        use-chips
        stack-label
        emit-value
        option-value="name"
        option-label="name"
        label="Type Criterias"
      />

      <div>
        <q-btn
          :loading="isLoading"
          @click="fetchMorePokemons"
          color="primary"
          label="fetch more pokemons"
        />

        <q-btn @click="clearAll" color="primary" label="Clear all pokemons" />
      </div>
    </header>

    <div class="q-pa-md">
      <div class="row justify-center q-gutter-sm">
        <q-intersection
          v-for="pokemon in filterdPokemons"
          :key="pokemon.url"
          class="pokemons-card-item"
        >
          <PokemonCard :pokemon="pokemon" />
        </q-intersection>
      </div>
    </div>

    <q-spinner
      v-if="isLoading"
      class="loading-animation"
      color="primary"
      size="3em"
      :thickness="2"
    />

    <q-btn
      v-if="pokemons.length && !isLoading"
      :loading="isLoading"
      @click="fetchMorePokemons"
      color="primary"
      class="loading"
      label="fetch more pokemons"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import PokemonCard from '../components/PokemonCard.vue';

export default defineComponent({
  name: 'pokemonIndex',
  components: { PokemonCard },

  data() {
    return {
      typeFilters: ['electric', 'fire', 'psychic'],
      skills: ['Thunder Shock', 'Quick Attack', 'Electro Ball', 'Thunder Wave']
    };
  },

  methods: {
    fetchMorePokemons() {
      this.$store.dispatch('fetchPokemons');
    },
    clearAll() {
      this.$store.commit('CLEAR_ALL');
      this.typeFilters = ['electric', 'fire', 'psychic'];
    }
  },

  computed: {
    filterdPokemons() {
      if (this.typeFilters.includes('all')) return this.pokemons;

      return this.pokemons.filter((p) => {
        return p.types.every(({ type }) => {
          return this.typeFilters.includes(type.name);
        });
      });
    },
    pokemons() {
      return this.$store.state.pokemon?.pokemons || [];
    },
    types() {
      let types = this.$store.state.pokemon?.types
        ? ['all', ...this.$store.state.pokemon.types]
        : [];

      return types;
    },
    isLoading() {
      return this.$store.state.pokemon.isLoading;
    }
  }
});
</script>

<style lang="scss" scoped>
.pokemon-page {
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    flex-direction: column;

    .q-select {
      width: 100%;
      max-width: 500px;
      height: 100%;
    }

    > div {
      display: flex;
      justify-content: space-evenly;
      align-self: stretch;
    }
  }

  .loading-animation {
    height: 90px;
    width: 90px;
    align-self: center;
    font-size: 2rem;
  }

  .loading {
    width: 250px;
    align-self: center;
    margin: 10px 0;
  }

  .pokemons-card-item {
    height: 290px;
    width: 290px;
  }
}

::v-deep .q-field__control {
  min-height: 60px;
  margin-bottom: 20px;
}
</style>
