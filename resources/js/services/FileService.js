import * as API from "./API";

export default {
  async uploadFile(payload) {
    await API.apiClient.post(payload.endpoint, payload.file);
  },
};