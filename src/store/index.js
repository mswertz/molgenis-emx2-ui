import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    login: {
      username: null,
      loading: null
    }
  },
  mutations: {
    login(state, username) {
      state.login.username = username;
      state.login.loading = false;
    },
    logout(state) {
      state.login.username = null;
      state.login.loading = false;
    },
    loginLoading(state) {
      state.login.loading = true;
    }
  }
});

//for vue styleguidist
export default previewComponent => {
  // https://vuejs.org/v2/guide/render-function.html
  return {
    store,
    render(createElement) {
      return createElement(previewComponent);
    }
  };
};
