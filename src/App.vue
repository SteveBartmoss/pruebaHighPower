<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Home from './components/Home.vue';
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/">Bonus</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>

</style>
