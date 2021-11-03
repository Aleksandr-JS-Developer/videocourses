const API_VIDEOS_DATA = process.env.VUE_APP_API_VIDEOS_DATA;

const API = {
	getVideosData() {
		return fetch(API_VIDEOS_DATA);
	},
};
export default API;

/*
	import API from '@/api/api.js';
	
	const getViedos = API.getVideosData();

	getViedos
		.then(res => res.json())
		.then((data) => {
		console.log('data', data);
		this.videos = data;
		});

	getViedos.catch((err) => {
		console.log('error');
	})
*/
