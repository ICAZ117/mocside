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
        Grades
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