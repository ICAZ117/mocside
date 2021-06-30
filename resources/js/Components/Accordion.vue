<template>
  <div>
    <div v-for="accordion in accordions" :key="accordion.title">
      <div>
        <!-- IF code passed TC, OR if code failed TC due to an error-->
        <BaseAccordion :isSuccessful="accordion.isSuccessful">
          eeeeeeeeee
          <template v-slot:title>{{ accordion.title }}</template>

          <template v-slot:content>
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
