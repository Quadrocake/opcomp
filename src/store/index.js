import { createStore } from 'vuex'
import Themes from './modules/Themes'
import List from './modules/List'

export default createStore({
	modules: {
		Themes,
		List
	}
});