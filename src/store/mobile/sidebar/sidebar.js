export default {
	actions: {
		toggleSidebar({ commit, state }) {
			commit('setSidebar', !state.sideBarIsOpened);
		},
		setSidebar({ commit }, payload) {
			commit('setSidebar', payload);
		},
	},
	mutations: {
		setSidebar(state, payload) {
			state.sideBarIsOpened = payload;
		},
	},
	state: {
		sideBarIsOpened: false,
	},
	getters: {
		sideBarIsOpened: (state) => state.sideBarIsOpened,
	},
};
