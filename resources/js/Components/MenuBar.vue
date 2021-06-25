<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="index" />
      <menu-item v-else :key="item.id" v-bind="item" />
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
          icon: "fa-solid fa-bold",
          title: "Bold",
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive("bold"),
          isText: false,
        },
        {
          icon: "italic",
          title: "Italic",
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive("italic"),
          isText: false,
        },
        {
          icon: "strikethrough",
          title: "strikethrough",
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive("strike"),
          isText: false,
        },
        {
          icon: "code",
          title: "Code",
          action: () => this.editor.chain().focus().toggleCode().run(),
          isActive: () => this.editor.isActive("code"),
          isText: false,
        },
        {
          type: "divider",
        },
        {
          icon: "paragraph",
          title: "Paragraph",
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive("paragraph"),
          isText: false,
        },
        {
          icon: "H1",
          title: "Heading 1",
          action: () => this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 1 }),
          isText: true,
        },
        {
          icon: "H2",
          title: "Heading 2",
          action: () => this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 2 }),
          isText: true,
        },
        {
          icon: "H3",
          title: "Heading 3",
          action: () => this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 3 }),
          isText: true,
        },
        {
          icon: "H4",
          title: "Heading 4",
          action: () => this.editor.chain().focus().toggleHeading({ level: 4 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 4 }),
          isText: true,
        },
        {
          icon: "H5",
          title: "Heading 5",
          action: () => this.editor.chain().focus().toggleHeading({ level: 5 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 5 }),
          isText: true,
        },
        {
          icon: "H6",
          title: "Heading 6",
          action: () => this.editor.chain().focus().toggleHeading({ level: 6 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 6 }),
          isText: true,
        },
        {
          type: "divider",
        },
        {
          icon: "align-left",
          title: "Left",
          action: () => this.editor.chain().focus().setTextAlign('left').run(),
          isActive: () => this.editor.isActive({ textAlign: 'left' }),
          isText: false,
        },
        {
          icon: "align-center",
          title: "Center",
          action: () => this.editor.chain().focus().setTextAlign('center').run(),
          isActive: () => this.editor.isActive({ textAlign: 'center' }),
          isText: false,
        },
        {
          icon: "align-right",
          title: "Right",
          action: () => this.editor.chain().focus().setTextAlign('right').run(),
          isActive: () => this.editor.isActive({ textAlign: 'right' }),
          isText: false,
        },
        {
          icon: "align-justify",
          title: "Justify",
          action: () => this.editor.chain().focus().setTextAlign('justify').run(),
          isActive: () => this.editor.isActive({ textAlign: 'justify' }),
          isText: false,
        },
        {
          type: "divider",
        },
        {
          icon: "list-ul",
          title: "Bullet List",
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive("bulletList"),
          isText: false,
        },
        {
          icon: "list-ol",
          title: "Numbered List",
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive("orderedList"),
          isText: false,
        },
        {
          icon: "tasks",
          title: "Task List",
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive("taskList"),
          isText: false,
        },
        {
          icon: "file-code",
          title: "Code Block",
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive("codeBlock"),
          isText: false,
        },
        {
          type: "divider",
        },
        {
          icon: "quote-right",
          title: "Blockquote",
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive("blockquote"),
          isText: false,
        },
        {
          icon: "minus",
          title: "Horizontal Rule",
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
          isText: false,
        },
        {
          type: "divider",
        },
        {
          icon: "level-down-alt",
          title: "Page Break",
          action: () => this.editor.chain().focus().setHardBreak().run(),
          isText: false,
        },
        {
          icon: "broom",
          title: "Clear Formatting",
          action: () => this.editor.chain().focus().clearNodes().unsetAllMarks().run(),
          isText: false,
        },
        {
          type: "divider",
        },
        {
          icon: "undo",
          title: "Undo",
          action: () => this.editor.chain().focus().undo().run(),
          isText: false,
        },
        {
          icon: "redo",
          title: "Redo",
          action: () => this.editor.chain().focus().redo().run(),
          isText: false,
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
