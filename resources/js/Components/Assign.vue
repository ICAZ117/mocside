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
        console.log(course);
        this.courses.push(course.data.data);
      }
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
