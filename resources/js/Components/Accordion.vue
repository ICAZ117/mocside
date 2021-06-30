<template>
  <div>
    <div v-for="accordion in accordions" :key="accordion.title">
      <div>
        <BaseAccordion :isSuccessful="accordion.isSuccessful">
          <template v-slot:title>{{ accordion.title }}</template>

          <template v-slot:content>
            <!-- IF the code FAILED the test case, and does NOT have an error, print extensive output -->
            <div v-if="!accordion.isSuccessful && !accordion.hasError" class="wrapper">
              <div>{{ accordion.text }}</div>
              <br />

              <p>Input:</p>
              <div class="info">{{ accordion.input }}</div>
              <br />

              <p>Expected Output:</p>
              <div class="success">{{ accordion.profOut }}</div>
              <br />

              <p>Your Output:</p>
              <div class="failed">{{ accordion.userOut }}</div>
              <br />

              <p>Differences:</p>
              <div class="info" v-html="accordion.differences"></div>
              <br />
            </div>

            <!-- ELSE, the code passed the test case, or there is an error. Simply print the text. -->
            <div v-else>{{ accordion.text }}</div>
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
    return {};
  },
};
</script>
