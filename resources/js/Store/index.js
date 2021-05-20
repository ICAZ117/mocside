import { createStore } from "vuex";

import * as auth from "../store/modules/Auth";
import * as user from "../store/modules/User";

const store =  new createStore({
  strict: true,

  modules: {
    auth,
    user,
  },
});

export default store;