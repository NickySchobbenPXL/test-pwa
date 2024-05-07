import { defineStore } from 'pinia'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useSuperHeroStore = defineStore('superhero', {
    // other options...
    state: () => ({
        superheroes: [] as { id: number,firstName: string, lastName: string, superheroName: string} [],
    }),
    actions: {
                async fetchSuperheroes() {
                    try {
                        const response = await fetch('https://localhost:8443/api/superhero');
                        console.log('Response body: ' + " " + await response.text())
                        if (!response.ok) {
                            throw new Error('failed to fetch superheroes')
                        }
                        const data = await response.json();
                        console.log('Data:' + " " +  data);
                        this.superheroes = data;
                        return data;

                    } catch (error) {
                        console.error('Error fetching superheroes:', error);
                    } finally {
                        console.log(this.superheroes);
                    }
                },
        async createSuperhero(superhero: { superheroName: string, firstName: string, lastName: string }) {
            console.log("new hero: ", superhero);
            try {
                const response = await fetch(`/api/superhero`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(superhero)
                });
                if (response.ok) {
                    return response.json();
                } else {
                    console.error("Error fetching backend");
                }
            } catch (error) {
                console.error('Error creating superhero: ', error);
            }
        },
        async deleteSuperhero(id: number) {
            try {
                const response = await fetch(`/api/superhero/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    await this.fetchSuperheroes();
                } else {
                    console.error('Error deleting superhero:', response.statusText);
                }
            } catch (error) {
                console.error('Error deleting superhero:', error);
            }
        }
    }
})

// import { defineStore } from 'pinia';
// import axios from 'axios';
//
//
// export const useSuperHeroStore = defineStore('superhero', {
//     // other options...
//     state: () => ({
//         superheroes: [] as { id: number, firstName: string, lastName: string, superheroName: string }[],
//     }),
//     actions: {
//
//         async fetchSuperheroes() {
//             try {
//                 const response = await axios.get(`/api/superhero`);
//                 if (response.status === 200) {
//                     this.superheroes = response.data;
//                 } else {
//                     console.error('Error fetching superheroes:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error fetching superheroes:', error);
//             }
//             return this.superheroes;
//         },
//         async createSuperhero(superhero: { superheroName: string, firstName: string, lastName: string }) {
//             try {
//                 const response = await axios.post(`/api/superhero`, superhero, {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 if (response.status === 200) {
//                     return response.data;
//                 } else {
//                     console.error("Error creating superhero");
//                 }
//             } catch (error) {
//                 console.error('Error creating superhero: ', error);
//             }
//         },
//         async deleteSuperhero(id: number) {
//             try {
//                 const response = await axios.delete(`/api/superhero/${id}`);
//                 if (response.status === 200) {
//                     await this.fetchSuperheroes();
//                 } else {
//                     console.error('Error deleting superhero:', response.statusText);
//                 }
//             } catch (error) {
//                 console.error('Error deleting superhero:', error);
//             }
//         }
//     }
// });
