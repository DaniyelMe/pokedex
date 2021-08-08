<template>
  <q-card class="pokemon-card" :style="createBackgroundString">
    <header>{{ pokemon.name }}</header>

    <div
      class="image-container"
      :style="
        pokemon?.image ? 'background-color: rgba(255, 255, 255, 0.6);' : ''
      "
    >
      <img :src="image" :alt="`${pokemon.name} picture`" loading="lazy" />
    </div>

    <div class="info" v-if="pokemon.id">
      <span class="id-number"
        >#{{ pokemon.id.toString().padStart(3, '0') }}</span
      >
      <div class="type">{{ types }}</div>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PokemonCard',
  props: {
    pokemon: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    image() {
      const image = this.pokemon.image;

      const pokeball =
        'https://i.gifer.com/origin/28/2860d2d8c3a1e402e0fc8913cd92cd7a_w200.gif';

      return image ? image : pokeball;
    },

    types() {
      return this.pokemon?.types?.map((t) => t.type.name).join(' / ');
    },

    createBackgroundString() {
      if (!this.pokemon?.types) return '';

      const types = this.pokemon?.types?.map((t) => t.type.name);

      const color = {
        grass: '#d2f2c2',
        poison: '#f7cdf7',
        fire: '#ffd1b5',
        flying: '#eae3ff',
        water: '#c2f3ff',
        bug: '#e0e8a2',
        normal: '#e6e6c3',
        electric: '#fff1ba',
        ground: '#e0ccb1',
        fighting: '#fcada9',
        psychic: '#ffc9da',
        rock: '#f0e09c',
        fairy: '#ffdee5',
        steel: '#e6eaf0',
        ice: '#e8feff',
        ghost: '#dbbaff',
        dragon: '#c4bdff'
      };

      return this.pokemon?.types?.length === 1
        ? ` background: ${color[types[0]]}`
        : `background: linear-gradient(150deg, ${color[types[0]]} 50%, ${
            color[types[1]]
          }  50%)`;
    }
  },

  created() {
    if (!this.pokemon.id) {
      this.$store.dispatch('fetchPokemonByName', this.pokemon.name);
    }
  }
});
</script>

<style lang="scss" scoped>
.pokemon-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  min-height: 290px;
  min-width: 290px;
  max-width: 400px;
  padding: 12px 24px;
  border-radius: 10px;

  margin: 10px auto;
  .image-container {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    text-align: center;

    img {
      width: 120px;
    }
  }

  .type {
    font-size: 1.4rem;
  }

  .id-number {
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    font-size: 0.8em;
    padding: 5px 10px;
  }

  header {
    font-size: 2rem;
    font-weight: 500;
  }

  .info {
    text-align: center;
    padding: 10px;
  }
}
</style>
