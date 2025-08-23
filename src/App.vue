<template>
  <div id="app">
    <router-view />
    <SupportButton />
  </div>
</template>

<script>
import SupportButton from './components/SupportButton.vue'

export default {
  name: 'App',
  components: {
    SupportButton
  }
}
</script>

<style>
/* Global styles will be imported in main.js */
</style>