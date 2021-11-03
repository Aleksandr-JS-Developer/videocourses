import device from 'current-device';

export default {
	actions: {},
	mutations: {},
	state: {
		device,
	},
	getters: {
		device: (state) => state.device,
	},
};
