const routes = [
    {
        path: '',
        component: () => import("../Pages/Home.vue"),
        name: 'home',
        // children: [
        //     {
        //         path: 'login',
        //         component: () => import("../Components/LoginModal.vue"),
        //         props: true
        //     }
        // ]
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
    {
        path: "/login",
        component: () => import("../Pages/Login.vue"),
        name: "Login"
    },
]

export default routes;