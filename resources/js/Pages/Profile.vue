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
          <img class="pfp" src="this.user.pfp" alt="Profile" id="pfp"/>
          <button @click="editAvatar()" class="btn btn-danger btn-block">Edit</button>

          <vue-final-modal v-model="showAvatarModal" classes="modal-container" content-class="modal-content" :esc-to-close="true">
            <button class="modal-close" @click="showAvatarModal = false">x</button>
            <img class="pfp" src="this.user.pfp" alt="Profile" id="pfpmodal"/>
            <div class="picture">
              <label for="file" class="sr-only">Upload New Avatar</label>
              <input type="file" :accept="['image/*']" @change="fileChange" id="file"/>
              <button @click="updateImage()" class="btn btn-danger btn-block">Change Avatar</button>
            </div>
            <div class="row">
              <button @click="closeAvatarModal" class="col-4 btn btn-lg btn-secondary mx-1">Cancel</button>
              <button @click="changeAvatar" class="col-4 btn btn-lg btn-success mx-1" >Submit Changes</button>
            </div>
          </vue-final-modal>

          <div class="editable">
            <label for="Name">Name</label>
            <input type="text" v-model="user.name" id=Name>
            <label for="ScreenName">ScreenName</label>
            <input type="text" v-model="user.screen_name" id="ScreenName">
            <label for="FSCID">FSC ID</label>
            <input type="number" v-model="user.fsc_id" id="FSCID" disabled>
            <label for="pronouns">Preferred Pronouns</label>
            <input type="text" name="pronouns" id="pronouns" v-model="user.pronouns">
          </div>
        </div>
        <div clas="Editor-Settings">
          <!-- theme, language, console theme -->
          <label for="Theme">Select A Default Theme</label>
          <select name="Theme" id="Theme" v-model="user.settings.ideOptions.theme">
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
          <select name="Language" id="Language" v-model="user.settings.ideOptions.defaultLang">
            <option value="python">Python</option>
            <option value="Java">Java</option>
          </select>
          <label for="ConsoleForeground">Select A Console Foreground Color</label>
          <input type="color" name="ConsoleForeground" id="ConsoleForeground" v-model="user.settings.consoleOptions.foreground">
          <label for="ConsoleBackground">Select A Console Background Color</label>
          <input type="color" name="ConsoleBackground" id="ConsoleBackground" v-model="user.settings.consoleOptions.background">
        </div>
        <button @click="saveProfile" class="btn btn-danger btn-block">Save</button>


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
        <input type="text" v-model="user.username" id="Username">

        <button @click="editEmail()" class="btn btn-danger btn-block">Change Email</button>
        <vue-final-modal v-model="showEmailModal" classes="modal-container" content-class="modal-content" :esc-to-close="true">
          <button class="modal-close" @click="showEmailModal = false">x</button>
          <div class="change-Email">
            <label for="Verify">Verification Code</label>
            <input type="text" id="Verify">
            <label for="Email">Email</label>
            <input type="email" id="Email" v-model="user.email">
            <button @click="updateEmail()" class="btn btn-danger btn-block">Save</button>
          </div>
        </vue-final-modal>

        <button @click="editPass()" class="btn btn-danger btn-block">Change Password</button>
        <vue-final-modal v-model="showPassModal" classes="modal-container" content-class="modal-content" :esc-to-close="true">
          <button class="modal-close" @click="showPassModal = false">x</button>
          <div class="change-Pass">
            <label for="CurrentPass">Current Password</label>
            <input type="password" id="CurrentPass">
            <label for="NewPass">New Password</label>
            <input type="password" id="NewPass" v-model="password.new">
            <label for="ConfirmPass">Confirm Password</label>
            <input type="password" id="ConfirmPass" v-model="password.confirm" :class="{'is-invalid': passNoMatch,}">
            <div v-if="passNoMatch" class="invalid-feedback">
              <span>Your passwords don't match!</span>
            </div>
            <button @click="updatePass()" class="btn btn-danger btn-block">Save</button>
          </div>
        </vue-final-modal>

        <button @click="saveProfile" class="btn btn-danger btn-block">Save</button>
        <button @click="upgradeUser" v-if="showUpgrade" class="btn btn-danger btn-block">Upgrade User</button>
        <button @click="downgradeUser" v-if="showUpgrade" class="btn btn-danger btn-block">DownGrade User</button>
        <button @click="deleteAccount" class="btn btn-danger btn-block">Delete My Account</button>
      </tab-panel>
  </tab-panels>
</template>

<script>
import * as API from "../services/API";
import AuthService from "../services/AuthService";
import store from "../Store/index";
import { useRoute } from "vue-router";
import FileService from "../services/FileService";
import FileUpload from "../Components/FileUpload";
import { defineComponent, reactive, toRefs, computed } from "vue";

const tabs = ["Profile", "Grades", "Security"];
export default {
  components: {
    FileUpload,
  },
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
        settings: {
          consoleOptions: {
            foreground: "",
            background: "",
          },
          ideOptions: {
            theme: "",
            defaultLang: "",
          },
        },
        pronouns: "",
      },
      password: {
        current: "",
        new: "",
        confirm: "",
      },
      temppfp: "",
      showEmailChange: false,
      showPassChange: false,
      showUpgrade: false,
      showAvatarModal: false,
      reloadAvatarModal: 0,
      showEmailModal: false,
      reloadEmailModal: 0,
      showPassModal: false,
      reloadPassModal: 0,
      passNoMatch: false,
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
    async updatePass() {
      if(this.password.new != this.password.confirm) {
        console.log("These passwords do not match");
        this.passNoMatch = true;
      }
      else {
        // this.showPassChange = false;
        this.passNoMatch = false;
        this.showPassModal = false;
        console.log("updatedPassword");
        //try fortify route and pass current and new password....i believe it checks for us and returns an error/status code
        var payload = {
          current_password: this.password.current,
          password: this.password.new,
        }
        const res = await AuthService.authClient.put(`user/password`, payload);
      }
    },
    async updateEmail() {
      // this.showEmailChange = false;
      this.showEmailModal = false;
      console.log("updateEmail");
      var payload = {
        email: this.user.email,
      };
      // const res = await API.apiClient.put();
    },
    closeAvatarModal() {
      this.showAvatarModal = false;
    },
    closeEmailModal() {
      this.showEmailModal = false;
    },
    closePassModal() {
      this.passNoMatch = false;
      this.showPassModal = false;
    },
    getUser() {
      this.user.name = this.authUser.name;
      this.user.email = this.authUser.email;
      this.user.screen_name = this.authUser.fsc_user.screen_name;
      this.user.username = this.authUser.username;
      this.user.fsc_id = this.authUser.fsc_user.fsc_id;

      this.user.pronouns = this.authUser.fsc_user.pronouns;
      this.user.settings = this.authUser.settings;

      this.user.pfp = this.authUser.pfp_path;
      if(this.user.pfp == undefined || this.user.pfp == null) {
        this.user.pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
      }
      document.getElementById("pfp").src = this.user.pfp;
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
        payload.endpoint = "/images/store";
        this.clearMessage();
        try {
          const response = await FileService.uploadFile(payload);
          this.message = "File uploaded.";
          console.log(response.data.asset_link);
          this.temppfp = response.data.asset_link;
        } catch (error) {
          this.error = getError(error);
        }
      }
    },
    async saveProfile() {
      //route works...jsut can't updated all parts of profile yet

      console.log("saving profile");
      var payload = {
        name: this.user.name,
        username: this.user.username,
        screen_name: this.user.screen_name,
        pfp_path: this.user.pfp,
        settings: this.user.settings,
        pronouns: this.user.pronouns,
      }

      //call route
      const res = await API.apiClient.put(`/profile/full/${this.authUser.fsc_user.fsc_id}`, payload);
    },
    async updateImage() {
      await this.uploadImage();
      document.getElementById("pfpmodal").src = this.temppfp;
      console.log("showing the new avatar look on screen but not saving changes yet");
    },
    async changeAvatar() {
      console.log("changing the avatar picture in backend");

      //api call to backend to update pfp path
      var payload = {
        pfp_path: this.temppfp,
      }
      const res = await API.apiClient.put(`/profile/pfp`, payload);

      //change other frontend pfp
      this.user.pfp = this.temppfp;
      document.getElementById("pfp").src = this.user.pfp;

      //after changing in backend
      this.showAvatarModal = false;
    },
    editAvatar() {
      document.getElementById("pfpmodal").src = this.user.pfp;
      this.showAvatarModal = true;
    },
    editEmail() {
      this.showEmailModal = true;
    },
    editPass() {
      this.showPassModal = true;
    },
    upgradeUser() {
      console.log("downgrade user");
    },
    downgradeUser() {
      console.log("upgrade user");
    },
    deleteAccount() {
      console.log("delete account");
    },
    getGrades() {
      for(let i = 0; i < this.enrolledCourses.length; i++) {
        if(this.student.gradebook_courses == "null" || this.student.gradebook_courses == null) {
          this.letters.push("--");
          continue;
        }
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
  watch: {
    showAvatarModal: function () {
      if (!this.showAvatarModal) {
        this.reloadAvatarModal++;
      }
    },
    showEmailModal: function() {
      if(!this.showEmailModal) {
        this.reloadEmailModal++;
      }
    },
    showPassModal: function() {
      if(!this.showPassModal) {
        this.reloadPassModal++;
      }
    }
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
    if(this.authUser.settings == null) {
      const res = await API.apiClient.post(`/profile/init`);
    }
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
    if(this.isProf) {
      this.showUpgrade = true; //change this later to check for admin instead of professor
    }
  },
};

</script>

<style>

</style>
<!-- https://myaccount.microsoft.com/ for the stlying -->