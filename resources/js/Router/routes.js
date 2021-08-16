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
    {
        path: "/:course_key/enroll",
        component: () => import("../Pages/CourseEnroll.vue"),
        name: "CourseEnroll",
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
    {
        path: "/register",
        component: () => import("../Pages/Register.vue"),
        name: "Register"
    },
    {
        path: "/testing",
        component: () => import("../Pages/Test.vue"),
        name: "Testing"
    },
    {
        path: "/profile",
        component: () => import("../Pages/Profile.vue"),
        name: "MyProfile"
    },
    {
        path: '/profile/:fsc_id',
        component: () => import("../Pages/Profiles.vue"),
        props: true,
        name: "Profile",
    },
    {
        path: "/contact",
        component: () => import("../Pages/Contact.vue"),
        name: "Contact"
    },
]

export default routes;