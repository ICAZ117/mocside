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
      <div class="filterSettings">
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
        <div class="courserow row my-5">
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
                    @click="deleteCourse(course.id, course, key)"
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
          <div v-if="courses.length == 0">
            <h1>No Registered Courses</h1>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div v-if="showOldCourses">
        <h4>Old Courses</h4>
        <hr />
        <br />

        <div class="coursecontainer">
          <div class="courserow row my-5">
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
                      @click="deleteCourse(course.id, course, key)"
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
    <router-view
      @unmounting="Unmounting()"
      @courseEdited="courseEdited"
      v-if="childIsOpen"
      :courseID="courseID"
      :courseName="courseName"
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
      courses: [], //all courses
      unfilteredCourses: [], //the filtered courses
      childIsOpen: false,
      courseID: null,
      username: "",
      rightClickID: "",
      courseName: "",
      filter: true,
      sort: "4",
      showOldCourses: false,
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
      if (this.isProf) {
        this.rightClickID = String(course_id);
        const menu = document.getElementById(this.rightClickID).childNodes[0];
        const outClick = document.getElementById("out-click");

        menu.style.top = `${window.event.clientY}px`;
        menu.style.left = `${window.event.clientX}px`;
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
      this.childIsOpen = true;
      this.courses.push(course.data.data);
      this.unfilteredCourses.push(course.data.data);
      this.sortCourses(4);
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
      this.childIsOpen = true;
      this.courseID = id;
      this.$router.push({
        name: "EditCourse",
        params: { course_id: this.courseID },
      });
    },
    async deleteCourse(id, course, key) {
      var flag = confirm("Are you Sure you want to delete " + course.name);
      if (flag) {
        this.childIsOpen = false;
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

        //filter the courses list
        this.courses = this.courses.filter((c, i) => i != key);
      } else {
        console.log("Delete avoided");
      }
    },
    goToLabs(id, name) {
      if (this.rightClickID == "") {
        this.childIsOpen = true;
        this.courseID = id;
        this.courseName = name;
        this.$router.push({
          name: "Labs",
          params: { course_id: this.courseID },
        });
      }
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

    seperateCourses() {
      console.log("HERE");
      //grabs only the courses that are currently in session
      //empty the courses list just in case
      var currentCourses = [],
        oldCourses = [];

      for (let i = 0; i < this.unfilteredCourses.length; i++) {
        if (this.withinDate(this.unfilteredCourses[i])) {
          //if within date
          currentCourses.push(this.unfilteredCourses[i]);
        } else {
          oldCourses.push(this.unfilteredCourses[i]);
        }
      }

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
        this.sortByStartDate();
      } else if (this.sort == 1) {
        //endDate
        this.sortByEndDate();
      } else if (this.sort == 2) {
        //nextDueProblem
        this.sortByNextProblemDue();
      } else if (this.sort == 3) {
        //name
        this.sortByName();
      } else {
        //default
        //course ID
        this.sortByID();
      }

      //call the filter after sorting
      this.filterByDate();
    },
    sortByStartDate() {
      //sorts the filtered results by start date
      this.unfilteredCourses.sort((a, b) => {
        //if a should be first return -1, 0 for tie, -1 if b first
        let la = a.start_date.split("-");
        let lb = b.start_date.split("-");
        let fa = Date.UTC(la[0], la[1] - 1, la[2], 0, 0, 0, 0);
        let fb = Date.UTC(lb[0], lb[1] - 1, lb[2], 0, 0, 0, 0);
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    sortByEndDate() {
      //sorts the filtered results by end date
      this.unfilteredCourses.sort((a, b) => {
        //if a should be first return -1, 0 for tie, -1 if b first
        let la = a.end_date.split("-");
        let lb = b.end_date.split("-");
        let fa = Date.UTC(la[0], la[1] - 1, la[2], 0, 0, 0, 0);
        let fb = Date.UTC(lb[0], lb[1] - 1, lb[2], 0, 0, 0, 0);
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    sortByNextProblemDue() {
      //sorts the filtered results by showing the course with the earliest due problem being first
      //this one is gonna be hard to add
    },
    sortByName() {
      //sorts the filtered results by the course name
      this.unfilteredCourses.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    sortByID() {
      //sorts the filtered results by ID of the course
      //default
      this.unfilteredCourses.sort((a, b) => {
        return a.id - b.id;
      });
    },
    Unmounting() {
      this.childIsOpen = false;
      this.courseID = null;
      var flag = this.refreshPage();
      console.log("unmounting the labs page");
      console.log(flag);
      if (flag) {
        this.$router.push({ name: "Courses" });
      }
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
    refreshPage() {
      var r = window.location.pathname;
      console.log(r);
      var sub = "/courses";
      if (r == "/") {
        console.log("on home page");
        return false;
      } else {
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
  async mounted() {
    this.childIsOpen = false;
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    console.log(this.authUser);
    if (this.authUser.fsc_user.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.fsc_user.courses).courses;
    }
    // var temp = this.enrolledCourses[0];
    // this.enrolledCourses[0] = this.enrolledCourses[1];
    // this.enrolledCourses[1] = temp;
    this.getCourses();
    this.seperateCourses();
    this.routeToChild();
  },
};
</script>
