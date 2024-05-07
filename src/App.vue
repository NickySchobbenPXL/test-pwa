<script setup lang="ts">
import Navbar from "./components/navbar/Navbar.vue";
</script>

<template>
    <nav>
      <Navbar></Navbar>
    </nav>
    <main>
      <router-view></router-view>
    </main>
</template>

<style scoped>
</style>
