<template>
  <div>
    <!-- Main Page-->
    <div v-if="!childIsOpen">
      <div class="courses header">
        <div class="heading">
          <h2>My Courses</h2>
          <hr />
        </div>
      </div>
      <small class="navigation"
        ><span>{{ username }}{{ currentDirectory }}</span></small
      >
      <br />

      <div class="coursecontainer">
        <div class="courserow row my-5">
          <div
            class="fixed-course-width"
            v-for="(course, key) in courses"
            :key="course.id"
            :course="course"
          >
            <a
              :id="course.id"
              @contextmenu.prevent="showMenu(event, course.id)"
              @click="goToLabs(course.id)"
              class="no-decor pointer"
            >
              <ul id="menu">
                <li class="menu-item">
                  <a
                    v-show="isProf"
                    class="pointer no-decor"
                    @click="editCourse(course.id)"
                    >Edit</a
                  >
                </li>
                <li class="menu-item">
                  <a
                    v-show="isProf"
                    class="pointer no-decor"
                    @click="deleteCourse(course.id, course, key)"
                    >Delete</a
                  >
                </li>
                <li>{{ course.id }}</li>
                <li>{{ course }}</li>
              </ul>
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
          </div>
          <div v-if="isProf" class="add-course fixed-course-width">
            <a @click="addCourse()" class="no-decor pointer">
              <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="card coursecard w-100">
                  <div class="courses card-img-add"></div>
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
      @unmounting="Unmounting()"
      @courseEdited="courseEdited"
      v-if="childIsOpen"
      :courseID="courseID"
    ></router-view>
  </div>

  <div id="out-click" @click="closeMenu"></div>
</template>

<script>
import store from "../Store/index";
import * as API from "../services/API";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  data() {
    return {
      authUser: null,
      enrolledCourses: [],
      courses: [],
      childIsOpen: false,
      courseID: null,
      username: "",
      rightClickID: "",
    };
  },

  setup() {
    const route = useRoute();

    const currentDirectory = computed(() => route.path);

    return {
      currentDirectory,
    };
  },
  methods: {
    showMenu(course_id) {
      this.rightClickID = course_id;
      const menu = document.getElementById('"' + course_id + '"').childNodes[0];
      const outClick = document.getElementById("out-click");

      console.log(menu);
      console.log(outClick);

      menu.style.top = `${window.event.clientY}px`;
      menu.style.left = `${window.event.clientX}px`;
      menu.classList.add("show");

      outClick.style.display = "block";
    },
    closeMenu(course_id) {
      this.rightClickID = course_id;
      const menu = document.getElementById(course_id).childNodes[0];
      const outClick = document.getElementById("out-click");

      menu.classList.remove("show");
      outClick.style.display = "none";
    },
    async addCourse() {
      var payload = {
        name: "New Course",
        description: "New Course",
        owner_id: this.authUser.fsc_user.fsc_id,
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
        courses: JSON.stringify({ courses: this.enrolledCourses }),
      };
      const prof = await API.apiClient.put(
        `/professors/${this.authUser.fsc_user.fsc_id}`,
        payload
      );
      return prof;
    },
    editCourse(id) {
      this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({ name: "EditCourse", params: { course_id: this.courseID } });
    },
    async deleteCourse(id, course, key) {
      var flag = confirm("Are you Sure you want to delete " + course.name);
      if (flag) {
        this.childIsOpen = false;
        //delete the course
        const res = await API.apiClient.delete(`/courses/${id}`);
        console.log(res);
        console.log("delete Course: " + id);
        var i;
        var ind = null;
        for (i = 0; i <= this.enrolledCourses.length; i++) {
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
        this.courses = this.courses.filter((c, i) => i != key);
      } else {
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
        this.courses.push(course.data.data);
      }
    },
    Unmounting() {
      this.childIsOpen = false;
      this.courseID = null;
      this.$router.push({ name: "Courses" });
    },
    async courseEdited() {
      ///update the list of courses
      this.courses = this.courses.filter((c) => c.id != this.courseID);
      const course = await API.apiClient.get(`/courses/${this.courseID}`);
      this.courses.push(course.data.data);
      this.Unmounting();
    },
    hasLabAccess(cID) {
      for (let i = 0; i < this.enrolledCourses.length; i++) {
        if (this.enrolledCourses[i] == cID) {
          return true;
        }
      }
      return false;
    },
    hasEditAccess(cID) {
      if (isProf) {
        return this.hasLabAccess(cID);
      } else {
        return false;
      }
    },
    routeToChild() {
      var r = window.location.pathname;
      var sub = "/courses";
      var c = r.substring(sub.length);
      if (c == "") {
        console.log("just on the courses page");
      } else {
        console.log("on this page: " + c);
        var c = c.split("/");
        var cID = c[1];
        var path = c[2]; //labs, or edit, and maybe something else

        if (path == "labs") {
          //check if can go there
          if (this.hasLabAccess(cID)) {
            this.goToLabs(cID);
          }
        } else if (path == "edit") {
          //check if can go there
          if (this.hasEditAccess(cID)) {
            this.editCourse(cID);
          }
        } else {
          console.log(path);
        }
      }
    },
  },
  computed: {
    isProf: function () {
      if (store.getters["auth/isProf"] == null) {
        return false;
      } else {
        return store.getters["auth/isProf"];
      }
    },
  },
  async mounted() {
    this.childIsOpen = false;
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    console.log(this.authUser);
    if (this.authUser.fsc_user.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.fsc_user.courses).courses;
    }
    this.getCourses();
    this.routeToChild();
  },
};
</script>
