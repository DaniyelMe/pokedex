<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  async created() {
    this.$store.dispatch('fetchPokemons');
    this.$store.dispatch('fetchTypePokemons');
  }
});
</script>
