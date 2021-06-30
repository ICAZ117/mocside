<template>
  <div>
    <div v-for="accordion in accordions" :key="accordion.title">
      <div>
        <BaseAccordion :isSuccessful="accordion.isSuccessful">
          <template v-slot:title>{{ accordion.title }}</template>

          <template v-slot:content>
            <div>{{ accordion.text }}</div>
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
