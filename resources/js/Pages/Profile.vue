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
        Profile
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
                <th><i class="fas fa-grin-alt spacer"></i></th>
                <th>Course</th>
                <th>Letter Grade</th>
                <th>Grade Percentage</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              <!-- Loop over all LABS -->
              <template v-for="(lab, index) in grades.labs" :key="index">
                <!-- Regular table row -->
                <tr class="problem pointer" @click="toggleExpansion(lab.labID)">
                  <td v-if="!isExpanded(lab.labID)">
                    <i class="fas fa-chevron-right"></i>
                  </td>
                  <td v-if="isExpanded(lab.labID)">
                    <i class="fas fa-chevron-down"></i>
                  </td>
                  <td>{{ lab.name }}</td>
                  <td>{{ lab.numProblems }}</td>
                  <td>{{ lab.percentComplete }}</td>
                  <td>{{ lab.dueDate }}</td>
                  <td>{{ lab.grade == undefined ? "--" : lab.grade }}</td>
                  <td>{{ lab.total_points }}</td>
                  <td>
                    {{
                      lab.total_points == 0
                        ? 0
                        : lab.grade == undefined
                        ? 0
                        : parseInt((lab.grade / lab.total_points) * 10000) * 0.01
                    }}%
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </tab-panel>
      <tab-panel :val="'Security'">
        Security
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
      grades: {},
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
};
// * Add profile Page....sorta like a dashboard
// * Overall Course Grades
// * Profile Settings.....username, email, password, profile picture, delete account?...if professor upgrade button
// * IDE Settings......Theme, language, Console Theme

</script>

<style>

</style>
<!-- https://myaccount.microsoft.com/ for the stlying -->