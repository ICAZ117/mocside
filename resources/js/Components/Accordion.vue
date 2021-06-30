<template>
  <div>
    <div v-for="accordion in accordions" :key="accordion.title">
      <div>
        <!-- IF code passed TC, OR if code failed TC due to an error-->
        <BaseAccordion
          v-if="accordion.isSuccessfull || (!accordion.isSuccessful && accordion.hasError)"
          :isSuccessful="accordion.isSuccessful"
        >
          <template v-slot:title>{{ accordion.title }}</template>

          <template v-slot:content>
            <div>{{ accordion.text }}</div>
          </template>
        </BaseAccordion>

        <!-- ELSE, code failed test case due to logical issue, must display comparison -->
        <BaseAccordion v-else :isSuccessful="accordion.isSuccessful">
          <template v-slot:title>{{ accordion.title }}</template>

          <template v-slot:content>
            <div class="wrapper">
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
