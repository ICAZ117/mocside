<template>
  <div v-if="course != null" class="course-dashboard darkBG">
    <!-------------- TOP ROW -------------->
    <div class="top-row">
      <div class="top-left course-details">
        <CourseDetails :course="course"></CourseDetails>
      </div>
      <div class="top-right grades">
        <CourseRoster :course="course" v-if="course != null"></CourseRoster>
      </div>
    </div>
    <hr style="margin: 0; padding: 0; color: white" />
    <div style="overflow: hidden !important">
      <hr style="margin: 0; padding: 0; color: white; transform: rotate(90deg)" />
    </div>

    <div class="bottom-row">
      <div class="bottom-left key-gen">
        <KeyGen :courseID="courseID" :courseEnd="course.end_date"></KeyGen>
      </div>
      <div class="bottom-right labs">
        <CourseLabList :courseID="courseID"></CourseLabList>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "../../services/API";
import KeyGen from "../../Components/CourseComponents/KeyGen.vue";
import CourseRoster from "../../Components/CourseComponents/CourseRoster.vue";
import CourseLabList from "../../Components/CourseComponents/CourseLabList.vue";
import store from "../../Store/index";
import CourseDetails from '../../Components/CourseComponents/CourseDetails.vue';
export default {
  props: ["courseID"],
  emits: ["unmounting", "courseEdited", "pushToLabs", "studentView", "editLab"],
  components: {
    KeyGen,
    CourseRoster,
    CourseLabList,
    CourseDetails
  },
  data() {
    return {
      course: null,
    };
  },
  methods: {
    async fetchCourse() {
      this.course = await API.apiClient.get(`/courses/full/${this.courseID}`).data.data;
    }
  },
  async mounted() {
    await this.fetchCourse();
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
};
</script>

<style></style>
