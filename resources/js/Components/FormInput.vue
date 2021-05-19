<template>
  <div>
    <label
      :for="name"
      class="form-label"
      :class="{ 'sr-only': !showLabel }"
      v-if="label"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :type="type"
      :value="value"
      :required="required"
      @input="updateValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="form-input"
    />
  </div>
</template>

<script>
export default {
  name: "FormInput",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    value: {
      type: [String, Number],
    },
    type: {
      type: String,
      default: "text",
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: null,
    },
    autocomplete: {
      type: String,
      default: null,
    },
  },
  methods: {
    updateValue(event) {
      return this.$emit("input", event.target.value);
    },
  },
};
</script>