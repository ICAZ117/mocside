<template>
  <div>
    <!-- Main Page-->

    <div class="courses header">
      <h2>My Courses</h2>
      <hr />
    </div>

    <div class="coursecontainer">
      <div class="courserow row my-5">
        <div v-for="course in courses" :key="course.id">
          <router-link :to="{ name: 'Labs', params: { id: course.id } }" class="no-decor">
            <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div class="card coursecard w-100">
                <div
                  class="courses card-img-top"
                  :style="{ backgroundImage: `url(${course.img_loc})` }"
                ></div>
                <div class="courses card-content">
                  <h6 class="card-title my-3 mx-2 mb-0">{{ course.name }}</h6>

                  <hr class="courses my-0" />

                  <a href="Labs.vue" class="courselaunch text-danger mx-2 my-1 no-decor"
                    >Get Started</a
                  >
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Image Card 1 -->
        <!-- <a href="labs.php" class="no-decor">
                <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                    <div class="card coursecard w-100">
                        <div class="courses card-img-top" style="background-image: url(img/courses/2290.png);"></div>

                        <div class="courses card-content">
                            <h6 class="card-title my-3 mx-2 mb-0">CSC 2290: Object Oriented Programming</h6>

                                <hr class="courses my-0">

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
import * as API from "../services/API";
export default {
  data() {
    return {
      authUser: null,
      enrolledCourses: [],
      courses: [],
    };
  },
  methods: {
    async getCourses() {
      var i;
      for (i = 0; i < this.enrolledCourses.length; i++) {
        var cur = this.enrolledCourses[i];
        const course = await API.apiClient.get(`/courses/${cur}`);
        this.courses.push(course.data);
      }
    },
  },
  mounted() {
    this.authUser = store.getters["auth/authUser"];
    this.enrolledCourses = JSON.parse(this.authUser.courses).courses;
    this.getCourses();
  },
};
</script>
