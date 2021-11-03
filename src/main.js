import Vue from 'vue';
import App from './App.vue';
import store from './store';

// get device info
import 'current-device';

Vue.config.productionTip = false;

new Vue({
	store,
	render: (h) => h(App),
}).$mount('#app');
