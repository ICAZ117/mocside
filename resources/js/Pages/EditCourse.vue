<template>
  <div class="course-dashboard darkBG">
    <!-------------- TOP ROW -------------->
    <div class="top-row">
      <div class="top-left course-details">
        <div class="course-create-form">
          <form @submit.prevent="handleSubmit" class="course-form">
            <div class="form-group">
              <label
                for="Course Name"
                class="course-edit-label"
                style="width: 21% !important"
                >Course Name:</label
              >
              <input
                type="text"
                v-model="courseForm.name"
                id="courseName"
                name="courseName"
                class="profile-field course-edit-field"
                style="width: 79% !important"
              />
            </div>
            <br />

            <div class="form-group">
              <label
                for="Course Description"
                class="course-edit-label"
                style="width: 29% !important"
                >Course Description:</label
              >
              <input
                type="text"
                v-model="courseForm.description"
                id="courseDescription"
                name="courseDescription"
                class="profile-field course-edit-field"
                style="width: 71% !important"
              />
            </div>
            <br />

            <div class="form-group">
              <div class="mb-4">
                <label for="file" class="course-edit-label">Upload Course Image:</label>
                <br />
                <input type="file" :accept="['image/*']" @change="fileChange" id="file" />
              </div>
            </div>

            <div class="form-group">
              <label for="Course Dates" class="course-edit-label">Course Dates:</label>
              <div class="row">
                <div class="col-6">
                  <label for="courseDateStart" style="color: darkgray !important"
                    >Start date:&nbsp;</label
                  >
                  <input
                    type="Date"
                    v-model="courseForm.dateStart"
                    id="courseDateStart"
                    name="courseDateStart"
                    class="profile-field course-edit-field"
                  />
                </div>
                <div class="col-6">
                  <label for="courseDateEnd" style="color: darkgray !important"
                    >End date:&nbsp;</label
                  >
                  <input
                    type="Date"
                    v-model="courseForm.dateEnd"
                    id="courseDateEnd"
                    name="courseDateEnd"
                    class="profile-field course-edit-field"
                  />
                </div>
              </div>
            </div>
            <br />

            <div class="form-group">
              <button type="submit" class="btn btn-success btn-block">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="top-right grades">
        <div class="form-group">
          <button @click="studentView()" class="btn btn-danger btn-block">
            Student View
          </button>
          <label for="Course Roster" class="course-edit-label">Course Roster</label>
          <ul>
            <li v-for="student in students" :key="student.id">
              {{ student.name }} {{ student.fsc_user.fsc_id }} {{ student.email }}
              {{
                Math.floor(
                  (JSON.parse(course.gradebook).grades[student.fsc_user.fsc_id] /
                    course.worth) *
                    100 *
                    100
                ) / 100
              }}%
              <!-- <a @click="removeStudent(student, key)">X</a> -->
            </li>
          </ul>
        </div>
      </div>
    </div>
    <hr style="margin: 0; padding: 0; color: white" />
    <div style="overflow: hidden !important">
      <hr style="margin: 0; padding: 0; color: white; transform: rotate(90deg)" />
    </div>

    <div class="bottom-row">
      <div class="bottom-left key-gen">
        <div class="form-group">
          <ul>
            <li v-for="(k, id) in joinKeys" :key="k">
              {{ k.join_key }}
              <a @click="copyKey(k)">Copy Url</a>
              <a @click="deleteKey(k, id)">Delete Key</a>
            </li>
          </ul>
          <div class="key-options">
            <label class="course-edit-label">Enroll Key</label>
            <input
              placeholder="Random"
              type="text"
              v-model="enrollKey.key"
              class="profile-field course-edit-field"
            />
            <br />
            <label class="course-edit-label">Permanent Key</label>
            <label class="switch">
              <input type="checkbox" v-model="enrollKey.perm" />
              <span class="slider round"></span>
            </label>
            <br />
            <label class="course-edit-label">Expire Date</label>
            <input type="date" :disabled="enrollKey.perm" v-model="enrollKey.datetime" />
            <br />
            <label>Expire Time</label>
            <input type="time" :disabled="enrollKey.perm" v-model="enrollKey.time" />
            <br />
            <label class="course-edit-label">Max Uses</label>
            <input
              placeholder="0 for unlimited use"
              type="text"
              v-model="enrollKey.uses"
              class="profile-field course-edit-field"
            />
          </div>
          <button type="button" @click="generateKey" class="btn btn-danger btn-block">
            Generate Course Enroll Key
          </button>
        </div>
      </div>
      <div class="bottom-right labs">
        <div
          style="
            border: 1px solid #9e9e9e !important;
            padding: 0 !important;
            width: min-content !important;
            margin: 2rem 2rem 2rem 2rem !important;
          "
        >
          <table class="table labtable" style="margin: 0 !important">
            <thead class="labtable">
              <tr>
                <th>Title</th>
                <th># Problems</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(lab, key) in labs" :key="lab.id">
                <tr
                  class="lab pointer"
                  @click.prevent="goToProblems(lab.id, lab.name)"
                  @contextmenu.prevent="showMenu(lab.id)"
                >
                  <td>
                    <a>{{ lab.name }}</a>
                  </td>
                  <td>{{ lab.num_problems }}</td>
                  <td>{{ lab.due_date }}</td>
                </tr>
                <a @click="editLab(lab.id, lab.name)">...</a>
                <a @click="deleting(lab.id, lab, key)">X</a>
              </template>

              <tr v-if="isProf" class="lab pointer" @click="addLab">
                <td colspan="5">Add Lab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <vue-final-modal
      v-model="showDeleteModal"
      classes="modal-container"
      content-class="modal-content"
      :esc-to-close="true"
    >
      <button class="modal-close" @click="closeDeleting()">x</button>
      <div class="delete Course">
        <p>Are you sure you would like to delete {{ deletingLab.lab.name }}</p>
        <button class="btn btn-md btn-danger" @click="closeDeleting()">Cancel</button>
        <button class="btn btn-md btn-danger" @click="removeLab()">Delete</button>
      </div>
    </vue-final-modal>
  </div>
</template>

<script>
import * as API from "../services/API";
import { getError } from "../utils/helpers";
import FileService from "../services/FileService";
import FlashMessage from "../Components/FlashMessage";
import FileUpload from "../Components/FileUpload";
import store from "../Store/index";
export default {
  props: ["courseID"],
  emits: ["unmounting", "courseEdited", "pushToLabs", "studentView", "editLab"],
  components: {
    FlashMessage,
    FileUpload,
  },
  data() {
    return {
      error: null,
      message: null,
      courseForm: {
        name: "",
        description: "",
        img: "",
        dateStart: "",
        dateEnd: "",
        roster: [],
      },
      isSubmitted: false,
      file: null,
      endpoint: "/images/store",
      students: [],
      studentID: "",
      enrollKey: {
        key: "",
        perm: true,
        datetime: "",
        time: "",
        uses: "",
      },
      joinKeys: [],
      keyURL: "",
      labs: [],
      course: {},
      showDeleteModal: false,
      reloadDeleteModal: 0,
      deletingLab: {
        id: "",
        lab: "",
        key: "",
      },
    };
  },
  methods: {
    async initKeys() {
      const res = await API.apiClient.get(`/invite/course/${this.courseID}`);
      console.log(res);
      var myArr = res.data.data;
      for (let i = 0; i < myArr.length; i++) {
        this.joinKeys.push(myArr[i]);
      }
    },
    async generateKey() {
      var payload = {};
      if (this.enrollKey.key == "") {
        this.enrollKey.key = "random";
      }
      payload["join_key"] = this.enrollKey.key;
      payload["course_id"] = this.courseID;
      const res = await API.apiClient.post(`/invite`, payload);
      var keyCode = res.data.data.id;
      payload["join_key"] = res.data.data.join_key;
      if (this.enrollKey.perm) {
        //get end time of course
        payload["expire_date"] = this.courseForm.dateEnd;
      } else {
        //expire date is set to datetime
        payload["expire_date"] = this.enrollKey.datetime + " " + this.enrollKey.time;
      }
      if (this.enrollKey.uses == "") {
        this.enrollKey.uses = 0;
      }
      payload["max_uses"] = this.enrollKey.uses;
      const res2 = await API.apiClient.put(`/invite/${keyCode}`, payload);
      this.joinKeys.push(res2.data.data);
    },
    copyKey(key) {
      this.keyURL = "http://mocside.com:8000/" + key.join_key + "/enroll";
      //copy to clipboard
      var copyText = this.keyURL;
      const textarea = document.createElement("textarea");
      textarea.value = copyText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    },
    async deleteKey(key, id) {
      //call delete api method
      const res = await API.apiClient.delete(`/invite/${key.id}`);
      //filter from front end
      this.joinKeys = this.joinKeys.filter((k, i) => i != id);
    },
    async handleSubmit() {
      this.isSubmitted = true;
      await this.uploadImage();
      var payload = {
        name: this.courseForm.name,
        description: this.courseForm.description,
        img_loc: this.courseForm.img,
        start_date: this.courseForm.dateStart,
        end_date: this.courseForm.dateEnd,
      };
      const res = await API.apiClient.put(`/courses/${this.courseID}`, payload);
      this.$router.push({
		  name: "Courses",
	  });
    },
    updateImage() {
      console.log("updated the image");
    },
    clearMessage() {
      this.error = null;
      this.message = null;
    },
    fileChange(event) {
      this.clearMessage();
      this.file = event.target.files[0];
    },
    async uploadImage() {
      if (this.file != null) {
        const payload = {};
        const formData = new FormData();
        formData.append("file", this.file);
        payload.file = formData;
        payload.endpoint = this.endpoint;
        this.clearMessage();
        try {
          const response = await FileService.uploadFile(payload);
          this.message = "File uploaded.";
          console.log(response.data.asset_link);
          this.courseForm.img = response.data.asset_link;
        } catch (error) {
          this.error = getError(error);
        }
      }
    },
    async removeStudent(student, index) {
      //remove student ID from course's roster list
      for (let i = 0; i < this.courseForm.roster.length; i++) {
        if (this.courseForm.roster[i] == student.fsc_user.fsc_id) {
          this.courseForm.roster.splice(i, 1);
          break;
        }
      }
      const res = await this.updateRoster();
      //remove course ID from student's courses list
      var courses = JSON.parse(student.fsc_user.courses).courses;
      for (let i = 0; i < courses.length; i++) {
        if (courses[i] == this.courseID) {
          courses.splice(i, 1);
          break;
        }
      }
      const res2 = await this.updateStudentCourses(courses);
      //remove student object from list
      this.students = this.students.filter((user, i) => i != index);
    },
    async getStudents() {
      for (let i = 0; i < this.courseForm.roster.length; i++) {
        const res = await API.apiClient.get(`/students/${this.courseForm.roster[i]}`);
        this.students.push(res.data.data);
      }
    },
    async addStudent() {
      try {
        const stud = await this.getStudent();
        this.courseForm.roster.push(this.studentID);
        const res = await this.updateRoster();
        var courses = JSON.parse(stud.data.data.fsc_user.courses).courses;
        courses.push(this.courseID);
        const res2 = await this.updateStudentCourses(courses);
        //at end add to the students list
        this.students.push(stud.data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getStudent() {
      return await API.apiClient.get(`/students/${this.studentID}`);
    },
    async updateRoster() {
      var payload = {
        roster: JSON.stringify({ roster: this.courseForm.roster }),
      };
      return await API.apiClient.put(`/courses/${this.courseID}`, payload);
    },
    async updateStudentCourses(courses) {
      payload = {
        courses: JSON.stringify({ courses: courses }),
      };
      return await API.apiClient.put(
        `/students/${stud.data.data.fsc_user.fsc_id}`,
        payload
      );
    },
    async getLabs() {
      const rawLabs = await API.apiClient.get(`/labs/${this.courseID}`);
      // this.labs = rawLabs.data.data;
      this.labs = rawLabs.data.data;
      await this.sortLabs();
    },
    published(lab) {
      //return true if the lab is published
      //false otherwise
      var now = new Date(Date.now());
      if (lab.publish_date == "" || lab.publish_date == null) {
        return false;
      }
      var pd = lab.publish_date.split("-")[2];
      var pm = lab.publish_date.split("-")[1] - 1;
      var py = lab.publish_date.split("-")[0];

      var published = new Date(py, pm, pd, 0, 0, 0, 0);

      if (published < now) {
        return true;
      }
      return false;
    },
    async sortLabs() {
      //get sort method and call it
      await this.sortByDueDate();
      //call the filter after sorting
      return "";
    },
    async sortByDueDate() {
      //sorts the unfiltered results by start date
      this.labs.sort((a, b) => {
        //if a should be first return -1, 0 for tie, -1 if b first
        let la = a.due_date.split("-");
        let lb = b.due_date.split("-");
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
    goToProblems(id, name) {
      //emit push to labs but on parent just set boolean since it is about to be unmounted
      this.$emit("pushToLabs", [this.courseID, this.course.name, id, name]);
    },
    studentView() {
      this.$emit("studentView", [this.courseID, this.course.name]);
    },
    editLab(id, name) {
      console.log("edit Lab");
      this.$emit("editLab", [this.courseID, this.course.name, id, name]);
    },
    closeDeleting() {
      this.showDeleteModal = false;
    },
    deleting(id, lab, key) {
      // document.getElementById("out-click").style.display = "none";
      this.showDeleteModal = true;
      this.deletingLab.id = id;
      this.deletingLab.lab = lab;
      this.deletingLab.key = key;
    },
    async removeLab() {
      console.log("remove lab");
      var id = this.deletingLab.id;
      var key = this.deletingLab.key;

      //remove from lab the current course
      const res = await API.apiClient.delete(`/labs/${id}`);

      //filter from labs
      this.labs = this.labs.filter((l, i) => i != key);
      this.closeDeleting();
    },
    async addLab() {
      var payload = {
        name: "New Lab",
        description: "New Lab",
        course_id: this.courseID,
        due_date: "2021-06-03",
      };
      const lab = await API.apiClient.post(`/labs`, payload);
      this.labs.push(lab.data.data);
      this.sortLabs();
    },
  },
  async mounted() {
    this.course = await API.apiClient.get(`/courses/full/${this.courseID}`);
    this.courseForm.name = this.course.data.data.name;
    this.courseForm.description = this.course.data.data.description;
    this.courseForm.img = this.course.data.data.img_loc;
    this.courseForm.dateStart = this.course.data.data.start_date;
    this.courseForm.dateEnd = this.course.data.data.end_date;
    this.courseForm.roster = JSON.parse(this.course.data.data.roster).roster;
    this.course = this.course.data.data;
    this.getStudents();
    this.initKeys();
    await this.getLabs();
  },
  beforeUnmount() {
    //editcourse
    this.$emit("unmounting");
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
};
</script>

<style></style>
