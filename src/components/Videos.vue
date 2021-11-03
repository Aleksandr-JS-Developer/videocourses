<template>
	<section class="videos">
		<div
			class="videos-contain"
			v-if="!videosDataLoading"

			:class="{grid: videosView === 'grid', list: videosView === 'list'}"
		>
			<div
				v-for="(video, i) in videosData"
				:key="i"

				class="videos-video_item"
			>
				
				<img
					:src="video.covers.main"
					alt="video_image"
					class="videos-video_item-img"
				>
				<div
					class="videos-video_item-added"
				>
					<p class="videos-video_item-added-title">
						{{ video.title }}
					</p>
					<button
						class="videos-video_item-added-bttn"
						:class="{outline: video.access, filled: !video.access}"
					>
						<p
							class="videos-video_item-added-bttn-text"
						>
							{{ video.access ? 'Дивитися' : 'Придбати' }}
						</p>
						<div class="videos-video_item-added-bttn-icon_wrapper">
							<img
								src="@/assets/icons/right-thin-chevron.svg"
								alt=">"
								class="videos-video_item-added-bttn-icon"
							>
						</div>
						
					</button>
				</div>
			</div>
		</div>
		<div
			class="videos-loader"
			v-else
		>
			Loading
		</div>
	</section>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
	name: 'Videos',
	computed: {
		...mapGetters(['videosData', 'videosDataLoading', 'videosView'])
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/index.scss';

	.videos {
		grid-area: videos;
		width: 100%;
		padding-bottom: 128px;

		display: grid;

		// grid-template-columns: repeat(9, 1fr);
		// grid-gap: $global-sizes-grid_gap;

		

		&-contain {
			display: grid;
			// grid-template-columns: repeat(3, 1fr);
			grid-gap: $global-sizes-grid_gap;
			    
			&.grid {
				grid-template-columns: repeat(3, 1fr);
			}

			&.list {
				grid-template-columns: 1fr;
				justify-items: center;
				margin: 0;
			}

			@include mobile {
				margin-top: 40px;
			}
		}

		&-video_item {
			width: 271px;
			background-color: #fff;
			border-radius: 0 0 10px 10px;

			&-img {
				max-width: 100%;
			}

			&-added {
				padding: 0 14px 10px 14px;
				margin-top: -5px;
				border: 1px solid #c7c7c7;
				border-radius: 0 0 10px 10px;

				display: flex;
				flex-direction: column;
				justify-content: center;

				&-title {
					color: #232323;
					font-size: 16px;
					min-height: 55px;
				}

				&-bttn {
					padding-right: 30px;
					position: relative;

					&.outline {
						@include actionBttn('outline');
					}

					&.filled {
						@include actionBttn('filled');
					}

					&-icon_wrapper {
						width: 35px;
    					height: 34px;
    					background-color: $global-colors-pink;
   						border-radius: 17px;
						display: flex;
						justify-content: center;
						align-items: center;
						position: absolute;
						right: -1px;
						top: -1px;
					}

					&-icon {
						width: 12px;
						height: 16px;
					}

					&-text {
						margin: 0;
						padding-top: 4px;
						font-size: 14px;
						font-weight: bold;
						text-transform: uppercase;
						display: flex;
						align-items: center;
						justify-content: center;
					}
					
					
					margin: 0 auto;
				}
			}

		}
	}

</style>