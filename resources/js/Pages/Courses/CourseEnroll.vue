<template>
  <div>
    <vue-final-modal class="delete-modal" v-model="showInfoModal" classes="modal-container" content-class="modal-content delete-modal" :esc-to-close="true">
      <button class="modal-close" @click="closeInfo()">x</button>
      <div class="delete Course">
        <p>{{ InfoMessage }}</p>
        <div class="delete-buttons">
          <button class="btn btn-md btn-danger delete-button" @click="closeInfo()">OK</button>
        </div>
      </div>
    </vue-final-modal>
    <div
      :style="'background-image: url(&quot;' + this.courseImg + '&quot;)'"
      class="inviteBG"
    ></div>
    <div class="invite-card center">
      <div class="crop">
        <img :src="this.courseImg" alt="Course Image" width="600" />
      </div>
      <br />
      <h3 class="center">{{ course.name }}</h3>
      <br />
      <p class="center">{{ course.start_date }} — {{ course.end_date }}</p>
      <br />
      <button
        class="btn btn-lg"
        style="
          width: 97%;
          background-color: #14a160;
          border-radius: 5px !important;
          color: white;
        "
        @click="joinCourse()"
      >
        Join!
      </button>
    </div>
  </div>
</template>

<script>
import * as API from "../../services/API";
export default {
  data() {
    return {
      key: "",
      course: {},
      courseID: "",
      courseImg: "",
      showInfoModal: false,
      reloadInfoModal: 0,
      imgSizes: {
        width: 0,
        height: 0,
        fScaleToTargetWidth: true,
      },
      InfoMessage: "Something went wrong please contact your professor",
    }
  },
  methods: {
    //GETTERS
    //get course enroll key from URL
    getKey() {
      var r = window.location.pathname;
      r = r.split("/");
      this.key = r[1];
    },
    //get course using key
    async getCourse() {
      if(this.key == "") return;

      const res = await API.apiClient.get(`/invite/${this.key}`);
      this.courseID = res.data.data.course_id;

      //get course using key
      const resp = await API.apiClient.get(`/courses/${this.courseID}`);
      this.course = resp.data.data;

      //grab image location from course
      this.courseImg = this.course.img_loc;
      await this.getImg();
    },

    //IMAGE Functions
    //get image
    async getImg() {
      let img = new Image();
      img.onload = () => {
        this.scaleImage(this.width, this.height, 600, 338, false);
      }
      img.src = this.courseImg;
    },
    //scale image
    scaleImage(srcWidth, srcHeight, trgWidth, trgHeight, fLetterBox) {
      this.imgSizes = {
        width: 0,
        height: 0, 
        fScaleToTargetWidth: true,
      };

      if(srcWidth <= 0 || srcHeight <= 0 || trgWidth <= 0 || trgHeight <= 0) return;

      //scale to target width
      var scaleX1 = trgWidth;
      var scaleY1 = (srcHeight * trgWidth) / srcWidth;

      //scale to target height
      var scaleX2 = (srcWidth * trgHeight) / srcHeight;
      var scaleY2 = trgHeight;

      //now figure out which one to use
      var fScaleonWidth = scaleX2 > trgWidth;
      fScaleonWidth = fScaleonWidth ? fLetterBox : !fLetterBox;


      if(fScaleonWidth) {
        this.imgSizes.width = Math.floor(scaleX1);
        this.imgSizes.height = Math.floor(scaleY1);
        this.imgSizes.fScaleToTargetWidth = true;
      } else {
        this.imgSizes.width = Math.floor(scaleX2);
        this.imgSizes.height = Math.floor(scaleY2);
        this.imgSizes.fScaleToTargetWidth = false;
      }

      this.imgSizes.targetLeft = Math.floor((trgWidth - this.imgSizes.width) / 2);
      this.imgSizes.targetTop = Math.floor((trgHeight - this.imgSizes.height) / 2);
    },

    //MODAL Functions
    closeInfo() {
      this.showInfoModal = false;
    },
    showInfo() {
      this.showInfoModal = true;
    },


    //JOIN Course
    async joinCourse() {
      try {
        const res = await API.apiClient.post(`/invite/enroll/${this.key}`);
        if(res.status != 200) {
          throw new Error(res);
        }

        //update authUser
        const authUser = await this.$store.dispatch("auth/getAuthUser");


        //move to course page
        this.goToCourses();


      } catch(exception) {
        if(exception.response.status == 403) {
        }
        this.InfoMessage = exception.response.data.message;
        this.showInfo();
      }
    },

    //route to courses page
    goToCourses() {
      this.$router.push({ name: "Courses" });
    },


  },
  watch: {
    showInfoModal: function() {
      if(!this.showInfoModal) {
        this.reloadInfoModal++;
      }
    }
  },
  mounted() {
    this.getKey();
    this.getCourse();
  }
}
</script>

<style>

</style>