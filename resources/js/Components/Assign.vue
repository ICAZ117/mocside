<template>
  <div class="create-assignment">
    <div class="container">
      <button class="btn btn-primary btn-md publish-all">PUBLISH TO ALL</button>
      <br />

      <div class="no-decor">
        <div class="row">
          <div
            v-for="(course, index) in courses"
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
                        <input type="checkbox" v-model="course.isPublished" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4">Add:</div>
                    <div class="col-8">
                      <label class="switch">
                        <input type="checkbox" v-model="course.isAdded" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <br />

                  <label for="lab-select">Lab:</label>
                  <br />
                  <small>
                    <select id="lab-select" @click="temp()" v-model="course.currentLab">
                      <option value="" selected hidden disabled>Select a lab...</option>
                      <option v-for="lab in labs[index]" :key="lab.id" :value="lab">
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
      authUser: null,
      enrolledCourses: [],
      courses: [],
      labs: [], //list of lists
    };
  },
  watch: {
    courses: {
      deep: true,
      handler() {
        console.log("something in the courses list changed");
      }
    }
  },
  methods: {
    // Getter Methods
    async getCourses() {
      for(let i = 0;  i < this.enrolledCourses.length; i++) {
        var currentCourse = this.enrolledCourses[i];
        const course = await  API.apiClient.get(`/courses/${currentCourse}`);
        this.courses.push(course.data.data);
        const labs = await this.getLabs(this.courses[i].id);
        this.labs.push(labs);
      }

    },
    async getLabs(courseID) {
      const rawLabs = await API.apiClient.get(`/labs/${courseID}`);
	    return rawLabs.data.data;
    },

    temp() {
      console.log("its been clicked");
    }


    //Setter Methods



    //Adder Methods


    //Delete Methods

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
