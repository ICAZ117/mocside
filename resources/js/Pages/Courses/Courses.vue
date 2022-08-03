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
              <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div class="card coursecard w-100">
                  <div
                    class="courses card-img-top"
                    :style="{ backgroundImage: `url(${course.img_loc})` }"
                  ></div>
                  <div class="courses card-content">
                    <h6 class="card-title my-3 mx-2 mb-0">{{ course.name }}</h6>

                    <hr class="courses my-0" />

                    
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
                
                <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
                  <div class="card coursecard w-100">
                    <div
                      class="courses card-img-top"
                      :style="{ backgroundImage: `url(${course.img_loc})` }"
                    ></div>
                    <div class="courses card-content">
                      <h6 class="card-title my-3 mx-2 mb-0">{{ course.name }}</h6>

                      <hr class="courses my-0" />

                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>

<div id="out-click" @click="closeMenu"></div>
</template>

<script>
// completed the rewrite of the course page
import store from "../../Store/index";
import * as API from "../../services/API";
import { useRoute } from "vue-router";
import { computed } from "vue";
import { sort } from "../../services/Sort";
export default {
    data() {
        return {
            username: "",
            enrolledCoursesIDs: [],
            allCourses: [],
            courses: {},
            enrollCode: null,
            sort: 4,
            showDeleteModal: false,
            reloadDeleteModal: 0,
            deletingCourse: {
                id: "",
                course: {},
                key: "",
            },
            showEnrollModal: false,
            showOldCourses: false,
            rightClickID: "",
        }
    },
    setup() {
        const route = useRoute();

        const currentDirectory = computed(() => route.path);

        return {
            currentDirectory,
        }
    },
    methods: {
        // course list work
        async fetchCourses() {
            // get list of enrolledCoursesIds
            if(this.authUser.fsc_user.courses) {
                this.enrolledCoursesIDs = JSON.parse(this.authUser.fsc_user.courses).courses;
            }
            this.allCourses = [];
            // use that list to get the courses
            for (let i = 0; i < this.enrolledCoursesIDs.length; i++) {
                var cur = this.enrolledCoursesIDs[i];
                const course = await API.apiClient.get(`/courses/${cur}`);
                this.allCourses.push(course.data.data);
            }
            await this.sortCourses(4);
        },
        async sortCourses(type) {
            if (type) this.sort = type
            if(this.sort == 0) {
                this.allCourses = sort(0, this.allCourses);
            } else if (this.sort == 1) {
                this.allCourses = sort(1, this.allCourses);
            } else if (this.sort == 2) {
                this.allCourses = sort(2, this.allCourses);
            } else if (this.sort == 3) {
                this.allCourses = sort(3, this.allCourses);
            } else {
                // default
                this.allCourses = sort(5, this.allCourses);
            }

            this.filterCourses();
        },
        filterCourses() {
           // separate the courses into their respective categories
            var currentCourses = [], oldCourses = [];
            
            for (let i = 0; i < this.allCourses.length; i++) {
                if(this.withinDate(this.allCourses[i])) {
                    currentCourses.push(this.allCourses[i]);
                } else {
                    oldCourses.push(this.allCourses[i]);
                }
            }

            this.courses = {
                currentCourses,
                oldCourses,
            }
        },
        withinDate(course) {
            var now = new Date(Date.now());
            if(course.start_date == undefined || course.end_date == undefined) {
                return false;
            }
            // get date objects
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
                if(start <= now) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }

        },

        // individual course work
        //right click course
        showMenu(course_id) {
            if(this.isProf) {
                this.rightClickID = String(course_id);
                const menu = document.getElementById(this.rightClickID).childNodes[0];
                const outClick = document.getElementById("out-click");

                //move menu into position
                menu.style.top = `${window.event.pageY}px`;
                menu.style.left = `${window.event.pageX}px`;
                menu.classList.add("show");

                //place outclick on top of everything and behind menu
                outClick.style.display = "block";
            }
        },
        closeMenu() {
            try {
                document.getElementById(this.rightClickID).childNodes[0].classList.remove("show");
            } catch (e) {
                document.getElementById("out-click").style.display = "none";
                this.rightClickID = "";
            } finally {
                document.getElementById("out-click").style.display = "none";
                this.rightClickID = "";
            }
        },

        //deleting a course
        deleting(id, course, key) {
            document.getElementById("out-click").style.display = "none";
            this.showDeleteModal = true;
            this.deletingCourse.id = id
            this.deletingCourse.course = course;
            this.deletingCourse.key = key;
        },
        closeDeleting() {
            this.showDeleteModal = false;
        },
        async deleteCourse() {
            var id = this.deletingCourse.id;
            var course = this.deletingCourse.course;
            var key = this.deletingCourse.key;

            // remove the outclick section from the screen
            document.getElementById("out-click").style.display="none";

            //delete the course
            const res = await API.apiClient.delete(`/courses/${id}`);
            
            // remove the course from the list of enrolled course ids
            var i;
            var ind = null;
            for (i = 0; i < this.enrolledCoursesIDs.length; i++) {
                if(this.enrolledCoursesIDs[i] == id) {
                    ind = i;
                    break;
                }
            }
            this.enrolledCoursesIDs.splice(ind, 1);

            //remove from backend list
            this.addProfessor();
            //remove from frontend list
            delete this.courses.course;

            this.courseID = null;

            //delete from the list of courses
            this.courses.currentCourses = this.courses.currentCourses.filter(course => course.id != id);
            this.courses.oldCourses = this.courses.oldCourses.filter(course => course.id != id);

            this.closeDeleting();

        },
        //enrolling in a course
        async enroll() {
            const res = await API.apiClient.get(`/invite/${this.enrollCode}`);
            const course = res.data.data;

            if(course == null) {
                this.$notify({type: "error", text: "That course enroll code is invalid!"});
            } else {
                //check if the enroll code has been used maximum number of times
                if(course.max_uses != 0 && course.uses >= course.max_uses) {
                    this.$notify({type: "error", text: "The maximum number of uses for that course enroll code has already been reached!"});

                } else {
                    //the number of uses is unlimited or not reached yet
                    // check if within the expire date of the code
                    var currentTime = new Date(
                        new Date(Date.now()).toISOString().split("T")[0] + " " + new Date(Date.now()).toISOString().split("T")[1].split(".")[0]
                    );
                    var expirationDate = new Date(course.expire_date);

                    if(currentTime > expirationDate) {
                        this.$notify({type: "error", text: "That course enroll code has expired!"});
                    } else {
                        // the code is valid, push to enroll page
                        this.$router.push("/" + this.enrollCode + "/enroll");
                    }
                }
            }
        },
        //adding a course
        async addCourse() {
            var payload = {
                name: "New Course",
                description: "New Course",
                owner_id: this.authUser.fsc_user.fsc_id,
            };
            const course = await API.apiClient.post("/courses", payload);
            var id = course.data.data.id;
            this.enrolledCoursesIDs.push(id);
            //add to professors list of course on backend
            await this.addProfessor();
            //add to frontend list of courses
            this.allCourses.push(course.data.data);
            this.courses.currentCourses.push(course.data.data);
            await this.sortCourses(this.courses.currentCourses, 4);

            //get authUser to update
            await this.$store.dispatch("auth/getAuthUser");

            //initialize the course gradebook
            const gradebook = await API.apiClient.post(`/gradebook/init/${id}`, {
                scope: "course",
            });
            //move to edit course page
            this.$router.push({
                name: "EditCourse",
                params: { courseID: id },
            });
        },

        //User Related Functions
        async addProfessor() {
            var payload = {
                courses: JSON.stringify({ courses: this.enrolledCoursesIDs})
            };
            const prof = await API.apiClient.put(`/professors/${this.authUser.fsc_user.fsc_id}`, payload);
            return prof;
        },

        // routing functions
        goToLabs(id, name) {
            if(this.rightClickID == "") {
                this.$router.push({
                    name: "Labs",
                    params: { courseID: id, courseName: name },
                });
            }
        },
        editCourse(id) {
            this.$router.push({
                name: "EditCourse",
                params: { courseID: id },
            });
        },
    },
    computed: {
        authUser: function() {
            return store.getters["auth/authUser"];
        },
        isProf: function() {
            if (store.getters["auth/isProf"] == null) {
                return false;
            } else {
                return store.getters["auth/isProf"];
            }
        },
    },
    watch: {
        showDeleteModal: function() {
            if (!this.showDeleteModal) {
                this.reloadDeleteModal++;
            }
        }
    },
    async mounted() {
        this.username = this.authUser.username;
        await this.fetchCourses();
    },
}
</script>

<style>

</style>