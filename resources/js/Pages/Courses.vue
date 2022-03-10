<template>
  <div>
    <!-- Main Page-->
    <div>
      <vue-final-modal
        class="delete-modal"
        v-model="showDeleteModal"
        classes="modal-container"
        content-class="modal-content delete-modal"
        :esc-to-close="true"
      >
        <button class="modal-close" @click="closeDeleting()">x</button>
        <div class="delete Course">
          <p>Are you sure you would like to delete {{ deletingCourse.course.name }}</p>
          <div class="delete-buttons">
            <button class="btn btn-md btn-danger delete-button" @click="closeDeleting()">
              Cancel
            </button>
            <button class="btn btn-md btn-danger delete-button" @click="deleteCourse()">
              Delete
            </button>
          </div>
        </div>
      </vue-final-modal>
      <vue-final-modal
        class="delete-modal"
        v-model="showEnrollModal"
        classes="modal-container"
        content-class="modal-content delete-modal"
        :esc-to-close="true"
      >
        <button class="modal-close" @click="showEnrollModal = false">x</button>
        <div class="enrollModal">
          <label for="enrollCode">Course Enroll Code:&nbsp;&nbsp;</label>
          <input id="enrollCode" name="enrollCode" type="text" v-model="enrollCode" />
          <br />
          <button class="btn btn-success btn-md" @click="enroll()">Enroll</button>
        </div>
      </vue-final-modal>
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
      <div class="filterSettings">
        <span>Display Archived Courses: </span>
        <label class="switch">
          <!-- <input type="checkbox" @change="filterByDate()" v-model="filter" /> -->
          <input type="checkbox" v-model="showOldCourses" />
          <span class="slider round"></span>
        </label>
        <br />
        <div class="dropdown">
          <button class="dropbtn fas fa-filter"></button>
          <div class="dropdown-content">
            <small
              ><span @click="sortCourses(0)" :class="sort == 0 ? 'selected' : ''"
                >Start</span
              ></small
            >
            <small
              ><span @click="sortCourses(1)" :class="sort == 1 ? 'selected' : ''"
                >End</span
              ></small
            >
            <small
              ><span @click="sortCourses(2)" :class="sort == 2 ? 'selected' : ''"
                >Next Problem Due</span
              ></small
            >
            <small
              ><span @click="sortCourses(3)" :class="sort == 3 ? 'selected' : ''"
                >Name</span
              ></small
            >
            <small
              ><span @click="sortCourses(4)" :class="sort == 4 ? 'selected' : ''"
                >Unsorted</span
              ></small
            >
          </div>
        </div>
      </div>
      <br />

      <div class="coursecontainer">
        <div class="courserow row mb-5">
          <div
            class="fixed-course-width"
            v-for="(course, key) in courses.currentCourses"
            :key="course.id"
            :course="course"
          >
            <span
              :id="course.id"
              @contextmenu.prevent="showMenu(course.id)"
              @click.prevent="goToLabs(course.id, course.name)"
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
                    @click="deleting(course.id, course, key)"
                    >Delete</a
                  >
                </li>
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
            </span>
          </div>
          <!-- Create New Course as Professor -->
          <div v-if="isProf" class="add-course fixed-course-width">
            <a @click="addCourse()" class="no-decor pointer">
              <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div
                  class="card coursecard w-100"
                  style="background-color: transparent !important"
                >
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

          <!-- Enroll in course as student -->
          <div v-if="!isProf" class="add-course fixed-course-width">
            <a @click="showEnrollModal = true" class="no-decor pointer">
              <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div
                  class="card coursecard w-100"
                  style="background-color: transparent !important"
                >
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

      <div id="archived-courses" v-if="showOldCourses" style="width: 100%">
        <div class="oldCourseHeader">
          <h4>Archived Courses</h4>
          <hr />
        </div>
        <br />

        <div id="course-container" class="coursecontainer">
          <div class="courserow row mb-5">
            <div
              class="fixed-course-width"
              v-for="(course, key) in courses.oldCourses"
              :key="course.id"
              :course="course"
            >
              <span
                :id="course.id"
                @contextmenu.prevent="showMenu(course.id)"
                @click.prevent="goToLabs(course.id, course.name)"
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
                      @click="deleting(course.id, course, key)"
                      >Delete</a
                    >
                  </li>
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
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <router-view
      @unmounting="Unmounting()"
      @courseEdited="courseEdited"
      @pushToLabs="pushToLabs"
      @studentView="pushToCourses"
      @editLab="pushToLabEdit"
      v-if="childIsOpen"
      :courseID="courseID"
      :courseName="courseName"
    ></router-view> -->
  </div>

  <div id="out-click" @click="closeMenu"></div>
  <!-- <div v-if="!childIsOpen" id="out-click" @click="closeMenu"></div> -->
  
</template>

<script>
import store from "../Store/index";
import * as API from "../services/API";
import { useRoute } from "vue-router";
import { computed } from "vue";
import {sort} from "../services/Sort";

export default {
  data: () => ({
    authUser: null,
    enrolledCourses: [],
    courses: [], //all courses
    unfilteredCourses: [], //the filtered courses
    // childIsOpen: false,
    courseID: null,
    username: "",
    rightClickID: "",
    courseName: "",
    filter: true,
    sort: "4",
    showOldCourses: false,
    showDeleteModal: false,
    showEnrollModal: false,
    reloadDeleteModal: 0,
    deletingCourse: {
      id: "",
      course: {},
      key: "",
    },
    ignoreUnmount: false,
    enrollCode: "",
  }),
  setup() {
    const route = useRoute();

    const currentDirectory = computed(() => route.path);

    return {
      currentDirectory,
    };
  },
  methods: {
    async enroll() {
      const res = await API.apiClient.get(`/invite/${this.enrollCode}`);
      const course = res.data.data;

      console.log(course);

      if (course == null) {
        console.log("Course not found!");
        this.$notify({ type: "error", text: "That course enroll code is invalid!" });
      } else {
        if (course.max_uses != 0 && course.uses >= course.max_uses) {
          this.$notify({
            type: "error",
            text:
              "The maximum number of uses for that course enroll code has already been reached!",
          });
        } else {
          var currentTime = new Date(
            new Date().toISOString().split("T")[0] +
              " " +
              new Date().toISOString().split("T")[1].split(".")[0]
          );
          var expirationDate = new Date(course.expire_date);

          if (currentTime > expirationDate) {
            this.$notify({
              type: "error",
              text: "That course enroll code has expired!",
            });
          } else {
            this.$router.push("/" + this.enrollCode + "/enroll");
          }
        }
      }
    },
    showMenu(course_id) {
      if (this.isProf) {
        this.rightClickID = String(course_id);
        const menu = document.getElementById(this.rightClickID).childNodes[0];
        const outClick = document.getElementById("out-click");

        menu.style.top = `${window.event.pageY}px`;
        menu.style.left = `${window.event.pageX}px`;
        menu.classList.add("show");
        outClick.style.display = "block";
      }
    },
    closeMenu() {
      try {
        document.getElementById(this.rightClickID).childNodes[0].classList.remove("show");
      } catch (e) {}
      document.getElementById("out-click").style.display = "none";
      this.rightClickID = "";
    },
    async addCourse() {
      var payload = {
        name: "New Course",
        description: "New Course",
        owner_id: this.authUser.fsc_user.fsc_id,
      };
      const course = await API.apiClient.post(`/courses`, payload);
      this.courseID = course.data.data.id;
      this.enrolledCourses.push(this.courseID);
      this.addProfessor();
      // this.childIsOpen = true;
      this.courses.currentCourses.push(course.data.data);
      this.unfilteredCourses.push(course.data.data);
      this.sortCourses(4);
      // init gradebook
      const gradebook = await API.apiClient.post(`/gradebook/init/${this.courseID}`, {
        scope: "course",
      });
      this.$router.push({
        name: "EditCourse",
        params: { course_id: this.courseID },
      });
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
      // this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({
        name: "EditCourse",
        params: { course_id: this.courseID },
      });
    },
    closeDeleting() {
      this.showDeleteModal = false;
    },
    deleting(id, course, key) {
      document.getElementById("out-click").style.display = "none";
      this.showDeleteModal = true;
      this.deletingCourse.id = id;
      this.deletingCourse.course = course;
      this.deletingCourse.key = key;
    },
    async deleteCourse() {
      var id = this.deletingCourse.id;
      var course = this.deletingCourse.course;
      var key = this.deletingCourse.key;
      // this.childIsOpen = false;
      document.getElementById("out-click").style.display = "none";
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
      //delete from unfiltered
      this.unfilteredCourses = this.unfilteredCourses.filter((c) => c.id != id);

      //reset courses lists
      this.separateCourses();
      this.closeDeleting();
    },
    goToLabs(id, name) {
      if (this.rightClickID == "") {
        this.courseID = id;
        this.courseName = name;
        this.$router.push({
          name: "Labs",
          params: { courseID: this.courseID },
        });
      }
    },
    pushToLabs: function (params) {
      this.ignoreUnmount = true;
      var courseID = params[0];
      var courseName = params[1];
      var id = params[2];
      var name = params[3];
      this.routeToLabs(courseID, id);
    },
    routeToLabs(courseID, labID) {
      //first go to labs page
      console.log("routeToLabs");
      console.log(this.ignoreUnmount);
      this.$router.push("/courses/" + courseID + "/labs/" + labID + "/problems");
    },
    pushToLabEdit: function (params) {
      this.ignoreUnmount = true;
      var courseID = params[0];
      var courseName = params[1];
      var id = params[2];
      var name = params[3];
      this.routeToLabEdit(courseID, id);
    },
    routeToLabEdit(courseID, labID) {
      console.log("route to lab edit");
      console.log(this.ignoreUnmount);
      this.$router.push("/courses/" + courseID + "/labs/" + labID + "/edit");
    },
    pushToCourses: function (params) {
      this.ignoreUnmount = true;
      var courseID = params[0];
      var courseName = params[1];
      this.routeToCourses(courseID);
    },
    routeToCourses(courseID) {
      console.log("routeToCourses");
      console.log(this.ignoreUnmount);
      this.$router.push("/courses/" + courseID + "/labs");
    },
    async getCourses() {
      this.courses = [];
      this.unfilteredCourses = [];
      for (let i = 0; i < this.enrolledCourses.length; i++) {
        var cur = this.enrolledCourses[i];
        const course = await API.apiClient.get(`/courses/${cur}`);
        this.unfilteredCourses.push(course.data.data);
        // this.courses.push(course.data.data);
      }
      this.sortCourses(4);
    },
    filterByDate() {
      //grabs only the courses that are currently in session
      //empty the courses list just in case
      this.courses = [];

      if (this.filter) {
        //true if the filter is on
        for (let i = 0; i < this.unfilteredCourses.length; i++) {
          if (this.withinDate(this.unfilteredCourses[i])) {
            //if within date
            this.courses.push(this.unfilteredCourses[i]);
          }
        }
      } else {
        //filter is not on...therefore grab all courses
        for (let i = 0; i < this.unfilteredCourses.length; i++) {
          this.courses.push(this.unfilteredCourses[i]);
        }
      }
    },

    separateCourses() {
      console.log("HERE");
      //grabs only the courses that are currently in session
      //empty the courses list just in case
      var currentCourses = [],
        oldCourses = [];

      for (let i = 0; i < this.unfilteredCourses.length; i++) {
        console.log("Inside for-loop");
        if (this.withinDate(this.unfilteredCourses[i])) {
          //if within date
          console.log("current");
          currentCourses.push(this.unfilteredCourses[i]);
        } else {
          console.log("old");
          oldCourses.push(this.unfilteredCourses[i]);
        }
      }

      console.log(currentCourses);
      console.log(oldCourses);

      this.courses = {
        currentCourses,
        oldCourses,
      };
      console.log(this.courses);
    },
    withinDate(course) {
      //return true if the course is still in session
      //false otherwise
      var now = new Date(Date.now());
      if (course.start_date == undefined) {
        return false;
      }
      if (course.end_date == undefined) {
        return false;
      }
      var sd = course.start_date.split("-")[2];
      var sm = course.start_date.split("-")[1] - 1;
      var sy = course.start_date.split("-")[0];
      var ed = course.end_date.split("-")[2];
      var em = course.end_date.split("-")[1] - 1;
      var ey = course.end_date.split("-")[0];

      var start = new Date(
        sy,
        sm,
        sd,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );
      var end = new Date(
        ey,
        em,
        ed,
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds()
      );

      if (end >= now) {
        //before end of course, day of the end
        if (start <= now) {
          //after start of course, day of start
          return true;
        } else {
          return false;
        }
      } else {
        //after end of course
        return false;
      }
    },
    sortCourses(type) {
      this.sort = type;
      //get sort method and call it
      if (this.sort == 0) {
        //startDate
        this.unfilteredCourses = sort(0, this.unfilteredCourses);
      } else if (this.sort == 1) {
        //endDate
        this.unfilteredCourses = sort(1, this.unfilteredCourses);
      } else if (this.sort == 2) {
        //nextDueProblem
        this.unfilteredCourses = sort(2, this.unfilteredCourses);
      } else if (this.sort == 3) {
        //name
        this.unfilteredCourses = sort(3, this.unfilteredCourses);
      } else {
        //default
        //course ID
        this.unfilteredCourses = sort(5, this.unfilteredCourses);
      }

      //call the filter after sorting
      this.separateCourses();
    },
    Unmounting() {
      if (!this.ignoreUnmount) {
        // this.childIsOpen = false;
        this.courseID = null;
        var flag = this.refreshPage();
        console.log("unmounting the labs page");
        if (flag) {
          this.$router.push({ name: "Courses" });
        } else {
          this.routeToChild();
        }
      }
      this.ignoreUnmount = false;
    },
    async courseEdited() {
      ///update the list of courses
      this.unfilteredCourses = this.unfilteredCourses.filter(
        (c) => c.id != this.courseID
      );
      const course = await API.apiClient.get(`/courses/${this.courseID}`);
      this.unfilteredCourses.push(course.data.data);
      this.separateCourses();
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
      if (this.isProf) {
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
        return true;
      } else {
        console.log("on this page: " + c);
        var c = c.split("/");
        var cID = c[1];
        var path = c[2]; //labs, or edit, and maybe something else

        if (path == "labs") {
          //check if can go there
          if (this.hasLabAccess(cID)) {
            this.goToLabs(cID, "");
          }
        } else if (path == "edit") {
          //check if can go there
          if (this.hasEditAccess(cID)) {
            this.editCourse(cID);
          }
        } else {
          console.log(path);
        }
        return false;
      }
    },
    refreshPage() {
      var r = window.location.pathname;
      var sub = "/courses";
      if (r == "/") {
        console.log("on home page");
        return false;
      }
      else if (r == "/profile") {
        return false;
      } else {
        // var c = r.substring(sub.length);
        // if(c != "") {
        //   return false;
        // }
        // causes problem when the user wants to go from says labs back to courses
        return true;
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
  watch: {
    showDeleteModal: function () {
      if (!this.showDeleteModal) {
        this.reloadDeleteModal++;
      }
    },
  },
  async mounted() {
    console.log("mounted course page");
    // this.childIsOpen = false;
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    console.log(this.authUser);
    if (this.authUser.fsc_user.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.fsc_user.courses).courses;
    }
    // var temp = this.enrolledCourses[0];
    // this.enrolledCourses[0] = this.enrolledCourses[1];
    // this.enrolledCourses[1] = temp;
    await this.getCourses();
    this.separateCourses();
    this.routeToChild();

    // // test of laravel-echo on 10/16/21
    // Echo.channel(`term.${this.authUser.fsc_user.fsc_id}`)
    //   .listen(".console_out", (e) => {
    //     console.log(e);
    //   });
  },
};
</script>
