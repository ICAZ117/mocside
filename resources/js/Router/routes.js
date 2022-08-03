import store from "../Store/index";

const routes = [
    {
        path: '',
        component: () => import("../Pages/Home.vue"),
        name: 'Home',
    },
	{
		path: '/courses',
		component: () => import("../Pages/Courses/Courses.vue"),
		name: "Courses",
		meta: { requiresAuth: true},
	},
    {
        path: "/courses/:courseID/edit",
        component: () => import("../Pages/Courses/EditCourse.vue"),
        name: "EditCourse",
        meta: { requiresAuth: true},
        props: true
    },
	{
		path: "/courses/:courseID/labs",
		component: () => import("../Pages/Labs/Labs.vue"),
		name: "Labs",
		meta: { requiresAuth: true},
        props: true,
	},
    {
        path: "/courses/:courseID/labs/:labID/edit",
        component: () => import("../Pages/Labs/EditLab.vue"),
		name: "EditLab",
        meta: { requiresAuth: true },
        props: true
    },
	{
		path: "/courses/:courseID/labs/:labID/problems",
		component: () => import("../Pages/Problems/Problems.vue"),
		name: "Problems",
        meta: { requiresAuth: true},
        props: true,
	},
	{
		path: "/courses/:courseID/labs/:labID/problems/:problemID/workspace",
		component: () => import("../Pages/WorkSpace/Workspace.vue"),
		name: "Assignment",
		meta: { requiresAuth: true},
		props: true
	},
    {
        path: "/courses/:courseID/labs/:labID/problems/:problemID/edit",
        component: () => import("../Pages/Problems/CreateAssignment.vue"),
        name: "EditAssignment",
        meta: {requiresAuth: true},
        props: true
    },
        
	// Reference for syntax
	// beforeEnter: (to, from, next) => {
	//     if (store.getters["auth/isAdmin"]) next();
	//     else next(false);
	// }
    {
        path: "/:course_key/enroll",
        component: () => import("../Pages/Courses/CourseEnroll.vue"),
        name: "CourseEnroll",
        children: [
            {
                path: "login",
                component: () => import("../Pages/Login.vue"),
                name: "enroll-login",
            }
        ],
    },
    {
        path: "/about",
        component: () => import("../Pages/About.vue"),
        name: "About"
    },
    {
        path: "/login",
        component: () => import("../Pages/Login.vue"),
        name: "Login",
        props: true,
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
    {
        path: "/forgot-password",
        component: () => import("../Pages/ForgotPassword.vue"),
        name: "ForgotPassword"
    },
    {
        path: "/reset-password",
        component: () => import("../Pages/ResetPassword.vue"),
        name: "ResetPassword"
    },
    {
        // catch-all path
        path: "/:pathMatch(.*)*",
        component: () => import("../Pages/NotFound.vue"),
        name: "NotFound"
    }
]

export default routes;