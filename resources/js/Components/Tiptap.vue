<template>
  <div>
    <div v-if="editor">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        strike
      </button>
      <button
        @click="editor.chain().focus().toggleCode().run()"
        :class="{ 'is-active': editor.isActive('code') }"
      >
        code
      </button>
      <button @click="editor.chain().focus().unsetAllMarks().run()">clear marks</button>
      <button @click="editor.chain().focus().clearNodes().run()">clear nodes</button>
      <button
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'is-active': editor.isActive('paragraph') }"
      >
        paragraph
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
      >
        h4
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
      >
        h5
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
      >
        h6
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        bullet list
      </button>
      <button
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }"
      >
        ordered list
      </button>
      <button
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'is-active': editor.isActive('codeBlock') }"
      >
        code block
      </button>
      <button
        @click="editor.chain().focus().toggleBlockquote().run()"
        :class="{ 'is-active': editor.isActive('blockquote') }"
      >
        blockquote
      </button>
      <button @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal rule
      </button>
      <button @click="editor.chain().focus().setHardBreak().run()">hard break</button>
      <button @click="editor.chain().focus().undo().run()">undo</button>
      <button @click="editor.chain().focus().redo().run()">redo</button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-3";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import CodeBlock from "@tiptap/extension-code-block";
import FloatingMenu from "@tiptap/extension-floating-menu";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import Paragraph from "@tiptap/extension-paragraph";
import StarterKit from "@tiptap/starter-kit";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import Gapcursor from "@tiptap/extension-gapcursor";
import History from "@tiptap/extension-history";
import ListItem from "@tiptap/extension-list-item";
import Strike from "@tiptap/extension-strike";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Dropcursor from "@tiptap/extension-dropcursor";
import HardBreak from "@tiptap/extension-hard-break";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import OrderedList from "@tiptap/extension-ordered-list";
import Text from "@tiptap/extension-text";
import { ColorHighlighter } from "./ColorHighlighter";
import { SmilieReplacer } from "./SmilieReplacer";

export default {
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        BubbleMenu,
        CodeBlock,
        FloatingMenu,
        Heading,
        Italic,
        Paragraph,
        StarterKit,
        Blockquote,
        BulletList,
        Document,
        Gapcursor,
        History,
        ListItem,
        Strike,
        Bold,
        Code,
        Dropcursor,
        HardBreak,
        HorizontalRule,
        OrderedList,
        Text,
        ColorHighlighter,
        SmilieReplacer,
      ],
      content: "This is cool!",
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style></style>
