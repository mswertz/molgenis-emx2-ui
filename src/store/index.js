import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    account: {
      email: null
    }
  },
  mutations: {
    signin(state, email) {
      state.account.email = email;
    },
    signout(state) {
      state.account.email = null;
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
