<template>
  <div style="height: 90%!important;">
    <bubble-menu
      class="bubble-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor && showMenuBar"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        Strike
      </button>
    </bubble-menu>

    <div
      class="rtf-editor"
      v-if="editor"
      :style="
        isDark
          ? 'border: none!important;'
          : 'border: 2px solid #0d0d0d; box-shadow: 0px 0px 3px black;'
      "
    >
      <menu-bar class="editor__header" :editor="editor" v-if="showMenuBar" />
      <editor-content class="dark-scroll-bar editor__content" :editor="editor" />
    </div>
  </div>
</template>

<script>
import { toRaw } from 'vue';
import { Editor, EditorContent, BubbleMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar.vue";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image"

export default {
  props: ["savedText", "editable", "showMenuBar", "isDark"],
  components: {
    EditorContent,
    MenuBar,
    BubbleMenu,
  },

  data() {
    return {
      editor: null,
    };
  },

  mounted() {
    var self = this;
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          history: true,
        }),
        TextAlign,
        Image,
      ],
      content: this.savedText,
      editable: this.editable,
      //
      onUpdate() {
        self.$emit("input", this.getJSON());
      },
    });
  },
  watch : {
    savedText(value) {
      const isSame = this.editor.getJSON() === toRaw(value)

      if(isSame) {
        return
      }
      this.editor.commands.setContent(toRaw(value), false)
    }
  },

  beforeUnmount() {
    //tiptap
    this.editor.destroy();
  },
};
</script>

<style scoped>
.rtf-editor {
  display: flex;
  flex-direction: column;
  max-height: 90%;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 5px;
  /* Some information about the status */
}
.editor__header {
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
  padding: 0.25rem;
  border-bottom: 2px solid #0d0d0d;
}
.editor__content {
  padding: 1.25rem 1rem 0 1rem;
  flex: 1 1 auto;
  overflow-x: hidden;
  overflow-y: auto;

  -webkit-overflow-scrolling: touch;
}
.editor__footer {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  white-space: nowrap;
  border-top: 3px solid #0d0d0d;
  font-size: 12px;
  font-weight: 600;
  color: #0d0d0d;
  white-space: nowrap;
  padding: 0.25rem 0.75rem;
}

.editor__name button {
  background: none;
  border: none;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  color: #0d0d0d;
  border-radius: 0.4rem;
  padding: 0.25rem 0.5rem;
}
.editor__name button:hover {
  color: #fff;
  background-color: #0d0d0d;
}
</style>

<style>
.bubble-menu {
  display: flex;
  background-color: #0d0d0d;
  padding: 0.2rem;
  border-radius: 0.5rem;
}
.bubble-menu button {
  border: none;
  background: none;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0 0.2rem;
  opacity: 0.6;
}
.bubble-menu button:hover,
.bubble-menu button.is-active {
  opacity: 1;
}
.floating-menu {
  display: flex;
  background-color: #0d0d0d10;
  padding: 0.2rem;
  border-radius: 0.5rem;
}
.floating-menu button {
  border: none;
  background: none;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0 0.2rem;
  opacity: 0.6;
}
.floating-menu button:hover,
.floating-menu button.is-active {
  opacity: 1;
}

[contenteditable] {
  outline: 0px solid transparent;
}

/* Basic editor styles */
.ProseMirror > * + * {
  border: none !important;
}
.ProseMirror ul,
.ProseMirror ol {
  padding: 0 1rem;
}
.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4,
.ProseMirror h5,
.ProseMirror h6 {
  line-height: 1.1;
}
.ProseMirror p {
  margin: 0 !important;
  margin-block: 0 !important;
  margin-inline: 0 !important;
}
.ProseMirror code {
  background-color: rgba(199, 198, 198, 0.18);
  color: unset;
}
.ProseMirror pre {
  background: #0d0d0d;
  color: #fff;
  font-family: "JetBrainsMono", monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}
.ProseMirror pre code {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}
.ProseMirror mark {
  background-color: #faf594;
}
.ProseMirror img {
  max-width: 100%;
  height: auto;
}
.ProseMirror hr {
  margin: 1rem 0;
}
.ProseMirror blockquote {
  padding-left: 3rem;
  border-left: 2px solid rgba(78, 78, 78, 0.582);
}
.ProseMirror hr {
  border: none;
  border-top: 2px solid rgba(13, 13, 13, 0.1);
  margin: 2rem 0;
}
.ProseMirror ul[data-type="taskList"] {
  list-style: none;
  padding: 0;
}
.ProseMirror ul[data-type="taskList"] li {
  display: flex;
  align-items: center;
}
.ProseMirror ul[data-type="taskList"] li > label {
  flex: 0 0 auto;
  margin-right: 0.5rem;
}
</style>
