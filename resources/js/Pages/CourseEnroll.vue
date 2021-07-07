<template>
  <div>
    <div
      :style="'background-image: url(&quot;' + this.courseImg + '&quot;)'"
      class="inviteBG"
    ></div>
    <div class="invite-card center">
      <!-- <img
        :src="this.courseImg"
        alt="Course Image"
        class="invite-card-img"
        :width="imgSizes.width"
        :height="imgSizes.height"
      /> -->
      <div class="crop">
        <img :src="this.courseImg" alt="Course Image" width="600" />
      </div>
      <br />
      <h3 class="center">{{ course.name }}</h3>
      <br />
      <p class="center">1/1/2021 - 5/31/2021</p>
      <br />
      <button
        class="btn btn-lg"
        style="
          width: 97%;
          background-color: #14a160;
          border-radius: 5px !important;
          color: white;
        "
      >
        Join!
      </button>
    </div>
  </div>

  <!-- <h1>You have been invited to join {{ course.name }}</h1>
  <button @click="joinCourse()" type="submit">Join</button>
  <button @click="cancelCourse()" type="submit">Cancel</button>
  <p>yah</p> -->
</template>

<script>
import * as API from "../services/API";
export default {
  data() {
    return {
      key: "",
      course: {},
      courseID: "",
      courseImg: "",
      imgSizes: {
        width: 0,
        height: 0,
        fScaleToTargetWidth: true,
      },
    };
  },
  methods: {
    scaleImage(srcwidth, srcheight, targetwidth, targetheight, fLetterBox) {
      console.log("HERE");
      console.log(srcwidth);
      console.log(srcheight);
      console.log(targetwidth);
      console.log(targetheight);
      console.log(fLetterBox);
      this.imgSizes = {
        width: 0,
        height: 0,
        fScaleToTargetWidth: true,
      };

      if (srcwidth > 0 && srcheight > 0 && targetwidth > 0 && targetheight > 0) {
        // scale to the target width
        var scaleX1 = targetwidth;
        var scaleY1 = (srcheight * targetwidth) / srcwidth;

        // scale to the target height
        var scaleX2 = (srcwidth * targetheight) / srcheight;
        var scaleY2 = targetheight;

        // now figure out which one we should use
        var fScaleOnWidth = scaleX2 > targetwidth;
        if (fScaleOnWidth) {
          fScaleOnWidth = fLetterBox;
        } else {
          fScaleOnWidth = !fLetterBox;
        }

        if (fScaleOnWidth) {
          this.imgSizes.width = Math.floor(scaleX1);
          this.imgSizes.height = Math.floor(scaleY1);
          this.imgSizes.fScaleToTargetWidth = true;
        } else {
          this.imgSizes.width = Math.floor(scaleX2);
          this.imgSizes.height = Math.floor(scaleY2);
          this.imgSizes.fScaleToTargetWidth = false;
        }
        this.imgSizes.targetleft = Math.floor((targetwidth - this.imgSizes.width) / 2);
        this.imgSizes.targettop = Math.floor((targetheight - this.imgSizes.height) / 2);
      }
    },

    async joinCourse() {
      //join class
      const res = await API.apiClient.post(`/invite/enroll/${this.key}`);

      //move to course page
      this.$router.push({ name: "Labs", params: { course_id: this.courseID } });
    },
    cancelCourse() {
      //move to home since not joining page
      this.$router.push({ name: "Courses" });
    },
    async getCourse() {
      //if valid key
      if (this.key == "") {
        console.log("404");
      }
      const res = await API.apiClient.get(`/invite/${this.key}`);
      this.courseID = res.data.data.course_id;

      //grab course using key
      const resp = await API.apiClient.get(`/courses/${this.courseID}`);
      this.course = resp.data.data;

      //Grab image location from course
      this.courseImg = this.course.img_loc;
    },
    getKey() {
      // /key/enroll
      var r = window.location.pathname;
      r = r.split("/");
      this.key = r[1];
    },
  },
  async beforeMount() {
    this.getKey();

    await this.getCourse();

    console.log(this.course);

    var self = this;

    let img = new Image();

    img.onload = function () {
      self.scaleImage(this.width, this.height, 600, 338, false);
    };

    img.src = this.courseImg;
  },
};
</script>

<style></style>
