<template>
  <div>
    <div v-for="accordion in accordions" :key="accordion.title">
      <div>
        <BaseAccordion :isSuccessful="accordion.isSuccessful">
          <template v-slot:title>
            {{ accordion.title }}
            
          </template>

          <template v-slot:content>
            <div>{{ accordion.text }}</div>

            <!-- IF the code FAILED the test case, and does NOT have an error, print extensive output -->
            <div v-if="!accordion.isSuccessful && !accordion.hasError" class="details">
              <br />

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
