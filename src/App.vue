<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import JSON from './components/JSON.vue'
// import TheWelcome from './components/TheWelcome.vue'
import Form from './components/Form.vue'
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" /> -->

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->
      <!-- <JSON /> -->
    </div>
  </header>

  <main>
    <Form />
  </main>
</template>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.page-center {
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 24x;
}

.form-warp {
  width: 100%;
  max-width: 560px;
}
</style>
