<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  created() {
    this.$store.dispatch('fetchPokemons');
    this.$store.dispatch('fetchTypePokemons');
  }
});
</script>
