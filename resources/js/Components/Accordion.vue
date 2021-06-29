<template>
  <div>
    <div v-for="accordion in accordions" :key="accordion.title">
      <div>
        <BaseAccordian :isSuccessful="accordion.isSuccessful">
          <template v-slot:title>{{ accordion.title }}</template>

          <template v-slot:content>
            <div>{{ accordion.text }}</div>
          </template>
        </BaseAccordian>
      </div>
    </div>
  </div>
</template>
<script>
import BaseAccordian from "./BaseAccordion.vue";

export default {
  props: ["accordions"],
  components: {
    BaseAccordian,
  },
  data() {
    return {};
  },
};
</script>
