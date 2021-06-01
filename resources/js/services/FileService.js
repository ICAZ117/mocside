import * as API from "./API";

export default {
  async uploadFile(payload) {
    const res = await API.apiClient.post(payload.endpoint, payload.file);
    return res;
  },
};