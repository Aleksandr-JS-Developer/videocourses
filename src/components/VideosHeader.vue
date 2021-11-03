<template>
	<div class="videos_header">
		<div class="videos_header-title">
			<p class="videos_header-title-text">
				{{ currentThemeTitle }}
			</p>
			<div class="videos_header-title-line"></div>
		</div>
		<div class="videos_header-controls">
			<div class="videos_header-controls-search">
				<input
					type="text"
					class="videos_header-controls-search-input"
					v-model="searchStr"
				>
				<img
					src="@/assets/icons/search.svg"
					alt="search"
					class="videos_header-controls-search-search_icon"
				>
			</div>	
			<div class="videos_header-controls-toggle_view">
				<img
					src="@/assets/icons/grid.svg"
					alt="grid_view"
					class="videos_header-controls-toggle_view-grid"
					@click="_toggleVideosView('grid')"
				>
				<img
					src="@/assets/icons/list.svg"
					alt="list_view"
					class="videos_header-controls-toggle_view-list"
					@click="_toggleVideosView('list')"
				>
			</div>
		</div>
	</div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
	name: 'VideosHeader',
	data: () => ({
		searchStr: ''
	}),
	computed: {
		...mapGetters(['currentThemeTitle', 'device'])
	},
	watch: {
		searchStr(){
			this.search(this.searchStr);
		}
	},
	methods: {
		...mapActions(['search', 'toggleVideosView']),
		_toggleVideosView(payload){
			if(this.device.type === 'mobile'){
				this.toggleVideosView('list');
			} else {
				this.toggleVideosView(payload);
			}
		}
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/index.scss';

	.videos_header {
		grid-area: header;
		height: 100%;

		display: grid;

		grid-template-areas: "title title title title title title controls controls controls";	
    	grid-template-columns: repeat(9, 1fr);
		grid-gap: $global-sizes-grid_gap;

		@include mobile {
			grid-template-areas:
				"controls"
				"title";	
    		grid-template-columns: 1fr;
		}

		&-title {
			grid-area: title;
			display: grid;
			grid-template-columns: max-content auto;
			overflow: hidden;

			@include mobile {
				grid-template-columns: 1fr;
				margin-top: 40px;
				height: 55px;
			}

			&-text {
				
				font-size: $global-sizes-font-header;
				color: $global-colors-header_background;
				font-weight: 400;
				text-transform: uppercase;
				
				display: flex;
    			align-items: center;
				margin-right: 15px;

				@include mobile {
					margin: 0;
    				justify-content: center;
					font-size: $global-sizes-font-header-mobile;
					font-weight: 500;
				}
			}

			&-line {
				margin: auto 50px auto 0;
				height: 1px;
				background-color: #d3d3d3;

				@include mobile {
					display: none;
				}
			}
		}

		&-controls {
			grid-area: controls;
			width: 100%;

			display: grid;
    		height: 27px;
    		grid-template-areas: "s s s c";
			align-items: center;
			margin: auto 0 auto -10px;

			@include mobile {
				grid-template-areas:
					"s"
					"c";
				justify-content: center;
				margin: 5px 0;
				grid-template-rows: 50px 40px;
			}

			&-search {
				display: flex;
				grid-area: s;

				&-input {
					height: 27px;
					width: 194px;
					border-radius: 5px;
					border: none;
					background-color: #fff;
					padding: 0 30px 0 5px;

					&:hover, &:active, &:focus {
						outline: none;
						background-color: #fff;
					}

					@include mobile {
						width: 261px;
					}
				}
				&-search_icon {
					width: 17px;
					height: 17px;
					margin: auto 0 auto -23px;
				}
			}

			&-toggle_view {
				display: flex;
				grid-area: c;
				width: 68px;
				justify-content: space-between;
				margin-left: 26px;

				@include mobile {
					margin: 14px auto 0;
					height: 40px;
					align-items: center;
				}

				&-grid, &-list {
					width: 25px;
					height: 25px;

					&:hover {
						cursor: pointer;
					}
				}

				// &-grid {
				// 	// margin-left: 21px;
				// 	// padding: 4px;
				// }

				// &-list {
				// 	// margin-left: 18px;
				// }
				
			}
		}
	}

</style>