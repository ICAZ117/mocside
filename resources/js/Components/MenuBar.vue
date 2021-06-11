<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="index" />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  components: {
    MenuItem,
  },

  props: {
    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      items: [
        {
          icon: "bold",
          title: "Bold",
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive("bold"),
        },
        {
          icon: "italic",
          title: "Italic",
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive("italic"),
        },
        {
          icon: "strikethrough",
          title: "strikethrough",
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive("strike"),
        },
        {
          icon: "code",
          title: "Code",
          action: () => this.editor.chain().focus().toggleCode().run(),
          isActive: () => this.editor.isActive("code"),
        },
        {
          icon: "highlighter",
          title: "Highlight",
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive("highlight"),
        },
        {
          type: "divider",
        },
        {
          icon: "h1",
          title: "Heading 1",
          action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 1 }),
        },
        {
          icon: "h2",
          title: "Heading 2",
          action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 2 }),
        },
        {
          icon: "h3",
          title: "Heading 3",
          action: () => this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 3 }),
        },
        {
          icon: "h4",
          title: "Heading 4",
          action: () => this.editor.chain().focus().toggleHeading({ level: 4 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 4 }),
        },
        {
          icon: "h5",
          title: "Heading 5",
          action: () => this.editor.chain().focus().toggleHeading({ level: 5 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 5 }),
        },
        {
          icon: "h6",
          title: "Heading 6",
          action: () => this.editor.chain().focus().toggleHeading({ level: 6 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 6 }),
        },
        {
          icon: "paragraph",
          title: "Paragraph",
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive("paragraph"),
        },
        {
          icon: "list-ul",
          title: "Bullet List",
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive("bulletList"),
        },
        {
          icon: "list-ol",
          title: "Numbered List",
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive("orderedList"),
        },
        {
          icon: "tasks",
          title: "Task List",
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive("taskList"),
        },
        {
          icon: "file-code",
          title: "Code Block",
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive("codeBlock"),
        },
        {
          type: "divider",
        },
        {
          icon: "quote-right",
          title: "Blockquote",
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive("blockquote"),
        },
        {
          icon: "minus",
          title: "Horizontal Rule",
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          type: "divider",
        },
        {
          icon: "page-break",
          title: "Page Break",
          action: () => this.editor.chain().focus().setHardBreak().run(),
        },
        {
          icon: "broom",
          title: "Clear Formatting",
          action: () => this.editor.chain().focus().clearNodes().unsetAllMarks().run(),
        },
        {
          type: "divider",
        },
        {
          icon: "undo",
          title: "Undo",
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: "redo",
          title: "Redo",
          action: () => this.editor.chain().focus().redo().run(),
        },
      ],
    };
  },
};
</script>

<style scoped>
.divider {
  width: 2px;
  height: 1.25rem;
  background-color: rgba(0, 0, 0, 0.1);
  margin-left: 0.5rem;
  margin-right: 0.75rem;
}
</style>
