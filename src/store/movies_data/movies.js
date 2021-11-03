import device from 'current-device';

import API from '@/api/api.js';
// API.getVideosData(): Promise

// import DATA from '@/api/local.js';
import localStorageConfig from '@/localStorateConfig/config.js';

let videosView = localStorage.getItem(localStorageConfig.VIDEOS_VIEW);
if (videosView === null) {
	videosView = device.type === 'mobile' ? 'list' : 'grid';
	localStorage.setItem(localStorageConfig.VIDEOS_VIEW, videosView);
}

const translations = {
	excise_tax: 'Акцизний податок',
	business_trips: 'Відрядження',
	currency: 'Валюта',
	production: 'Виробництво і собівартість',
	vacation: 'Відпустки',
	allThemes: 'Всі теми',
	allVideos: 'усі відео',
	sale: 'Акція',
	popular: 'Популярні',
	new: 'Новинки',
};

function normalizeTitles(videos) {
	// Keeping carriage returns, but not using unsafe v-html.

	videos.forEach((videoData) => {
		videoData.title = videoData.title.replace('<br>', '\n');
	});
}

const generateThemesList = (data) => {
	return data.reduce(
		(acc, curr) => {
			acc[0].count++; // add +1 to all themes

			const themeInAcc = acc.find((theme) => theme.value === curr.theme);

			if (themeInAcc === undefined) {
				const currentTheme = curr.theme;

				acc.push({
					title: translations[currentTheme],
					count: 1,
					value: currentTheme,
				});
			} else {
				themeInAcc.count++;
			}

			return acc;
		},
		[{ title: translations.allThemes, count: 0, value: 'allThemes' }]
	);
};

const generateFiltersList = (data) => {
	const filtersList = [
		{ value: 'sale', count: 0, title: translations.sale, checked: false },
		{ value: 'popular', count: 0, title: translations.popular, checked: false },
		{ value: 'new', count: 0, title: translations.new, checked: false },
	];

	const sale = filtersList[0];
	const popular = filtersList[1];
	const newVideos = filtersList[2];

	data.forEach((dataItem) => {
		if (dataItem.options.sale === true) {
			sale.count++;
		}

		if (dataItem.options.popular === true) {
			popular.count++;
		}

		const date = new Date(dataItem.date);

		if (date.getMonth() === 6) {
			newVideos.count++;
			dataItem.options.new = true;
		}
	});

	return filtersList;
};

const searchInVideos = (data, searchStr = '') => {
	searchStr = searchStr === '' ? '.' : searchStr; // normalize search

	return data.filter((item) => new RegExp(searchStr, 'gi').test(item.title));
};

export default {
	actions: {
		async loadVideosData({ commit }) {
			commit('setLoading', true);

			const videosDataRequest = API.getVideosData();

			videosDataRequest
				.then((res) => res.json())
				.then((res) => {
					normalizeTitles(res);
					// Keeping carriage returns (<br>), but not using unsafe v-html.

					commit('setVideosData', res);
					commit('setLoading', false);
				});

			videosDataRequest.catch((err) => {
				console.error('videosDataRequest: Error:', err);
			});
		},
		setTheme({ commit }, theme) {
			commit('setTheme', theme);
		},
		toggleFilter({ commit }, filterName) {
			commit('toggleFilter', filterName);
		},
		search({ commit }, payload) {
			commit('setSearch', payload);
		},
		toggleVideosView({ commit }, view) {
			commit('setView', view);
			localStorage.setItem(localStorageConfig.VIDEOS_VIEW, view);
		},
	},
	mutations: {
		setLoading(state, payload) {
			state.conditions.loading = payload;
		},
		setVideosData(state, payload) {
			state.data.videosData = payload;
		},

		setThemesList(state, list) {
			state.lists.themes = list;
		},
		setFiltersLits(state, filters) {
			state.lists.filters = filters;
		},

		setTheme(state, theme) {
			console.log('setTheme', theme);
			state.theme = theme;
		},

		toggleFilter(state, filterName) {
			state.filters[filterName] = !state.filters[filterName];
		},

		setSearch(state, payload) {
			state.searchStr = payload;
		},

		setView(state, view) {
			state.videosView = view;
		},
	},
	state: {
		data: {
			videosData: [],
		},
		conditions: {
			loading: false,
			error: false,
			errorText: null,
		},
		lists: {
			filters: [],
		},
		filters: {
			sale: false,
			popular: false,
			new: false,
		},
		theme: 'allThemes',
		searchStr: '',
		videosView: videosView,
	},
	getters: {
		videosData: (state) => {
			return searchInVideos(state.data.videosData, state.searchStr)
				.filter((item) => {
					if (
						!state.filters.sale &&
						!state.filters.popular &&
						!state.filters.new
					) {
						return true;
					}
					if (state.filters.sale && item.options.sale) {
						return true;
					}

					if (state.filters.popular && item.options.popular) {
						return true;
					}

					if (state.filters.new && item.options.new) {
						return true;
					}

					return false;
				})
				.filter((item) => {
					if (state.theme === 'allThemes' || state.theme === item.theme) {
						return true;
					}
				});
		},
		videosDataLoading: (state) => state.conditions.loading,
		themesList: (state) => {
			return generateThemesList(
				searchInVideos(
					state.data.videosData.filter((item) => {
						if (
							!state.filters.sale &&
							!state.filters.popular &&
							!state.filters.new
						) {
							return true;
						}

						if (state.filters.sale && item.options.sale) {
							return true;
						}

						if (state.filters.popular && item.options.popular) {
							return true;
						}

						if (state.filters.new && item.options.new) {
							return true;
						}

						return false;
					}),
					state.searchStr
				)
			);
		},
		filtersList: (state) => {
			return generateFiltersList(
				searchInVideos(state.data.videosData, state.searchStr)
			);
		},
		currentThemeTitle: (state) =>
			state.theme === 'allThemes'
				? translations.allVideos
				: translations[state.theme],
		videosView: (state) => state.videosView,
	},
};
