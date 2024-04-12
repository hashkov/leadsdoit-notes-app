<template>
  <nav class="main-nav">
    <router-link :to="{ name: 'Home' }">Notes</router-link>
    <router-link :to="{ name: 'AddNote' }">Add a New Note</router-link>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('../assets/styles/components/Navbar.scss');
</style>
