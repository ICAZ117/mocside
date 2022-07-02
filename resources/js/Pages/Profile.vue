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
    <tab-panel :val="'Profile'" class="profile darkBG">
      <vue-final-modal
        v-model="showUnsavedChangesModal"
        classes="modal-container"
        content-class="modal-content"
        :esc-to-close="true"
      >
        <p style="margin: auto !important">
          You have unsaved changes! Are you sure you want to continue?
        </p>
        <br />
        <div class="row">
          <button @click="leavePage = 'yes'" class="col-4 btn btn-lg btn-danger mx-1">
            Leave page
          </button>
          <button @click="leavePage = 'no'" class="col-4 btn btn-lg btn-danger mx-1">
            Cancel
          </button>
        </div>
      </vue-final-modal>
      <div class="row h-100">
        <div class="col-3" style="border-right: 1px var(--FSCgrey) solid !important">
          <div class="profile-picture">
            <img class="large-pfp" src="this.user.pfp" alt="Profile" id="pfp" />
            <br />
            <button
              @click="editAvatar()"
              class="btn btn-danger btn-block"
              style="width: 252px; margin-top: 20px"
            >
              Edit
            </button>
          </div>
        </div>
        <div
          class="col-9 settings"
          style="padding: 50px !important; height: 100%; color: #888"
        >
          <div class="profile-section">
            <div class="editable">
              <h3>Profile Options</h3>
              <div class="row">
                <div class="col-6">
                  <label for="Name">Name: </label>
                  <input
                    class="profile-field"
                    type="text"
                    v-model="user.name"
                    id="Name"
                  />

                  <br /><br />

                  <label for="pronouns">Preferred Pronouns: </label>
                  <input
                    class="profile-field"
                    type="text"
                    name="pronouns"
                    id="pronouns"
                    v-model="user.pronouns"
                  />
                </div>
                <div class="col-6">
                  <label for="ScreenName">ScreenName: </label>
                  <input
                    class="profile-field"
                    type="text"
                    v-model="user.screen_name"
                    id="ScreenName"
                  />

                  <br /><br />

                  <label for="FSCID">FSC ID: </label>
                  <input
                    class="profile-field"
                    type="number"
                    v-model="user.fsc_id"
                    id="FSCID"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <br />
          <br />
          <hr />
          <br />
          <br />

          <div class="Editor-Settings">
            <h3>Console Options</h3>
            <div class="row">
              <div class="col-6">
                <!-- theme, language, console theme -->
                <label for="Theme">Default Theme: </label>
                <select
                  class="profile-select"
                  name="Theme"
                  id="Theme"
                  v-model="user.settings.ideOptions.theme"
                >
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

                <br /><br />

                <label for="ConsoleForeground">Console Foreground Color: </label>
                <input
                  class="profile-field"
                  type="color"
                  name="ConsoleForeground"
                  id="ConsoleForeground"
                  v-model="user.settings.consoleOptions.foreground"
                />
              </div>
              <div class="col-6">
                <label for="Language">Default Language: </label>
                <select
                  class="profile-select"
                  name="Language"
                  id="Language"
                  v-model="user.settings.ideOptions.defaultLang"
                >
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                </select>

                <br /><br />

                <label for="ConsoleBackground">Console Background Color: </label>
                <input
                  class="profile-field"
                  type="color"
                  name="ConsoleBackground"
                  id="ConsoleBackground"
                  v-model="user.settings.consoleOptions.background"
                />
              </div>
            </div>
          </div>
          <br /><br />
          <div class="sampleIDE">
            <div class="row">
              <div class="col-6">
                <VAceEditor
                  :theme="user.settings.ideOptions.theme"
                  v-model:value="content"
                  :lang="user.settings.ideOptions.defaultLang"
                  style="width: 100%; height: 200px"
                  :key="user.settings.ideOptions.defaultLang"
                />
              </div>

              <div class="col-6">
                <textarea
                  class="sampleConsole"
                  contenteditable="true"
                  spellcheck="false"
                  :style="
                    'background-color: ' +
                    user.settings.consoleOptions.background +
                    '; color: ' +
                    user.settings.consoleOptions.foreground +
                    ';'
                  "
                  >{{ user.username }}@mocside.com:/usr/src$ </textarea
                >
              </div>
            </div>
          </div>
          <br />
          <button @click="saveProfile" class="btn btn-danger btn-md btn-block">
            Save
          </button>
        </div>
      </div>

      <vue-final-modal
        v-model="showAvatarModal"
        classes="modal-container"
        content-class="modal-content"
        :esc-to-close="true"
      >
        <button class="modal-close" @click="showAvatarModal = false">x</button>
        <img class="large-pfp" src="this.user.pfp" alt="Profile" id="pfpmodal" />
        <div class="picture">
          <label for="file" class="sr-only">Upload New Avatar</label>
          <input type="file" :accept="['image/*']" @change="fileChange" id="file" />
          <button @click="updateImage()" class="btn btn-danger btn-block">
            Change Avatar
          </button>
        </div>
        <div class="row">
          <button @click="closeAvatarModal" class="col-4 btn btn-lg btn-secondary mx-1">
            Cancel
          </button>
          <button @click="changeAvatar" class="col-4 btn btn-lg btn-success mx-1">
            Submit Changes
          </button>
        </div>
      </vue-final-modal>
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
              <th width="41.6%">Course</th>
              <th width="14.0%">Letter Grade</th>
              <th width="19.5%">Grade Percentage</th>
              <th width="12.2%">Start Date</th>
              <th width="12.7%">End Date</th>
            </tr>
          </thead>
          <tbody>
            <!-- Loop over all LABS -->
            <template v-for="(course, index) in courses" :key="index">
              <!-- Regular table row -->
              <tr class="problem pointer">
                <td width="41.6%">{{ course.name }}</td>
                <td width="14.0%">{{ letters[index] == undefined ? "--" : letters[index] }}</td>
                <td width="19.5%">{{ grades[index] == undefined ? "--" : grades[index] + "%" }}</td>
                <td width="12.2%">{{ course.start_date }}</td>
                <td width="12.7%">{{ course.end_date }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </tab-panel>
    <tab-panel :val="'Security'">
      <label for="Username">Username</label>
      <input type="text" v-model="user.username" id="Username" />

      <button @click="editEmail()" class="btn btn-danger btn-block">Change Email</button>
      <vue-final-modal
        v-model="showEmailModal"
        classes="modal-container"
        content-class="modal-content"
        :esc-to-close="true"
      >
        <button class="modal-close" @click="showEmailModal = false">x</button>
        <div class="change-Email">
          <label for="Verify">Verification Code</label>
          <input type="text" id="Verify" />
          <label for="Email">Email</label>
          <input type="email" id="Email" v-model="user.email" />
          <button @click="updateEmail()" class="btn btn-danger btn-block">Save</button>
        </div>
      </vue-final-modal>

      <button @click="editPass()" class="btn btn-danger btn-block">
        Change Password
      </button>
      <vue-final-modal
        v-model="showPassModal"
        classes="modal-container"
        content-class="modal-content"
        :esc-to-close="true"
      >
        <button class="modal-close" @click="showPassModal = false">x</button>
        <div class="change-Pass">
          <label for="CurrentPass">Current Password</label>
          <input type="password" id="CurrentPass" v-model="password.current" />
          <label for="NewPass">New Password</label>
          <input type="password" id="NewPass" v-model="password.new" />
          <label for="ConfirmPass">Confirm Password</label>
          <input
            type="password"
            id="ConfirmPass"
            v-model="password.confirm"
            :class="{ 'is-invalid': passNoMatch }"
          />
          <div v-if="passNoMatch" class="invalid-feedback">
            <span>Your passwords don't match!</span>
          </div>
          <button @click="updatePass()" class="btn btn-danger btn-block">Save</button>
        </div>
      </vue-final-modal>

      <button @click="saveProfile" class="btn btn-danger btn-block">Save</button>
      <button
        @click="showDeleteUserModal = true"
        v-if="isProf"
        class="btn btn-danger btn-block"
      >
        Delete Account
      </button>
      <vue-final-modal
        v-model="showDeleteUserModal"
        classes="modal-container"
        content-class="modal-content"
        :esc-to-close="true"
      >
        <button class="modal-close" @click="showDeleteUserModal = false">x</button>
        <button class="modal-close" @click="showUpgradeModal = false">x</button>
        <p>
          Are you sure you would like to delete your account? You will no longer be able
          to sign in to your account or access your courses!
        </p>
        <label for="fscID"></label>
        <input type="number" id="fscID" name="fscID" />
        <button @click="showDeleteUserModal = false" class="btn btn-danger btn-block">
          Cancel
        </button>
        <button @click="deleteAccount()" class="btn btn-danger btn-block">
          Yes, delete my account
        </button>
      </vue-final-modal>
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
import { reactive, toRefs, computed } from "vue";
const tabs = ["Profile", "Grades", "Security"];

import { VAceEditor } from "vue3-ace-editor";

//////////////////////////////////////////////////////////////////////
//                            THEMES                                //
//////////////////////////////////////////////////////////////////////
import "ace-builds/src-noconflict/ext-themelist";
import "ace-builds/src-noconflict/theme-ambiance";
import "ace-builds/src-noconflict/theme-chaos";
import "ace-builds/src-noconflict/theme-chrome";
import "ace-builds/src-noconflict/theme-clouds";
import "ace-builds/src-noconflict/theme-clouds_midnight";
import "ace-builds/src-noconflict/theme-cobalt";
import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-dawn";
import "ace-builds/src-noconflict/theme-dracula";
import "ace-builds/src-noconflict/theme-dreamweaver";
import "ace-builds/src-noconflict/theme-eclipse";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-gob";
import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-idle_fingers";
import "ace-builds/src-noconflict/theme-iplastic";
import "ace-builds/src-noconflict/theme-katzenmilch";
import "ace-builds/src-noconflict/theme-kr_theme";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-merbivore";
import "ace-builds/src-noconflict/theme-merbivore_soft";
import "ace-builds/src-noconflict/theme-mono_industrial";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-nord_dark";
import "ace-builds/src-noconflict/theme-pastel_on_dark";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-sqlserver";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-textmate";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/theme-tomorrow_night_bright";
import "ace-builds/src-noconflict/theme-tomorrow_night_eighties";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-vibrant_ink";
import "ace-builds/src-noconflict/theme-xcode";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";

//whitespace
export default {
  components: {
    FileUpload,
    VAceEditor,
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
      content: "",
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
      showEmailModal: false,
      showPassModal: false,
      passNoMatch: false,
      hasLowerCase: false,
      hasUpperCase: false,
      hasNumber: false,
      hasSymbol: false,
      showDeleteUserModal: false,
      showUnsavedChangesModal: false,
      changeGradeUser: "",
      hasUnsavedChanges: false,
      leavePage: "",
    };
  },
  watch: {
    userString: function (newVal, oldVal) {
      if (newVal != oldVal) {
        this.hasUnsavedChanges = true;
      }
    },
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
    async updatePFP() {
      var au = await this.$store.dispatch("auth/getAuthUser");
      if (this.authUser != null) {
        this.user.pfp = au.pfp_path;
        if (this.user.pfp == undefined || this.user.pfp == null) {
          this.user.pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
        }
        document.getElementById("d_navpfp").src = this.user.pfp;
        document.getElementById("l_navpfp").src = this.user.pfp;
      }
    },
    async updatePass() {
      if (this.password.new != this.password.confirm) {
        this.passNoMatch = true;
      } else {
        // this.showPassChange = false;


        if(await this.passCheck(this.password.new) == true) {
          // do this if pass the other checks
          this.passNoMatch = false;
          this.showPassModal = false;
          //try fortify route and pass current and new password....i believe it checks for us and returns an error/status code
          var payload = {
            current_password: this.password.current,
            password: this.password.new,
            password_confirmation: this.password.confirm,
          };
          // const res1 = await AuthService.authClient.get(`user/confirm-password`, this.password.new);
          const res = await AuthService.updatePassword(payload);
        }
        else {
          //password doesn't pass the requirements
        }
      }
    },
    async passCheck(value) {
      if(!/[a-z]/.test(value)) {
        this.$notify({ type: "error", text: "Your password must have a lowercase letter!" });
        return false;
      }
      if (!/[A-Z]/.test(value)) {
        this.$notify({ type: "error", text: "Your password must have an uppercase letter!" });
        return false;
      }
      if(!/\d/.test(value)) {
        this.$notify({ type: "error", text: "Your password must have a numeric digit!" });
        return false;
      }
      if(!(/\W/).test(value)) {
        this.$notify({ type: "error", text: "Your password must contain a symbol!" });
        return false;
      }
      return true;
    },
    async updateEmail() {
      // this.showEmailChange = false;
      this.showEmailModal = false;
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
      this.hasUpperCase = false;
      this.hasLowerCase = false;
      this.hasNumber = false;
      this.hasSymbol = false;
      this.showPassModal = false;
    },
    closeDeleteUserModal() {
      this.showDeleteUserModal = false;
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
      if (this.user.pfp == undefined || this.user.pfp == null) {
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
          this.temppfp = response.data.asset_link;
        } catch (error) {
          this.error = getError(error);
        }
      }
    },
    async saveProfile() {
      //route works...jsut can't updated all parts of profile yet
      this.$notify({ type: "success", text: "Your changes have been saved!" });
      this.hasUnsavedChanges = false;
      var payload = {
        name: this.user.name,
        username: this.user.username,
        screen_name: this.user.screen_name,
        pfp_path: this.user.pfp,
        settings: this.user.settings,
        pronouns: this.user.pronouns,
      };
      //call route
      const res = await API.apiClient.put(
        `/profile/full/${this.authUser.fsc_user.fsc_id}`,
        payload
      );
    },
    async updateImage() {
      await this.uploadImage();
      document.getElementById("pfpmodal").src = this.temppfp;
    },
    async changeAvatar() {
      //api call to backend to update pfp path
      var payload = {
        pfp_path: this.temppfp,
      };
      const res = await API.apiClient.put(`/profile/pfp`, payload);
      //change other frontend pfp
      this.user.pfp = this.temppfp;
      document.getElementById("pfp").src = this.user.pfp;
      //after changing in backend
      this.showAvatarModal = false;
      this.updatePFP();
      //delete old picture
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
    async deleteAccount() {
      //not working yet
    },
    getGrades() {
      for (let i = 0; i < this.enrolledCourses.length; i++) {
        if (
          this.student.gradebook_courses == "null" ||
          this.student.gradebook_courses == null
        ) {
          this.letters.push("--");
          continue;
        }
        var val = JSON.parse(this.student.gradebook_courses).grades[this.enrolledCourses[i]];
        this.grades.push(val);
        if (val >= 90) {
          this.letters.push("A");
        } else if (val >= 80) {
          this.letters.push("B");
        } else if (val >= 70) {
          this.letters.push("C");
        } else if (val >= 60) {
          this.letters.push("D");
        } else if (val == undefined) {
          this.letters.push("--");
        } else {
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
    waitForDecision() {
      this.showUnsavedChangesModal = true;

      while (this.leavePage == "") {
        continue;
      }

      return this.leavePage;
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
    userString: function () {
      return JSON.stringify(this.user);
    },
  },
  async beforeMount() {
    this.authUser = await store.getters["auth/authUser"];
    if (this.authUser.settings == null) {
      const res = await API.apiClient.post(`/profile/init`);
      this.authUser = await store.getters["auth/authUser"];
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
    if (this.isProf) {
      this.showUpgrade = true; //change this later to check for admin instead of professor
    }
    this.hasUnsavedChanges = false;
  },
  async beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) {
      const decision = await this.waitForDecision();

      if (decision == "yes") {
        this.leavePage = "";
        this.showUnsavedChangesModal = false;
        return next();
      } else {
        this.leavePage = "";
        this.showUnsavedChangesModal = false;
        return next(false);
      }
    }
    return next();
  },
  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) {
      if (!window.confirm("You have unsaved changes! Are you sure you want to leave this page?")) {
        return;
      }
    }
    next();
  },
};
</script>

<style></style>
