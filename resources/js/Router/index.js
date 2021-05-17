import { createRouter, createWebHistory } from 'vue-router';
import routes from "./routes";

const router = createRouter({
    histroy: createWebHistory(),
    routes
})

export default router;