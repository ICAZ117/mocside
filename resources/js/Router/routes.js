const routes = [
    {
        path: '',
        component: () => import("../Pages/Home.vue"),
        name: 'home',
        children: [
            {
            path: 'login',
            component: () => import("../Pages/Login.vue"),
            props: true
            }
        ]
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