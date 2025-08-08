<script setup>

</script>

<template>
  <nav class="nav-bar">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/bonus">Bonus</RouterLink>
  </nav>

  <RouterView />
</template>

<style scoped>

.nav-bar {
  display: flex;
  gap: 20px;
  background-color: #333;
  padding: 10px 20px;
  border-radius: 8px;
}

.nav-bar a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.nav-bar a.router-link-active {
  background-color: #1976d2;
}

.nav-bar a:hover {
  background-color: #555;
  cursor: pointer;
}

</style>
