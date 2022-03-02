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
		meta: { requiresAuth: true},
		children: [
			{
                path: ':course_id/edit',
                component: () => import("../Pages/EditCourse.vue"),
                name: "EditCourse",
            },
		]
	},
	{
		path: ":course_id/labs",
		component: () => import("../Pages/Labs.vue"),
		name: "Labs",
		meta: { requiresAuth: true},
		children: [
			{
				path: ':lab_id/edit',
				component: () => import("../Pages/EditLab.vue"),
				name: "EditLab",
			},
		]
	},
	{
		path: ":lab_id/problems",
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
        
	// Reference for syntax
	// beforeEnter: (to, from, next) => {
	//     if (store.getters["auth/isAdmin"]) next();
	//     else next(false);
	// }
    {
        path: "/:course_key/enroll",
        component: () => import("../Pages/CourseEnroll.vue"),
        name: "CourseEnroll",
        children: [
            {
                path: "/enroll/login",
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