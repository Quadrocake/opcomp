import { createStore } from 'vuex'
import oldstore from './modules/oldstore'

export default createStore({
	modules: {
		oldstore
	}
});