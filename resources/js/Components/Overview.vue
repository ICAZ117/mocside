<template>
  <div class="create-assignment">
    <div class="container">
      <h4>Description:</h4>
      <QuillEditor theme="snow" toolbar="full" class="assignment-description" v-model:value="text"/>
      <hr />
      <h5>Proceed with caution!</h5>
      <button class="btn btn-danger btn-lg">DELETE ASSIGNMENT</button>
    </div>
  </div>
</template>

<script>
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

export default {
  props: ['overview'],
  setup() {
    const state = reactive({
      dynamicComponent: null,
      content: '',
      _content: '',
      editorOption: {
        placeholder: 'core',
        modules: {
          toolbar: [
            // custom toolbars options
            // will override the default configuration
          ],
          // other moudle options here
        }
        // more options
      },
      disabled: false
    })

    const onEditorChange = ({ text }) => {
      state._content = text
    }

    return { state, onEditorBlur, onEditorFocus, onEditorReady, onEditorChange }
  },
  data() {
    return {
      description: "",
    }
  },
  computed: {
    text: {
      get() {
        return this.overview;
      },
      set(v) {
        this.$emit("update", v);
      },
    },
  }
};
</script>

<style></style>
