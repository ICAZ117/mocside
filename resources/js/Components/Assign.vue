<template>
  <div class="create-assignment">
    <div class="container">
      <button class="btn btn-primary btn-md publish-all">PUBLISH TO ALL</button>
      <br />

      <div v-for="course in courses" :key="course.id">
        <div class="no-decor">
          <div class="width col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12">
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
                        <input type="checkbox" v-model="publish" />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <br />

                  <!-- <select id="labs">
                      <option value=""></option>
                  </select> -->

                  <label for="dueDate">Due Date: </label>
                  <input type="date" id="dueDate" v-model="dueDate" />
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
  data() {
    return {
      labs: [],
      courses: [],
      authUser: null,
      enrolledCourses: [],
      publish: "",
      dueDate: "",
    };
  },
  methods: {
    async getCourses() {
      this.courses = [];
      var i;
      for (i = 0; i < this.enrolledCourses.length; i++) {
        var cur = this.enrolledCourses[i];
        const course = await API.apiClient.get(`/courses/${cur}`);
        this.courses.push(course.data.data);
        // this.getLabs(this.courses[i].id);
        this.getLabs(2280);
        this.courses[i].labs = this.labs;
        this.courses[i].publish = "";
        console.log(this.courses[i]);
      }
    },
    async getLabs(courseID) {
      const rawLabs = await API.apiClient.get(`/labs/${courseID}`);
      this.labs = rawLabs.data.data;
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
