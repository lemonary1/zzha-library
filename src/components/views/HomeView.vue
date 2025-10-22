<template>
  <div class="p-4 bg-white rounded shadow-sm">
    <h1 class="h3">Home</h1>
    <p class="text-muted">Welcome to the starter app. Use the navbar to navigate.</p>
    <div class="row g-3 mt-2">
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Get Weather</h5>
            <p class="card-text">Check current weather by city.</p>
            <RouterLink class="btn btn-primary" to="/weather">Try now</RouterLink>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Books</h5>
            <p class="card-text">Simple placeholders for future features.</p>
            <RouterLink class="btn btn-outline-primary" to="/add-book">Add Book</RouterLink>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">Account</h5>
            <p class="card-text">Register / Sign in pages are mock UI now.</p>
            <div class="d-flex gap-2">
              <RouterLink class="btn btn-outline-secondary" to="/signin">Sign in</RouterLink>
              <RouterLink class="btn btn-secondary" to="/register">Register</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
