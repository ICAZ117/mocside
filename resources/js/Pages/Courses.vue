<template>
  <div>
    <!-- Main Page-->
    <div v-if="!labIsOpen">
      <div class="courses header">
        <h2>My Courses</h2>
        <hr />
      </div>

      <div class="coursecontainer">
        <div class="courserow row my-5">
          <div v-for="course in courses" :key="course.id">
            <a @click="goToLabs(course.id)"  class="no-decor">
                <!-- :to="{ name: 'Labs', params: { id: course.id } }" -->
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
            </a>
          </div>
          <div class="add-course">
            <a @click="addCourse()" class="no-decor">
              <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="card coursecard w-100">
                  <div
                    class="courses card-img-top"
                    :style="{ backgroundImage: `url('../../img/courses/addcourse.png')` }"
                  ></div>
                  <div class="courses card-content">
                    <h6 class="card-title my-3 mx-2 mb-0">Add Course</h6>
                    <hr class="courses my-0" />

                    <a class="courselaunch text-danger mx-2 my-1 no-decor"></a
                    >
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div v-if="courses.length == 0">
            <h1>No Registered Courses</h1>
          </div>
        </div>
      </div>
    </div>
    <router-view @lab-unmounting="labUnmounting()" v-if="labIsOpen" :courseID="courseID"></router-view>
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
      labIsOpen: false,
      courseID: null,
    };
  },
  methods: {
    goToLabs(id) {
      this.labIsOpen = true;
      this.courseID = id;
      this.$router.push({ name: 'Labs', params: { course_id: id } })
    },
    async getCourses() {
      var i;
      for (i = 0; i < this.enrolledCourses.length; i++) {
        var cur = this.enrolledCourses[i];
        const course = await API.apiClient.get(`/courses/${cur}`);
        this.courses.push(course.data);
      }
    },
    labUnmounting() {
      this.labIsOpen=false;
      this.courseID=null;
    },
  },
  mounted() {
    this.labIsOpen = false;
    this.authUser = store.getters["auth/authUser"];
    if (this.authUser.courses){
        this.enrolledCourses = JSON.parse(this.authUser.courses).courses;
    }
    this.getCourses();
  },
};
</script>
