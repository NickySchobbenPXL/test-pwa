import {createRouter, createWebHistory} from 'vue-router';
import SuperheroDetail from '../components/superhero/SuperheroDetail.vue';
import SuperheroUpdate from '../components/superhero/SuperheroUpdate.vue';
import SuperheroCreate from '../components/superhero/SuperheroCreate.vue';


const routes = [
    {path: '/', component: SuperheroDetail},
    {path: '/create', component: SuperheroCreate},
    {path: '/update/:id', component: SuperheroUpdate}
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router