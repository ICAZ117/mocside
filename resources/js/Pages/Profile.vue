<template>
  <div class="courses header">
    <div class="heading">
      <tabs v-model="selectedTab">
        <tab
          class="tab"
          v-for="(tab, i) in tabs"
          :key="`t${i}`"
          :val="tab"
          :label="tab"
          :indicator="true"
        />
      </tabs>
    </div>
  </div>
  <tab-panels v-model="selectedTab" :animate="true">
      <tab-panel :val="'Profile'">
        <div class="profile-section">
          <div class="picture">
            <button class="btn btn-danger btn-block">Change Avatar</button>
          </div>
          <div class="editable">
            <label for="Name">Name</label>
            <input type="text" v-model="user.name" id=Name>
            <label for="ScreenName">ScreenName</label>
            <input type="text" v-model="user.screen_name" id="ScreenName">
            <label for="FSCID">FSC ID</label>
            <input type="number" v-model="user.fsc_id" id="FSCID" disabled>
          </div>
        </div>
        <div clas="Editor-Settings">
          <!-- theme, language, console theme -->
          <label for="Theme">Select A Default Theme</label>
          <select name="Theme" id="Theme">
            <optgroup label="Dark">
              <option value="ambiance">Ambiance</option>
              <option value="chaos">Chaos</option>
              <option value="clouds_midnight">Clouds Midnight</option>
              <option value="dracula">Dracula</option>
              <option value="cobalt">Cobalt</option>
              <option value="gruvbox">Gruvbox</option>
              <option value="gob" selected>Green on Black</option>
              <option value="idle_fingers">idle Fingers</option>
              <option value="kr_theme">krTheme</option>
              <option value="merbivore">Merbivore</option>
              <option value="merbivore_soft">Merbivore Soft</option>
              <option value="mono_industrial">Mono Industrial</option>
              <option value="monokai">Monokai</option>
              <option value="nord_dark">Nord Dark</option>
              <option value="pastel_on_dark">Pastel on dark</option>
              <option value="solarized_dark">Solarized Dark</option>
              <option value="terminal">Terminal</option>
              <option value="tomorrow_night">Tomorrow Night</option>
              <option value="tomorrow_night_blue">Tomorrow Night Blue</option>
              <option value="tomorrow_night_bright">Tomorrow Night Bright</option>
              <option value="tomorrow_night_eighties">Tomorrow Night 80s</option>
              <option value="twilight">Twilight</option>
              <option value="vibrant_ink">Vibrant Ink</option>
            </optgroup>
            <optgroup label="Light">
              <option value="chrome">Chrome</option>
              <option value="clouds">Clouds</option>
              <option value="crimson_editor">Crimson Editor</option>
              <option value="dawn">Dawn</option>
              <option value="dreamweaver">Dreamweaver</option>
              <option value="eclipse">Eclipse</option>
              <option value="github">GitHub</option>
              <option value="iplastic">IPlastic</option>
              <option value="solarized_light">Solarized Light</option>
              <option value="textmate">TextMate</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="xcode">Xcode</option>
              <option value="kuroir">Kuroir</option>
              <option value="katzenmilch">KatzenMilch</option>
              <option value="sqlserver">SQL Server</option>
            </optgroup>
          </select>
          <label for="Language">Select A Default Language</label>
          <select name="Language" id="Language">
            <option value="python">Python</option>
            <option value="Java">Java</option>
          </select>
          <label for="ConsoleTheme">Select A Defautl Console Theme</label>
          <select name="ConsoleTheme" id="ConsoleTheme">
            <option value="Default">Default</option>
            <option value="Greeen">Green</option>
            <option value="White">White</option>
            <option value="Red">Red</option>
          </select>
        </div>
        <button class="btn btn-danger btn-block">Save</button>


      </tab-panel>
      <tab-panel :val="'Grades'">
        <div
          style="
            border: 1px solid #9e9e9e !important;
            padding: 0 !important;
            width: min-content !important;
            margin: 2rem 2rem 2rem 2rem !important;
          "
        >
          <table class="table problemtable" style="margin: 0 !important">
            <thead class="problemtable" style="border: none !important">
              <tr>
                <th>Course</th>
                <th>Letter Grade</th>
                <th>Grade Percentage</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop over all LABS -->
              <template v-for="(course, index) in courses" :key="index">
                <!-- Regular table row -->
                <tr class="problem pointer" >
                  <td>{{ course.name }}</td>
                  <td>{{ letters[index] == undefined ? "--" : letters[index] }}</td>
                  <td>{{ grades[index] == undefined ? "--" : grades[index]+ "%" }}</td>
                  <td>{{ course.start_date }}</td>
                  <td>{{ course.end_date }}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </tab-panel>
      <tab-panel :val="'Security'">
        <label for="Username">Username</label>
        <input type="text" v-model="user.name" id="Username">
        <button class="btn btn-danger btn-block">Change Email</button>
        <div class="change-Email">
          <label for="Verify">Verification Code</label>
          <input type="text" id="Verify">
          <label for="Email">New Email</label>
          <input type="email" id="Email">
          <button class="btn btn-danger btn-block">Save</button>
        </div>
        <button>Change Password</button>
        <div class="change-Pass">
          <label for="CurrentPass">Current Password</label>
          <input type="password" id="CurrentPass">
          <label for="NewPass">New Password</label>
          <input type="password" id="NewPass">
          <label for="ConfirmPass">Confirm Password</label>
          <input type="password" id="ConfirmPass">
          <button class="btn btn-danger btn-block">Save</button>
        </div>
        <button class="btn btn-danger btn-block">Save</button>
        <button class="btn btn-danger btn-block">Upgrade User</button>
        <button class="btn btn-danger btn-block">DownGrade User</button>
        <button class="btn btn-danger btn-block">Delete My Account</button>
      </tab-panel>
  </tab-panels>
</template>

<script>
import * as API from "../services/API";
import store from "../Store/index";
import { useRoute } from "vue-router";
import { defineComponent, reactive, toRefs, computed } from "vue";

const tabs = ["Profile", "Grades", "Security"];
export default {
  data() {
    return {
      authUser: null,
      fscID: null,
      progress: [],
      username: "",
      student: {},
      grades: [],
      letters: [],
      enrolledCourses: [],
      courses: [],
      user: {
        name: "",
        email: "",
        pfp: "",
        fsc_id: "",
        screen_name: "",
        username: "",
      }
    };
  },
  setup() {
    const route = useRoute();

    const currentDirectory = computed(() => route.path);

    const state = reactive({
      selectedTab: tabs[0],
    });

    return {
      currentDirectory,
      tabs,
      ...toRefs(state),
    };
  },
  methods: {
    getUser() {
      this.user.name = this.authUser.name;
      this.user.email = this.authUser.email;
      this.user.screen_name = this.authUser.fsc_user.screen_name;
      this.user.username = this.authUser.username;
      this.user.fsc_id = this.authUser.fsc_user.id;
      this.user.pfp = "";
    },
    getGrades() {
      for(let i = 0; i < this.enrolledCourses.length; i++) {
        var val = JSON.parse(this.student.gradebook_courses).grades[this.enrolledCourses[i]];
        this.grades.push(val);
        if(val >= 90) {
          this.letters.push("A");
        }
        else if (val >= 80) {
          this.letters.push("B");
        }
        else if (val >= 70) {
          this.letters.push("C");
        }
        else if (val >= 60) {
          this.letters.push("D");
        }
        else if (val == undefined) {
          this.letters.push("--");
        }
        else {
          this.letters.push("F");
        }
      }
    },
    async getStudent() {
      this.authUser = store.getters["auth/authUser"];
      this.fscID = this.authUser.fsc_user.fsc_id;
      if (!this.isProf) {
        const res = await API.apiClient.get(`/progress/${this.fscID}`);
        this.progress = res.data.data;
        return this.progress;
      }
      return {};
    },
    async getStudentObject() {
      const res = await API.apiClient.get(`/students/${this.authUser.fsc_user.fsc_id}`);
      this.student = res.data;
    },
    async getCourses() {
      this.courses = [];
      for (let i = 0; i < this.enrolledCourses.length; i++) {
        var cur = this.enrolledCourses[i];
        const course = await API.apiClient.get(`/courses/${cur}`);
        this.courses.push(course.data.data);
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
  async beforeMount() {
    this.authUser = await store.getters["auth/authUser"];
    this.username = this.authUser.username;
    if (this.authUser.fsc_user.courses) {
      this.enrolledCourses = JSON.parse(this.authUser.fsc_user.courses).courses;
    }
    await this.getCourses();
    if (!this.isProf) {
      await this.getStudentObject();
      await this.getGrades();
    }
    await this.getUser();
  },
};

</script>

<style>

</style>
<!-- https://myaccount.microsoft.com/ for the stlying -->