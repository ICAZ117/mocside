import router from "../../Router/index";
import { getError } from "../../utils/helpers";
import AuthService from "../../services/AuthService";

export const namespaced = true;

export const state = {
  user: null,
  loading: false,
  error: null,
  isGuest: true,
};

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_MESSAGE(state, message) {
    state.message = message;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_ISGUEST(state, isGuest) {
    state.isGuest = isGuest;
  },
};

export const actions = {
  logout({ commit, dispatch }) {
    return AuthService.logout()
      .then(() => {
        commit("SET_USER", null);
        dispatch("setGuest", { value: "isGuest" });
        commit("SET_ISGUEST", true);
        if (router.currentRoute.name !== "login")
          router.push({ path: "/login" });
      })
      .catch((error) => {
        commit("SET_ERROR", getError(error));
      });
  },
  async getAuthUser({ commit, dispatch }) {
    commit("SET_LOADING", true);
    try {
      const response = await AuthService.getAuthUser();
      commit("SET_USER", response.data.data);
      commit("SET_ISGUEST", false);
      dispatch("setGuest", { value: "isNotGuest" });
      commit("SET_LOADING", false);
      return response.data.data;
    } catch (error) {
      commit("SET_LOADING", false);
      commit("SET_USER", null);
      commit("SET_ISGUEST", true);
      dispatch("setGuest", { value: "isGuest" });
      commit("SET_ERROR", getError(error));
      return null;
    }
  },
  setGuest(context, { value }) {
    window.localStorage.setItem("guest", value);
  },
};

export const getters = {
  authUser: (state) => {
    return state.user;
  },
  isAdmin: (state) => {
    return state.user.isAdmin;
  },
  error: (state) => {
    return state.error;
  },
  loading: (state) => {
    return state.loading;
  },
  loggedIn: (state) => {
    return !!state.user;
  },
  isGuest: (state) => {
    return state.isGuest;
  },
  guest: () => {
    const storageItem = window.localStorage.getItem("guest");
    if (!storageItem) return false;
    if (storageItem === "isGuest") return true;
    if (storageItem === "isNotGuest") return false;
  },
  isProf: (state) => {
    return state.user.isProfessor;
  },
};