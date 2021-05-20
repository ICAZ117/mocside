import { createStore } from "vuex";

import * as auth from "../Store/modules/Auth";
import * as user from "../Store/modules/User";

const store =  new createStore({
  strict: true,

  modules: {
    auth,
    user,
  },
});

export default store;