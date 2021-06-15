<template>
  <div class="create-assignment">
    <div class="container">
      <button @click="publishToAll()" class="btn btn-primary btn-md publish-all">PUBLISH TO ALL SELECTED LABS</button>
      <button @click="addToAll()" class="btn btn-primary btn-md publish-all">ADD TO ALL SELECTED LABS</button>
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
                        <input type="checkbox" @click="togglePublish(course)" v-model="course.isPublished" />
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
                    <select id="lab-select" @change="switchedLab(course)" v-model="course.currentLab">
                      <option value="" selected hidden disabled>Select a lab...</option>
                      <option v-for="lab in labs[index]" :key="lab.id" :value="lab">
                        {{ lab.name }}
                      </option>
                    </select>
                  </small>

                  <br /><br />

                  <label for="dueDate">Due Date: </label>
                  <input type="date" id="dueDate" @change="updateDate(course)" v-model="course.DDate" />
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
      problem: {},
      copies: [],
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
        this.courses[i].DDate = "",
        this.courses[i].isAdded = false;
        this.courses[i].isPublished = false;
        this.courses[i].currentLab = {};
      }

    },
    async getLabs(courseID) {
      const rawLabs = await API.apiClient.get(`/labs/${courseID}`);
	    return rawLabs.data.data;
    },


    //Setter Methods
    async updateDate(course) {
      var lab = course.currentLab;
      if(lab != undefined && (JSON.stringify(lab) != JSON.stringify({}))) {
        var tempID = "";
        for(let i = 0; i < this.copies.length; i++) {
          if(this.copies[i].lab_id == lab.id) {
            tempID = this.copies[i].id;
            break;
          }
        }
        var payload = {
          "due_date": course.DDate,
        }
        const res = await API.apiClient.put(`/problems/unique/${tempID}`, payload);
      }
      else {
        console.log("can't change date to undefined lab");
        course.DDate = "";
      }
    },


    //Functional Methods
    switchedLab(course) {
      var ind;
      //isAdded needs to be set
      course.isAdded = false;
      for(let i = 0; i < this.copies.length; i++) {
        if(this.copies[i].lab_id == course.currentLab.id) {
          course.isAdded = true;
          ind = i;
          break;
        }
      }

      if(ind != undefined) {
        //ispublished needs to be set
        course.isPublished = this.copies[ind].isPublished;

        //due date needs to be set
        course.DDate = this.copies[ind].due_date.split(" ")[0];
      }
      else {
        course.isPublished = false;
        course.DDate = "";
      }
    },



    //Adder Methods
    toggleToCourse(course) {
      var lab = course.currentLab;
      if(lab != undefined && (JSON.stringify(lab) != JSON.stringify({}))) {

        if(!course.isAdded) {
          //add to course/lab
          this.addToCourse(lab);
        }
        else {
          //delete from course/lab
          this.deleteFromCourse(course, lab);
        }

      }
      else {
        console.log("can't add/delete to undefined lab");
        course.isAdded = false;
      }
    },
    async addToCourse(lab) {
      //create a copy with a lab id of lab.id, and a copy id of problemID and post to database
      var payload = {
        "lab_id": lab.id,
      }
      const res = await API.apiClient.post(`/problems/copies/${this.problemID}`, payload);

      //reset copies list
      const co = await API.apiClient.get(`/problems/copies/${this.problemID}`);
      this.copies = co.data.data;

      return res;
    },
    async deleteFromCourse(course, lab) {
      //get assignment id of the one i want to remove
      var tempID = "";
      for(let i = 0; i < this.copies.length; i++) {
        if(this.copies[i].lab_id == lab.id) {
          tempID = this.copies[i].id;
          break;
        }
      }
      //delete from database
      const res = await API.apiClient.delete(`/problems/${tempID}`);
      console.log(res.data.message);

      //reset copies list
      const co = await API.apiClient.get(`/problems/copies/${this.problemID}`);
      this.copies = co.data.data;

      //change isPublished just in case on front end
      course.isPublished = false;

      //remove date showing on front end
      course.DDate = "";
    },
    togglePublish(course) {
      var lab = course.currentLab;
      if(lab != undefined && (JSON.stringify(lab) != JSON.stringify({}))) {

        if(!course.isPublished) {
          //add to course/lab
          this.addPublish(course, lab);
        }
        else {
          //delete from course/lab
          this.deletePublish(course, lab);
        }

      }
      else {
        console.log("can't publish/unpublish to undefined lab");
        course.isPublished = false;
      }
    },
    async addPublish(course, lab) {
      //call addToCourse(lab) if necessary
      var flag = true;
      var tempID;
      for(let i = 0; i < this.copies.length; i++) {
        if(this.copies[i].lab_id == lab.id) {
          flag = false;
          tempID = this.copies[i].id;
          break;
        }
      }

      if(flag) {
        const res = await this.addToCourse(lab);
        tempID = res.data.data.id;
      }


      //then change boolean on front and back end
      course.isAdded = true;
      var payload = {
        "is_published": true,
      }
      const res = await API.apiClient.put(`/problems/unique/${tempID}`, payload);

    },
    async deletePublish(course, lab) {
      //change boolean
      var tempID = "";
      for(let i = 0; i < this.copies.length; i++) {
        if(this.copies[i].lab_id == lab.id) {
          tempID = this.copies[i].id;
          break;
        }
      }
      var payload = {
        "is_published": false,
      }
      const res = await API.apiClient.put(`/problems/unique/${tempID}`, payload);

    },

    addToAll() {
      for(let i = 0; i < this.courses.length; i++) {
        if(this.courses[i].currentLab != undefined && (JSON.stringify(this.courses[i].currentLab) != JSON.stringify({}))) {
          if(!this.courses[i].isAdded) {
            //add to course/lab
            this.addToCourse(this.courses[i].currentLab);
            this.courses[i].isAdded = true;
          }
        }
        else {
          console.log("No Selected Lab for this course");
        }
      }

    },

    publishToAll() {
      for(let i = 0; i < this.courses.length; i++) {
        if(this.courses[i].currentLab != undefined && (JSON.stringify(this.courses[i].currentLab) != JSON.stringify({}))) {
          if(!this.courses[i].isPublished) {
            //add to course/lab
            this.addPublish(this.courses[i], this.courses[i].currentLab);
            this.courses[i].isPublished = true;
          }
        }
        else {
          console.log("No Selected Lab for this course");
        }
      }
    },



  },
  async mounted() {
    this.authUser = store.getters["auth/authUser"];
    const pro = await API.apiClient.get(`/problems/full/${this.problemID}`);
    this.problem = pro.data.data;
    const co = await API.apiClient.get(`/problems/copies/${this.problemID}`);
    this.copies = co.data.data;
    if (this.authUser.fsc_user.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.fsc_user.courses).courses;
    }
    this.getCourses();
  },
};
// when publishing to a lab that does not have the problem it adds and publishes properly, but the front end button "ADD" does not turn on like it should
</script>

<style></style>
