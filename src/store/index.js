import { createStore } from 'vuex'
import oldstore from './modules/oldstore'
import ThemesApi from './modules/ThemesApi'

export default createStore({
	modules: {
		oldstore,
		ThemesApi
	}
});