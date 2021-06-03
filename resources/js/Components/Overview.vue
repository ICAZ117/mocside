<template>
  <div class="container overview">
    <h4 class="assignment-description">Description:</h4>
    <QuillEditor theme="snow" toolbar="full" />
    <hr />
    <h6>Proceed with caution!</h6>
    <br />
    <button class="btn btn-danger btn-lg">DELETE ASSIGNMENT</button>
  </div>
</template>

<script>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

export default {};
</script>

<style></style>
