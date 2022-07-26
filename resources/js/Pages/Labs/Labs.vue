<template>
  <div>
    <!-- Main Page-->
    <div class="courses header">
      <div class="heading">
        <h2>{{ (courseName ? courseName : courseNameLocal) + (this.studentView ? ' - Student View' : '') }}</h2>
        <hr />

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

    <small class="navigation"
      ><span>{{ username }}{{ currentDirectory }}</span>
      <br />
      <span class="pointer underline" @click="this.goToCourses()"
        >↩ Return to Courses</span
      >
    </small>
    <div class="exit-student-view" style="text-align:end;margin-top:1rem;margin-right:1rem;">
      <button type="button" v-if="this.studentView" @click="exitStudentView()" class="btn btn-danger">Exit Student View</button>
    </div>
    <br />
    <br v-if="!this.studentView">
    <br v-if="!this.studentView">
    <label for="sort">Sort By: </label>
    <select id="sort" v-model="sort" @change="sortLabs">
      <option value="0">Due Date</option>
      <option value="1">Name</option>
      <option value="2">Unsorted</option>
    </select>

    <tab-panels v-model="selectedTab" :animate="true">
      <tab-panel :val="'Labs'">
        <LabGrid @removeLab="removeLab" :courseID="courseID" :labs="labs" :progress="progress" :studentView="studentView"></LabGrid>
      </tab-panel>
      <tab-panel :val="'Grades'">
		  <GradeGrid v-if="!isProf && labs.length != 0 && !studentView" :courseID="courseID" :labs="labs" :studentView="studentView"></GradeGrid>
      </tab-panel>
    </tab-panels>
  </div>
</template>

<script>
import * as API from "../../services/API";
import store from "../../Store/index";
import {sort} from "../../services/Sort";
import {reactive, toRefs, computed} from "vue";
import { useRoute } from "vue-router";

import LabGrid from "./LabGrid.vue";
import GradeGrid from "./GradeGrid.vue";

var tabs = ["Labs", "Grades"];

export default {
    props: ["courseID", "courseName", "studentView"],
    name: "Labs",
    components: {
        LabGrid,
        GradeGrid
    },
    data() {
        return {
            username: "",
            fscID: null,
            allLabs: [],
            labs: [],
            progress: {},
            sort: "1",
            student: {},
            problems: {},
            courseNameLocal: "",
        }
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
        //lab list work
        async fetchLabs() {
            const rawLabs = await API.apiClient.get(`/labs/${this.courseID}`);

            //get list of all labs
            this.allLabs = rawLabs.data.data;

            //get's progress if student, returns {} if not
            this.progress = await this.getProgress();

            //loop and get percent complete and recent activity
            this.allLabs.forEach((lab) => {
                if(!this.isProf) {
                    lab["percent"] = this.getPercent(lab);
                    lab["activity"] = this.getActivity(lab);
                }
            });

            //sort Labs
            await this.sortLabs();
        },

        async sortLabs() {
            //get sort method and call it
            if(this.sort == "0") {
                //duedate
                this.allLabs = sort(4, this.allLabs);
            } else if (this.sort == "1") {
                //name
                //default
                this.allLabs = sort(3, this.allLabs);
            } else {
                //Lab ID
                this.allLabs = sort(5, this.allLabs);
            }

            //filter lab list as necessary
            await this.filterLabs();

            return;
        },

        async filterLabs() {
            //if student only grab published labs
            if(this.isProf) {
                this.labs = this.allLabs;
            } else {
                //we have a student
                this.labs = this.allLabs.filter(lab => {
                    //return true if it should be kept in, and false if it should be removed
                    if (this.isPublished(lab)) {
                        //check if the published lab has problems
                        if(lab.num_problems > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                });
            }
            return;
        },

        isPublished(lab) {
            // return true if the lab is published
            var now = new Date(Date.now());

            // if no publish date
            if (lab.publish_date == null || lab.publish_date == "") {
                return false;
            }

            var pd = lab.publish_date.split("-")[2];
            var pm = lab.publish_date.split("-")[1]-1;
            var py = lab.publish_date.split("-")[0];

            var publishDate = new Date(py, pm, pd, 0, 0, 0, 0);

            //check if publish date has passed
            if(publishDate < now) {
                return true;
            } else {
                return false;
            }

        },


        //individual lab work
        //deleting a lab
        removeLab(id) {
            //remove from both labs list
            this.allLabs = this.allLabs.filter((l) => l.id != id);
            this.labs = this.labs.filter((l) => l.id != id);
        },
        //get lab percent
        getPercent(lab) {
            if (lab.numProblems == 0) {
                return "0%";
            }

            var d = JSON.parse(this.progress.labs);
            for(let i = 0; i < d.length; i++) {
                if(d[i].lab_id == lab.id) {
                    return parseInt((d[i].num_completed / lab.num_problems) * 100) + "%";
                }
            }

            return "0%";
        },
        //get lab activity
        getActivity(lab) {
            var d = JSON.parse(this.progress.labs);
            
            for(let i = 0; i < d.length; i++) {
                if(d[i].lab_id == lab.id) {
                    return d[i].last_progress;
                }
            }

            return "No Recent Activity";
        },



        //user Related Functions
        async getProgress() {
            //check if student
            if(!this.isProf) {
                const res = await API.apiClient.get(`/progress/${this.fscID}`);
                return res.data.data;
            } else {
                //could eventually replace this with a total progress of all students
                return {};
            }
        },

        //routing functions
        goToCourses() {
            this.$router.push({
                name: "Courses",    
            });
        },
        async getCourseName() {
            const res = await API.apiClient.get(`/courses/${this.courseID}`);
            return res.data.data.name;
        },
        exitStudentView() {
            this.$router.push({name: 'Labs', params: { courseID: this.courseID, courseName: this.courseName }});
        }
    },
    computed: {
        authUser: function() {
            return store.getters["auth/authUser"];
        },
        isProf: function() {
            if(store.getters["auth/isProf"] == null) {
                return false;
            } else {
                return store.getters["auth/isProf"] && !this.studentView;
            }
        }
    },
    async mounted() {
        if (!this.courseName) {
            this.courseNameLocal = await this.getCourseName();
        }
        this.username = this.authUser.username;
        this.fscID = this.authUser.fsc_user.fsc_id;
        await this.fetchLabs();
    },
}
</script>

<style>

</style>