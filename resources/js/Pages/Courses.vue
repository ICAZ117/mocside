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
          <div class="fixed-course-width" v-for="(course, key) in courses" :key="course.id" :course="course">
            <a @click="goToLabs(course.id)" class="no-decor pointer">
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
            <a v-if="isProf" @click="editCourse(course.id)" class="courselaunch text-danger mx-2 my-1 no-decor pointer">•••</a>
            <a v-if="isProf" @click="deleteCourse(course.id, course, key)" class="courselaunch text-danger mx-2 my-1 no-decor pointer">X</a>
          </div>
          <div v-if="isProf" class="add-course fixed-course-width">
            <a @click="addCourse()" class="no-decor pointer">
              <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="card coursecard w-100">
                  <div
                    class="courses card-img-add"
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
    <router-view @unmounting="Unmounting()" @courseEdited="courseEdited" v-if="childIsOpen" :courseID="courseID"></router-view>
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
      this.enrolledCourses.push(this.courseID);
      this.addProfessor();
      this.childIsOpen = true;
      this.courses.push(course.data);
      this.$router.push({ name: "EditCourse", params: { course_id: this.courseID } });
    },
    async addProfessor() {
      var payload = {
        "courses": JSON.stringify({"courses":  this.enrolledCourses}),
      };
      const prof = await API.apiClient.put(`/professors/${this.authUser.fsc_user.fsc_id}`, payload);
      return prof;
    },
    editCourse(id) {
      this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({ name: "EditCourse", params: { course_id: this.courseID } });
    },
    async deleteCourse(id, course, key) {
      var flag = confirm("Are you Sure you want to delete " + course.name);
      if(flag) {
        this.childIsOpen = false;
        //delete the course
        const res = await API.apiClient.delete(`/courses/${id}`);
        console.log(res);
        console.log("delete Course: " + id);
        var i;
        var ind = null;
        for(i = 0; i<=this.enrolledCourses.length; i++) {
          if (this.enrolledCourses[i] == id) {
            ind = i;
          }
        }
        this.enrolledCourses.splice(ind, 1);
        this.addProfessor();
        delete this.courses.course;
        this.courseID = null;
        // this.getCourses();

        //filter the courses list
        this.courses = this.courses.filter((c, i) => i  != key);
      }
      else {
        console.log("Delete avoided");
      }

    },
    goToLabs(id) {
      this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({ name: "Labs", params: { course_id: this.courseID } });
    },
    async getCourses() {
      this.courses = [];
      var i;
      for (i = 0; i < this.enrolledCourses.length; i++) {
        var cur = this.enrolledCourses[i];
        const course = await API.apiClient.get(`/courses/${cur}`);
        this.courses.push(course.data);
      }
    },
    Unmounting() {
      this.childIsOpen = false;
      this.courseID = null;
    },
    courseEdited() {
      ///update the list of courses
      this.courses.reverse();
      this.courses.reverse();
      this.childIsOpen = false;
      this.courseID = null;
    },
  },
  computed: {
    isProf: function() {
      return store.getters["auth/isProf"];
    }
  },
  mounted() {
    this.childIsOpen = false;
    this.authUser = store.getters["auth/authUser"];
    if (this.authUser.fsc_user.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.fsc_user.courses).courses;
    }
    this.getCourses();
  },
};
</script>
