<template>
  <div>
    <!-- Main Page-->
    <div v-if="!childIsOpen">
      <div class="courses header">
        <h2>My Courses</h2>
        <hr />
      </div>

      <div class="coursecontainer">
        <div class="courserow row my-5">
          <div v-for="course in courses" :key="course.id">
            <a @click="goToLabs(course.id)" class="no-decor">
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

                    <!-- <a href="Labs.vue" class="courselaunch text-danger mx-2 my-1 no-decor"
                      >Get Started</a
                    > -->
                  </div>
                </div>
              </div>
            </a>
            <a @click="editCourse(course.id)" class="courselaunch text-danger mx-2 my-1 no-decor">•••</a>
            <a @click="deleteCourse(course.id)" class="courselaunch text-danger mx-2 my-1 no-decor">X</a>
          </div>
          <div class="add-course">
            <a @click="addCourse()" class="no-decor">
              <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="card coursecard w-100">
                  <div
                    class="courses card-img-top"
                    :style="{
                      backgroundImage: `url('../../img/courses/addcourse.png')`,
                    }"
                  ></div>
                  <!-- <div class="courses card-content">
                    <h6 class="card-title my-3 mx-2 mb-0">Add Course</h6>
                    <hr class="courses my-0" />

                    <a class="courselaunch text-danger mx-2 my-1 no-decor"></a
                    >
                  </div> -->
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
    <router-view
      @lab-unmounting="childUnmounting()"
      @edit-unmounting="childUnmounting()"
      v-if="childIsOpen"
      :courseID="courseID"
    ></router-view>
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
      childIsOpen: false,
      courseID: null,
    };
  },
  methods: {
    async addCourse() {
      var payload = {
        name: "New Course",
        description: "New Course",
      };
      const course = await API.apiClient.post(`/courses`, payload);
      this.courseID = course.data.id;
      this.childIsOpen = true;
      this.$router.push({
        name: "EditCourse",
        params: { course_id: this.courseID },
      });
    },
    editCourse(id) {
      this.childIsOpen = true;
      this.CourseID = id;
      console.log("ID: " + id + "\nCourse ID: " + this.courseID);
      this.$router.push({ name: "EditCourse", params: { course_id: this.courseID } });
    },
    deleteCourse(id) {
      this.childIsOpen = false;
      //delete the course
      console.log("delete Course: " + id);
      this.courseID = null;
    },
    goToLabs(id) {
      this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({ name: "Labs", params: { course_id: this.courseID } });
    },
    async getCourses() {
      var i;
      for (i = 0; i < this.enrolledCourses.length; i++) {
        var cur = this.enrolledCourses[i];
        const course = await API.apiClient.get(`/courses/${cur}`);
        this.courses.push(course.data);
      }
    },
    childUnmounting() {
      this.childIsOpen = false;
      this.courseID = null;
    },
  },
  mounted() {
    this.childIsOpen = false;
    this.authUser = store.getters["auth/authUser"];
    if (this.authUser.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.courses).courses;
    }
    this.getCourses();
  },
};
</script>
