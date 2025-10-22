<template>
  <div class="bg-light min-vh-100 d-flex flex-column">
    <NavBar />
    <main class="container my-4 flex-grow-1">
      <router-view />
    </main>
    <footer class="text-center py-3 text-secondary">
      © {{ new Date().getFullYear() }} My Vue Starter
    </footer>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
</script>
