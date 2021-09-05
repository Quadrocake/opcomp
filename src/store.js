import { createStore } from 'vuex';

const store = createStore({
    state: {
        videoUrl: ""
    },
    mutations: {
      updateUrl (state, newUrl) {
        state.videoUrl = newUrl.replace('staging.', '')
      }
    }
  })

export default store;