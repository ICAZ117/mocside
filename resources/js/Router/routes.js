import store from "../Store/index";

const routes = [
    {
        path: '',
        component: () => import("../Pages/Home.vue"),
        name: 'Home',
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
        name: "Courses",
        meta: { requiresAuth: true },
        children: [
            {
                path: ':course_id/labs',
                component: () => import("../Pages/Labs.vue"),
                name: "Labs",
                children: [
                    {
                        path: ':lab_id/problems',
                        component: () => import("../Pages/Problems.vue"),
                        name: "Problems",
                        children: [
                            {
                                path: ':problem_id/workspace',
                                component: () => import("../Pages/Workspace.vue"),
                                name: "Assignment",
                            },
                            {
                                path: ':problem_id/edit',
                                component: () => import("../Pages/CreateAssignment.vue"),
                                name: "EditAssignment",
                            },
                        ]
                    },
                    {
                        path: ':lab_id/edit',
                        component: () => import("../Pages/EditLab.vue"),
                        name: "EditLab",
                    },
                ]
            },
            {
                path: ':course_id/edit',
                component: () => import("../Pages/EditCourse.vue"),
                name: "EditCourse",
            },
        ]
        // Reference for syntax
        // beforeEnter: (to, from, next) => {
        //     if (store.getters["auth/isAdmin"]) next();
        //     else next(false);
        // }
    },
    // {
    //     path: '/courses/:id',
    //     component: () => import("../Pages/Courses.vue"),
    //     name: "labs",
    //     children: [
    //         {
    //             path: 'labs',
    //             component: () => import("../Pages/Labs.vue"),
    //         }
    //     ]
    // },
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
    {
        path: "/register",
        component: () => import("../Pages/Register.vue"),
        name: "Register"
    },
    {
        path: "/create-assignment",
        component: () => import("../Pages/CreateAssignment.vue"),
        name: "CreateAssignment"
    },
]

export default routes;