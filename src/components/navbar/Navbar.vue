<template>
  <v-layout>
    <v-app-bar color="primary">
      <v-toolbar-title>Superhero App</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/">Home</v-btn>
      <v-btn to="/create" v-if="onLine">Create Superhero</v-btn>
    </v-app-bar>
  </v-layout>
</template>
<script setup lang="ts">
const onLine = navigator.onLine;
</script>