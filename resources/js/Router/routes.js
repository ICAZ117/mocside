const routes = [
    {
        path: '',
        component: () => import("../Pages/Home.vue"),
        name: 'home'
    },
    {
        path: '/courses',
        component: () => import("../Pages/Courses.vue"),
        name: "Courses"
    },
    {
        path: "/about",
        component: () => import("../Pages/About.vue"),
        name: "About"
    },
]

export default routes;