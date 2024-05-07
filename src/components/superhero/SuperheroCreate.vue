<template>
  <v-container v-if="onLine">
    <v-form @submit.prevent="store.createSuperhero(editedHero); router().push('/')">
      <v-text-field v-model="editedHero.superheroName" label="Superhero Name"></v-text-field>
      <v-text-field v-model="editedHero.firstName" label="First Name"></v-text-field>
      <v-text-field v-model="editedHero.lastName" label="Last Name"></v-text-field>
      <v-btn type="submit" color="primary">Create Superhero</v-btn>
      <v-btn @click="cancelCreation">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import {useSuperHeroStore} from "../../store/piniaStore.ts";
import router from "../../router";

export default defineComponent({
  methods: {
    router() {
      return router
    }
  },
  data() {
    const onLine = navigator.onLine;
      const store = useSuperHeroStore();
      return {
        store: store,
        onLine: onLine,
      }
  },
  setup() {
    const editedHero = ref<any>({ superheroName: '', firstName: '', lastName: '' });
    const router = useRouter();

    // Function to cancel creation and navigate back to the superhero list
    const cancelCreation = () => {
      router.push('/');
    };

    return {
      editedHero,
      cancelCreation
    };
  }
});
</script>

<style scoped>
/* Add component-specific styles here */
</style>
