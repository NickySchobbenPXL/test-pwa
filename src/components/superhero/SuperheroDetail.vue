<template>
  <v-container v-if="store.superheroes.length">
    <v-row>
      <v-col v-for="hero in store.superheroes" :key="hero.id">
        <v-card class="mb-4">
          <v-card-title>{{ hero.superheroName }}</v-card-title>
          <v-card-subtitle>{{ hero.firstName }} {{ hero.lastName }}</v-card-subtitle>
          <v-card-text>
            Superhero ID: {{ hero.id }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="goToUpdateForm(hero.id)" v-if="onLine">Update</v-btn>
            <v-btn @click="store.deleteSuperhero(hero.id)" v-if="onLine">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useSuperHeroStore } from "../../store/piniaStore.ts";

export default defineComponent({
  data() {
    const onLine = navigator.onLine;
    const store = useSuperHeroStore();
    return {
      store: store,
      onLine: onLine,
    }
  },
  setup() {
    const router = useRouter();

    // Navigate to update form
    const goToUpdateForm = (id: number) => {
      router.push(`/update/${id}`);
    };

    return {
      goToUpdateForm
    };
  },
  mounted() {
    this.store.fetchSuperheroes();
  },
});
</script>

<style scoped>
/* Add component-specific styles here */
</style>
