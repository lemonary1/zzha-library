<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/">FIT5032</RouterLink>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div id="nav" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><RouterLink class="nav-link" to="/">Home</RouterLink></li>
          <li class="nav-item"><RouterLink class="nav-link" to="/about">About</RouterLink></li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/add-book">Add Book</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/get-book-count">Get Book Count</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/weather">Get Weather</RouterLink>
          </li>
        </ul>

        <div class="d-flex gap-2">
          <RouterLink class="btn btn-outline-light btn-sm" to="/signin">Sign in</RouterLink>
          <RouterLink class="btn btn-light btn-sm" to="/register">Register</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
