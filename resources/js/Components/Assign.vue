<template>
  <div class="create-assignment">
    <div class="container">
      <button class="btn btn-primary btn-md publish-all">PUBLISH TO ALL</button>
      <br />

      <div class="no-decor">
        <div class="row">
          <div
            v-for="course in courses"
            :key="course.id"
            class="margin width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12"
          >
            <div class="card editcoursecard w-100">
              <div class="courses card-content">
                <h4 class="card-title my-3 mx-2 mb-0">
                  {{ course.name }}
                </h4>

                <hr class="courses my-0" />

                <div class="card-body center">
                  <div class="row">
                    <div class="col-4">Publish:</div>
                    <div class="col-8">
                      <label class="switch">
                        <input type="checkbox" @click="publish(course)" v-model="course.isPublished" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4">Add:</div>
                    <div class="col-8">
                      <label class="switch">
                        <input type="checkbox" @click="toggleToCourse(course)" v-model="course.isAdded" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <br />

                  <label for="lab-select">Lab:</label>
                  <br />
                  <small>
                    <select id="lab-select" @click="switchLab(course)" v-model="course.currentLab">
                      <option value="" selected hidden disabled>Select a lab...</option>
                      <option v-for="lab in course.labs" :key="lab.id" :value="lab">
                        {{ lab.name }}
                      </option>
                    </select>
                  </small>

                  <br /><br />

                  <label for="dueDate">Due Date: </label>
                  <input type="date" id="dueDate" v-model="course.publishDueDate" />
                </div>

                <hr class="courses my-0" />

                <div class="card-footer">
                  <div class="row center">
                    <div class="col-6">
                      <small><a href="" class="no-decor">Student Preview</a></small>
                    </div>
                    <div class="col-6">
                      <small
                        ><a href="" class="no-decor"
                          >Gradebook &<br />Submissions</a
                        ></small
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../Store/index";
import * as API from "../services/API";

export default {
  props: ['problemID'],
  data() {
    return {
      labs: [],
      courses: [],
      authUser: null,
      enrolledCourses: [],
    };
  },
  watch: {
    courses: {
      deep: true,
      handler() {
        console.log("Published Changed");
      }
    }
  },
  methods: {
    async getCourses() {
      this.courses = [];
      for (let i = 0; i < this.enrolledCourses.length; i++) {
        var cur = this.enrolledCourses[i];
        const course = await API.apiClient.get(`/courses/${cur}`);
        this.courses.push(course.data.data);
        await this.getLabs(this.courses[i].id);
        this.courses[i].labs = this.labs;
        this.courses[i].publishedLabs = await this.getPublishedList();
        this.courses[i].addedLabs = await this.getLabIDs();
        this.courses[i].currentLab = "";
        this.courses[i].publishDueDate = "";
        this.courses[i].isAdded = false;
        this.courses[i].isPublished = false;

      }
    },
    getDueDate() {

      return Date.now();
    },
    async getLabIDs() {
      const res = await API.apiClient.get(`/problems/copies/${this.problemID}`);
      var copies = res.data.data;
      var temp = [];
      for(let i = 0; i < copies.length; i++) {
        temp.push(copies[i].lab_id);
      }
      return temp;
    },
    async getPublishedList() {
      const res = await API.apiClient.get(`/problems/copies/${this.problemID}`);
      var copies = res.data.data;
      var temp = [];
      for(let i = 0; i < copies.length; i++) {
        temp.push(copies[i].isPublished);
      }
      return temp;
    },
    getIsAdded(course, lab) {
      for(let i = 0; i < course.addedLabs.length; i++) {
        if(course.addedLabs[i] == lab.id) {
          return true;
        }
      }
      return false;
    },
    getIsPublished(course, lab) {
      for(let i = 0; i < course.publishedLabs.length; i++) {
        if(course.publishedLabs[i] == lab.id) {
          return true;
        }
      }
      return false;
    },
    async getLabs(courseID) {
      const rawLabs = await API.apiClient.get(`/labs/${courseID}`);
      this.labs = rawLabs.data.data;
      return rawLabs.data.data;
    },
    async publish(course) {
      if(course.currentLab != "") {
        console.log("published or unpublished");
        var payload = {
          "published": !course.isPublished,
        }
        //api call
      }
    },
    async toggleToCourse(course) {
      if(course.currentLab != "") {
        console.log("added/removed to " + course.name + " " + course.currentLab);
      }
      else {
        console.log("must choose lab");
      }
    },
    removeAdded(course, id) {
      for(let i = 0; i < course.addedLabs.length; i++) {
        if(course.addedLabs[i] == id) {
          course.addedLabs.splice(i, 1);
        }
      }
    },
    removePublished(course, id) {
      for(let i = 0; i < course.publishedLabs.length; i++) {
        if(course.publishedLabs[i] == id) {
          course.publishedLabs.splice(i, 1);
        }
      }
    },
    extendAdded(course, id) {
      course.addedLabs.push(id);
    },
    extendPublished(course, id) {
      course.publishedLabs.push(id);
    },
    switchLab(course) {
      // for addding or removing/publishing unpublishing to a course
      // if(course.currentLab == "" || course.currentLab == undefined) {
      //   console.log("must choose lab");
      // }
      // else {
      //   //remove or add to lists
      //   if(course.isAdded == true) {
      //     removeAdded(course, course.currentlab.id);
      //   }
      //   else {
      //     extendeAdded(course, course.currentlab.id);
      //   }
      //   if(course.isPublished == true) {
      //     removePublished(course, course.currentlab.id);
      //   }
      //   else {
      //     extendePublished(course, course.currentlab.id);
      //   }

      //   //change quick value
      //   course.isAdded = !course.isAdded;
      //   course.isPublished = !course.isPublished;

      //   //change in database

      // }

      course.isAdded = getIsAdded(course, course.currentLab);
      course.isPublished = this.getIsPublished(course, course.currentLab);
    },
  },
  mounted() {
    this.authUser = store.getters["auth/authUser"];
    if (this.authUser.fsc_user.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.fsc_user.courses).courses;
    }
    this.getCourses();
  },
};
</script>

<style></style>
