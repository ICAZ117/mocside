<template>
	<div>
    <!-- Main Page-->

    <div class="courses header">
        <h2>My Courses</h2>
        <hr>
    </div>

    <div class="coursecontainer">
        <div class="courserow row my-5">
            <!-- Image Card 1 -->
            <a href="labs.php" class="no-decor">
                <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card coursecard w-100">
                        <div class="courses card-img-top" style="background-image: url(../../img/courses/2290.png);"></div>

                        <div class="courses card-content">
                            <h6 class="card-title my-3 mx-2 mb-0">CSC 2290: Object Oriented Programming</h6>

                                <hr class="courses my-0">

                                <a href="labs.php" class="courselaunch text-danger mx-2 my-1 no-decor">Get Started</a>
                        </div>
                    </div>
                </div>
            </a>

            <!-- Image Card 2 -->
            <a href="labs.php" class="no-decor">
                <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card coursecard w-100">
                        <div class="courses card-img-top" style="background-image: url(../../img/courses/2280.png);"></div>

                        <div class="courses card-content">
                            <h6 class="card-title my-3 mx-2 mb-0">CSC 2280: Intro to Programming</h6>

                                <hr class="courses hr my-0">

                                <a href="labs.php" class="courselaunch text-danger mx-2 my-1 no-decor">Get Started</a>
                        </div>
                    </div>
                </div>
            </a>

            <!-- Image Card 3
            <a href="labs.php" class="no-decor">
                <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card coursecard w-100">
                        <div class="courses card-img-top" style="background-image: url(img/courses/2.jpg);"></div>

                        <div class="courses card-content">
                            <h6 class="card-title my-3 mx-2 mb-0">CSC 2280: Intro to Programming</h4>

                                <hr class="courses hr my-0">

                                <a href="labs.php" class="courselaunch text-danger mx-2 my-1 no-decor">Get Started</a>
                        </div>
                    </div>
                </div>
            </a>

            <a href="labs.php" class="no-decor">
                <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card coursecard w-100">
                        <div class="courses card-img-top" style="background-image: url(img/courses/2.jpg);"></div>

                        <div class="courses card-content">
                            <h6 class="card-title my-3 mx-2 mb-0">CSC 2280: Intro to Programming</h4>

                                <hr class="courses hr my-0">

                                <a href="labs.php" class="courselaunch text-danger mx-2 my-1 no-decor">Get Started</a>
                        </div>
                    </div>
                </div>
            </a>

            <a href="labs.php" class="no-decor">
                <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card coursecard w-100">
                        <div class="courses card-img-top" style="background-image: url(img/courses/2.jpg);"></div>

                        <div class="courses card-content">
                            <h6 class="card-title my-3 mx-2 mb-0">CSC 2280: Intro to Programming</h4>

                                <hr class="courses hr my-0">

                                <a href="labs.php" class="courselaunch text-danger mx-2 my-1 no-decor">Get Started</a>
                        </div>
                    </div>
                </div>
            </a> -->
        </div>
    </div>

</div>
</template>

<script>
import store from "../Store/index";
export default {
    data() {
        return {
            authUser: store.getters["auth/authUser"],
            courses: [],
        };
    },
    methods: {
        getCourses() {
            console.log(authUser);
        },
    },
    mounted() {
        console.log(authUser);
    },


};
</script>