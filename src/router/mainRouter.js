import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import Pokedex from "../components/Pokedex.vue";


const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/bonus', name: 'Bonus', component: Pokedex}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router