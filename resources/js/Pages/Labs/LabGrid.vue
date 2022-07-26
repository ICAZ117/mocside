<template>
<vue-final-modal
      v-model="showDeleteModal"
      classes="modal-container"
      content-class="modal-content delete-modal"
      :esc-to-close="true"
    >
      <button class="modal-close" @click="closeDeleting()">x</button>
      <div class="delete Course">
        <p>
          Are you sure you would like to delete {{ deletingLab.lab.name }}
        </p>
        <div class="delete-buttons">
          <button class="btn btn-md btn-danger delete-button" @click="closeDeleting()">
            Cancel
          </button>
          <button class="btn btn-md btn-danger delete-button" @click="deleteLab()">
            Delete
          </button>
        </div>
      </div>
    </vue-final-modal>
  <tab-panel :val="'Labs'">
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
                <th v-if="!isProf">% Complete</th>
                <th>Due Date</th>
                <th v-if="!isProf">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="lab in labs" :key="lab.id">
                <tr v-if="!isProf" class="lab pointer" :id="lab.id" @click="goToProblems(lab.id, lab.name)">
                  <td>
                    <a>{{ lab.name }}</a>
                  </td>
                  <td>{{ lab.num_problems }}</td>
                  <td v-if="!isProf">{{ lab.percent }}</td>
                  <!-- <td>69%</td> -->
                  <td>{{ lab.due_date }}</td>
                  <td v-if="!isProf">{{ lab.activity }}</td>
                  <!-- <td>4/20/0420</td> -->
                </tr>

                <tr v-if="isProf" class="lab pointer" @click.prevent="goToProblems(lab.id, lab.name)" @contextmenu.prevent="showMenu(lab.id)">
                  <td>
                    <a>{{ lab.name }}</a>
                  </td>
                  <td>{{ lab.num_problems }}</td>
                  <!-- <td>69%</td> -->
                  <td>{{ lab.due_date }}</td>
                  <!-- <td>4/20/0420</td> -->
                </tr>
              </template>

              <tr v-if="isProf" class="lab pointer" @click="addLab">
                <td colspan="5">Add Lab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </tab-panel>
      <div >
    <div v-for="(lab, key) in labs" :key="lab.id">
      <div :id="lab.id">
        <ul id="menu">
          <li class="menu-item">
            <a
              v-if="isProf"
              class="pointer no-decor"
              @click="editLab(lab.id, lab.name)"
              >Edit</a
            >
          </li>
          <li class="menu-item">
            <a
              v-if="isProf"
              class="pointer no-decor"
              @click="deleting(lab.id, lab, key)"
              >Delete</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div id="out-click" @click="closeMenu"></div>
  </div>
</template>

<script>
import * as API from "../../services/API";
import store from "../../Store/index";
export default {
    props: [ "courseID", "labs", "progress", "studentView" ],
    emits: ["removeLab"],
    data() {
        return {
            labID: null, 
            labName: null,
            rightClickID: "",
            showDeleteModal: false,
            reloadDeleteModal: 0,
            deletingLab: {
                id: "",
                lab: {},
                key: ""
            }
        };
    },
    methods: {

        //lab list work
        async getColors() {
            this.labs.forEach(lab => {
                var element = document.getElementById(lab.id);
                if (lab["percent"] == "100%") {
                    //green background
                    element?.classList.add("complete");
                } else if (lab["percent"] != "0%") {
                    //red background
                    element?.classList.add("incomplete");
                } else {
                    //white background do nothing
                    element?.classList.remove("incomplete");
                    element?.classList.remove("complete");
                }
            });
        },


        //add Lab
        async addLab() {
            var payload = {
                name: "New Lab",
                description: "New Lab",
                course_id: this.courseID,
                due_date: this.getFutureDate(),
            };

            //add lab to backend
            const lab = await API.apiClient.post(`/labs`, payload);

            var labID = lab.data.data.id;

            //move to Edit Page
            this.editLab(labID, lab.data.data.name);

            //not adding it to the list of labs because when they redirect back to the page it should be there, 
            // because it will be regrabbing all the labs
        },
        //deleting a lab
        deleting(id, lab, key) {
            document.getElementById("out-click").style.display = "none";
            this.showDeleteModal = true;

            this.deletingLab.id = id;
            this.deletingLab.lab = lab;
            this.deletingLab.key = key;
        },
        closeDeleting() {
            this.showDeleteModal = false;
        },
        async deleteLab() {
            //delete lab from backend
            var id = this.deletingLab.id;
            var lab = this.deletingLab.lab;
            var key = this.deletingLab.key;

            //remove lab from current course
            const res = await API.apiClient.delete(`/labs/${lab.id}`);

            //remove lab from parent's list of labs
            this.$emit('removeLab', id);

            this.closeDeleting();
        },



        //individual lab work
        showMenu(lab_id) {
            if(this.isProf) {
                this.rightClickID = String(lab_id);
                const menu = document.getElementById(this.rightClickID).childNodes[0];
                const outClick = document.getElementById("out-click");

                //set menu positions
                menu.style.top = `${window.event.clientY + document.body.scrollTop}px`;
                menu.style.left = `${window.event.clientX}px`;
                menu.classList.add("show");

                //set outclick display
                outClick.style.display = "block";
            }
        },
        closeMenu() {
            try {
                document.getElementById(this.rightClickID).childNodes[0].classList.remove("show");
            } catch (e) {}
            finally {
                document.getElementById("out-click").style.display = "none";
                this.rightClickID = "";
            }
            
        },



        //routing methods
        goToProblems(id, name) {
            this.labID = id;
            this.labName = name;
            this.studentView ?
              this.$router.push({ name: "Problems", params: { courseID: this.courseID, labID: id, labName: name, studentView: this.studentView }})
              : this.$router.push({ name: "Problems", params: { courseID: this.courseID, labID: id, labName: name }});
        },
        //edit lab
        async editLab(labID, labName) {
            this.labID = labID;
            this.labName = labName;
            this.$router.push({ name: "EditLab", params: { courseID: this.courseID, labID: labID } });
        },

        //miscellaneous methods
        getFutureDate() {
            //get date 1 week from current date, returns string format: "YYYY-MM-DD"
            var now = new Date(Date.now());
            var nextWeek = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
            return nextWeek.toISOString().split("T")[0];
        }

    },
    computed: {
        authUser: function() {
            return store.getters["auth/authUser"];
        },
        isProf: function() {
            if (store.getters["auth/isProf"] == null) {
                return false;
            } else {
                return store.getters["auth/isProf"] && !this.studentView;
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
    async mounted() {
        //get colors for each lab
        await this.getColors();
    },
}
</script>

<style>

</style>