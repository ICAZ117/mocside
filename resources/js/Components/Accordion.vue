<template>
  <div>
    <div v-for="accordion in accordions" :key="accordion.title">
      <BaseAccordian :isSuccessful="accordion.isSuccessful">
        <template v-slot:title>{{ accordion.title }}</template>

        <template v-slot:content>
          <div>{{ accordion.text }}</div>
        </template>
      </BaseAccordian>
    </div>
  </div>
</template>
<script>
import BaseAccordian from "./BaseAccordion.vue";

export default {
  components: {
    BaseAccordian,
  },
  data() {
    return {
      accordions: [
        {
          title: "Vue",
          text: "All about Vue",
          isSuccessful: "",
        },
        {
          title: "Nuxt",
          text: "All about Nuxt",
          isSuccessful: true,
        },
        {
          title: "webpack",
          text: "All about webpack",
          isSuccessful: false,
        },
      ],
    };
  },
};
</script>
