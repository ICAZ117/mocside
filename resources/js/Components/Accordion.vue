<template>
  <div>
    <div v-for="accordion in accordions" :key="accordion.title">
      <div>
        <!-- @toggle="toggle" :key="show" -->
        <BaseAccordion :isSuccessful="accordion.isSuccessful">
          <template v-slot:title>
            {{ accordion.title }}
            <div class="right">
              <div
                v-if="accordion.isSuccessful == 'running'"
                class="spinner"
                style="padding-top: 2px"
              ></div>
              <div
                v-if="accordion.isSuccessful == true"
                class="fas fa-check"
                style="padding-top: 2px"
              ></div>
              <div
                v-if="accordion.isSuccessful == false"
                class="fas fa-times"
                style="padding-top: 2px"
              ></div>
            </div>
          </template>

          <template v-slot:content>
            <div>{{ accordion.text }}</div>

            <!-- IF the code FAILED the test case, and does NOT have an error, print extensive output -->
            <div v-if="!accordion.isSuccessful && !accordion.hasError" class="details">
              <p>Input:</p>
              <div class="info">{{ accordion.input }}</div>
              <br />

              <p>Expected Output:</p>
              <div class="success" v-html="accordion.profOut"></div>
              <br />

              <p>Your Output:</p>
              <div class="failed" v-html="accordion.userOut"></div>
              <br />

              <p>Differences:</p>
              <div class="info" v-html="accordion.differences"></div>
            </div>
          </template>
        </BaseAccordion>
      </div>
    </div>
  </div>
</template>
<script>
import BaseAccordion from "./BaseAccordion.vue";

export default {
  props: ["accordions"],
  components: {
    BaseAccordion,
  },
  data() {
    return {
      // show: false,
    };
  },
  // methods: {
  //   toggle() {
  //     this.show = !this.show;
  //   },
  // },
};
</script>
