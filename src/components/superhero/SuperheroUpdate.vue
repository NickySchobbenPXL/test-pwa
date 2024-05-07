<template>
  <v-container>
    <v-form @submit.prevent="updateSuperhero">
      <v-text-field v-model="editedHero.superheroName" label="Superhero Name"></v-text-field>
      <v-text-field v-model="editedHero.firstName" label="First Name"></v-text-field>
      <v-text-field v-model="editedHero.lastName" label="Last Name"></v-text-field>
      <v-btn type="submit" color="primary">Save Changes</v-btn>
      <v-btn @click="cancelUpdate">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const editedHero = ref<any>({ superheroName: '', firstName: '', lastName: '' });
    const router = useRouter();

    // Get the superhero ID from the route params
    const superheroId = computed(() => {
      return router.currentRoute.value.params.id;
    });

    // Fetch the superhero details from the backend
    const fetchSuperheroDetails = async () => {
      try {
        const response = await fetch(`/api/superhero/${superheroId.value}`);
        if (response.ok) {
          editedHero.value = await response.json();
        } else {
          console.error('Error fetching superhero details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching superhero details:', error);
      }
    };

    // Update superhero details
    const updateSuperhero = async () => {
      try {
        const response = await fetch(`/api/superhero/${superheroId.value}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedHero.value)
        });
        if (response.ok) {
          router.push('/'); // Redirect to the superhero list after successful update
        } else {
          console.error('Error updating superhero:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating superhero:', error);
      }
    };

    // Cancel update and navigate back to the superhero list
    const cancelUpdate = () => {
      router.push('/');
    };

    // Fetch superhero details when component is mounted
    fetchSuperheroDetails();

    return {
      editedHero,
      updateSuperhero,
      cancelUpdate
    };
  }
});
</script>

<style scoped>
/* Add component-specific styles here */
</style>
