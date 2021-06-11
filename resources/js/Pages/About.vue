<template>
  <div class="create-assignment">
    <div class="container">
      <p>BEFORE</p>
      <quillEditor></quillEditor>
      <p>AFTER</p>
    </div>
  </div>

  <!-- <quill-editor
    ref="myQuillEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
  />

  <quill-editor
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  /> -->
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
// You can also register Quill modules in the component
// import Quill from 'quill'

export default {
  data() {
    return {
      // content: '<h2>I am Example</h2>',
      // editorOption: {
      //   // Some Quill options...
      // }
    };
  },
  components: {
    quillEditor,
  },
  // methods: {
  //   onEditorBlur(quill) {
  //     console.log('editor blur!', quill)
  //   },
  //   onEditorFocus(quill) {
  //     console.log('editor focus!', quill)
  //   },
  //   onEditorReady(quill) {
  //     console.log('editor ready!', quill)
  //   },
  //   onEditorChange({ quill, html, text }) {
  //     console.log('editor change!', quill, html, text)
  //     this.content = html
  //   }
  // },
  // computed: {
  //   editor() {
  //     return this.$refs.myQuillEditor.quill
  //   }
  // },
  // mounted() {
  //   console.log('this is current quill instance object', this.editor)
  // }
};
</script>
