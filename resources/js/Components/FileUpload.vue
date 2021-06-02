<template>
  <form @submit.prevent="uploadFile">
    <div class="mb-4">
      <label for="file" class="sr-only">
        {{ label }}
      </label>
      <input type="file" :accept="fileTypes" @change="fileChange" id="file" />
    </div>
    <BaseBtn text="Upload" />
    <FlashMessage :message="message" :error="error" />
  </form>
</template>

<script>
import { getError } from "../utils/helpers";
import BaseBtn from "./BaseBtn";
import FileService from "../services/FileService";
import FlashMessage from "./FlashMessage";
export default {
  name: "FileUpload",
  props: {
    fileTypes: {
      type: Array,
      default: null,
    },
    endpoint: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
  },
  components: {
    BaseBtn,
    FlashMessage,
  },
  data() {
    return {
      file: null,
      message: null,
      error: null,
    };
  },
  methods: {
    clearMessage() {
      this.error = null;
      this.message = null;
    },
    fileChange(event) {
      this.clearMessage();
      this.file = event.target.files[0];
    },
    async uploadFile() {
      const payload = {};
      const formData = new FormData();
      formData.append("file", this.file);
      payload.file = formData;
      payload.endpoint = this.endpoint;
      this.clearMessage();
      try {
        const response = await FileService.uploadFile(payload);
        this.message = "File uploaded.";
      }
      catch(error) {
      this.error = getError(error);
      }
    },
  },
};
</script>