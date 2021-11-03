import Vue from 'vue';
import Vuex from 'vuex';

import movies_data from '@/store/movies_data/movies.js';
import device from '@/store/device_info/device.js';
import sidebar from '@/store/mobile/sidebar/sidebar.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: { movies_data, device, sidebar },
});
