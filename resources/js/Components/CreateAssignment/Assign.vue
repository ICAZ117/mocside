<template>
  <div class="create-assignment">
    <div class="container">
      <button @click="publishToAll()" class="btn btn-primary btn-md publish-all">
        PUBLISH TO ALL SELECTED LABS
      </button>
      <button @click="addToAll()" class="btn btn-primary btn-md publish-all">
        ADD TO ALL SELECTED LABS
      </button>
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
                        <input
                          type="checkbox"
                          @click="togglePublish(course)"
                          v-model="course.isPublished"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-4">Add:</div>
                    <div class="col-8">
                      <label class="switch">
                        <input
                          type="checkbox"
                          @click="toggleAdd(course)"
                          v-model="course.isAdded"
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>

                  <br />

                  <label for="lab-select">Lab:</label>
                  <br />
                  <small>
                    <select
                      id="lab-select"
                      @change="switchedLab(course)"
                      v-model="course.currentLab"
                    >
                      <option value="" selected hidden disabled>Select a lab...</option>
                      <option v-for="lab in labs[index]" :key="lab.id" :value="lab">
                        {{ lab.name }}
                      </option>
                    </select>
                  </small>

                  <br /><br />

                  <label for="dueDate">Due Date: </label>
                  <input
                    type="date"
                    id="dueDate"
                    @change="updateDate(course)"
                    v-model="course.DDate"
                  />
                  <br />
                  <label for="dueTime">Time Due: </label>
                  <input
                    type="time"
                    id="timeDate"
                    @change="updateDate(course)"
                    v-model="course.TDate"
                  />
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
import * as API from "../../services/API";
import store from "../../Store/index";

export default {
  emits: ["delete"],
  props: ["problemID"],
  data() {
    return {
      problem: {},
      copies: [],
      courseIDs: [],
      courses: [],
      labs: [], //list of lists
    }
  },
  methods: {
    //SETUP
    //get problem
    async fetchProblem() {
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.problem = res.data.data;
    },
    //get list of problem copies
    async fetchCopies() {
      const res = await API.apiClient.get(`/problems/copies/${this.problemID}`);
      this.copies = res.data.data;
    },
    //get list of courses
    async fetchCourses() {
      if(this.authUser.fsc_user.courses) {
        this.courseIDs = JSON.parse(this.authUser.fsc_user.courses).courses; 
      }

      this.courseIDs.forEach(async (courseID) => {
        const res = await API.apiClient.get(`/courses/${courseID}`);
        this.courses.push(res.data.data);
        this.setEmptyCourseCardValues(res.data.data);
        const labs = await this.fetchLabs(res.data.data.id);
        this.labs.push(labs);

      });

    },
    //get lab of course
    async fetchLabs(courseID) {
      const res = await API.apiClient.get(`/labs/${courseID}`);
      return res.data.data;
    },
    //set initial values on each card to empty
    setEmptyCourseCardValues(course) {
      course.DDate = "";
      course.TDate = "";
      course.isAdded = false;
      course.isPublished = false;
      course.currentLab = {};
    },



    //Publish and Add to all
    publishToAll() {
      this.courses.forEach((course) => {
        if(course.currentLab != undefined && JSON.stringify(course.currentLab) != JSON.stringify({})) {
          if(!course.isPublished) {
            //add to course/lab
            course.isPublished = true;
            this.addPublish(course, course.currentLab);
          }
        }
      });
    },
    addToAll() {
      this.course.forEach((course) => {
        if(course.currentLab != undefined && JSON.stringify(course.currentLab) != JSON.stringify({})) {
          if(!course.isAdded) {
            //add to course/lab
            this.addToCourse(course.currentLab);
            course.isAdded = true;
          }
        }
      })
    },


    //publish to individual course
    togglePublish(course) {
      var lab = course.currentLab;
      if(lab != undefined && JSON.stringify(lab) != JSON.stringify({})) {
        !course.isPublished ? this.addPublish(course, lab) : this.deletePublish(course, lab);
      } else {
        //can't publish to undefined lab, reset button
        course.isPublished = false;
      }
    },
    async addPublish(course, lab) {
      var flag = true;
      var tempID;

      for (let i = 0; i < this.copies.length; i++) {
        if (this.copies[i].lab_id == lab.id) {
          flag = false;
          tempID = this.copies[i].id;
          break;
        }
      }

      if(flag) {
        const res = await this.addToCourse(lab);
        tempID = res.data.data.id;
      }

      //change published boolean on front and back end
      course.isAdded = true;
      var payload = {
        published: true,
      };
      const res = await API.apiClient.put(`/problems/unique/${tempID}`, payload);

    },
    async deletePublish(course, lab) {
      var tempID = "";
      for (let i = 0; i < this.copies.length; i++) {
        if (this.copies[i].lab_id == lab.id) {
          tempID = this.copies[i].id;
          break;
        }
      }

      if(tempID == undefined || tempID == "") {
        return;
      }

      var payload = {
        published: false,
      };
      const res = await API.apiClient.put(`/problems/unique/${tempID}`, payload);
    },

    //add/delete to individual course
    async toggleAdd(course) {
      var lab = course.currentLab;
      if(lab != undefined && JSON.stringify(lab) != JSON.stringify({})) {
        if(!course.isAdded) {
          //add to course/lab
          this.addToCourse(lab);
        } else {
          //delete from course/lab
          //check if any copies
          if(this.copies.length > 1) {
            this.deleteFromCourse(course, lab);
          } else {
            //give message to show we are deleting the last copy of this problem
            var flag = confirm("This is the last copy of this assignment, are you sure you want to delete it forever?");

            if(flag) {
              //if decided to delete, delete and return to problems page
              this.$emit("delete");
            } else {
              //not deleted reset button
              //wait 1/100th of a second to reset button
              await this.sleep(10);
              course.isAdded = true;
            }
          }

        }
      } else {
        //can't add/delete to undefined lab, reset button
        course.isAdded = false;
      }
    },
    async addToCourse(lab) {
      //create a copy with a lab id of lab.id, and a copy id of problemID
      var payload = {
        lab_id: lab.id,
      };
      const res = await API.apiClient.post(`/problems/copies/${this.problemID}`, payload);

      //reset copies list
      this.fetchCopies();

      return res;
    },
    async deleteFromCourse(course, lab) {
      //get assignment id of the problem to remove
      var tempID = null;
      for (let i = 0; i < this.copies.length; i++) {
        if (this.copies[i].lab_id == lab.id) {
          tempID = this.copies[i].id;
          break;
        }
      }

      if(tempID == null) {
        return;
      }

      //delete from database
      const res = await API.apiClient.delete(`/problems/${tempID}`);

      //reset copies list
      this.fetchCopies();

      course.isPublished = false;

      //remove date showing on front end
      course.DDate = "";
      course.TDate = "";


    },


    //switch current lab of course on front end
    switchedLab(course) {
      var ind;
      //isAdded needs to be set
      course.isAdded = false;
      for (let i = 0; i < this.copies.length; i++) {
        if (this.copies[i].lab_id == course.currentLab.id) {
          course.isAdded = true;
          ind = i;
          break;
        }
      }

      if(ind != undefined) {
        //isPublished needs to be set
        course.isPublished = this.copies[ind].published;
        //due date needs to be set
        course.DDate = this.copies[ind].due_date.split(" ")[0];
        course.TDate = this.copies[ind].due_date.split(" ")[1];
      } else {
        course.isPublished = false;
        course.DDate = "";
        course.TDate = "";
      }
    },



    //helper methods
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    //update date
    async updateDate(course) {
      var lab = course.currentLab;
      if(lab != undefined && JSON.stringify(lab) != JSON.stringify({})) {
        var tempID;
        for (let i = 0; i < this.copies.length; i++) {
          if (this.copies[i].lab_id == lab.id) {
            tempID = this.copies[i].id;
            break;
          }
        }
        
        if(tempID == undefined || tempID == "") {
          return;
        }

        //combine dueDate and dueTime and send to database

        var dateList = course.DDate.split("-");
        let year = Number(dateList[0]);
        let month = Number(dateList[1])-1;
        let day = Number(dateList[2]);

        var timeList = course.TDate.split(":");
        let hour = Number(timeList[0]);
        let minute = Number(timeList[1]) + new Date().getTimezoneOffset();

        var payload = {
          due_date: course.DDate + " " + course.TDate,
          due_date_utc: Date.UTC(year, month, day, hour, minute, 0, 0),
        };
        const res = await API.apiClient.put(`/problems/unique/${tempID}`, payload);

      } else {
        //can't change date of undefined lab
        course.DDate = "";
        course.TDate = "";
      }
    }


  },
  computed: {
    authUser: function() {
      return store.getters["auth/authUser"];
    },
  },
  mounted() {
    this.fetchProblem();
    this.fetchCopies();
    this.fetchCourses();
  },
}
</script>

<style>

</style>