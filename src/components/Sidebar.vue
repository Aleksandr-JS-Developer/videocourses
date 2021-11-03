<template>

	<aside class="sidebar animate__animated animate__slideInLeft"
		:class="{opened: sideBarIsOpened}"
		@click.self="setSidebar(false)"
	>
		<div class="sidebar-desktop">
			<Dropdown
				:icon="'video.svg'"
				:list="filtersList"
				:checkboxes="true"
				:opened="true"
				:title="'Відео'"

				@checked="checkedVideosFilter"
			/>

			<Dropdown
				:icon="'list2.svg'"
				:list="themesList"
				:checkboxes="false"
				:opened="true"
				:title="'Теми'"

				@checked="checkedTheme"
			/>
		</div>

		<div class="sidebar-mobile">
			<Dropdown
				:icon="'video.svg'"
				:list="filtersList"
				:checkboxes="true"
				:opened="true"
				:title="'Відео'"

				@checked="checkedVideosFilter"
			/>

			<Dropdown
				:icon="'list2.svg'"
				:list="themesList"
				:checkboxes="false"
				:opened="true"
				:title="'Теми'"

				@checked="checkedTheme"
			/>
		</div>
		<!-- <Dropdown /> -->
	</aside>

</template>

<script>
import Dropdown from '@/components/Dropdown.vue';
import {mapGetters, mapActions} from 'vuex';

export default {
	name: 'Sidebar',
	components: {
		Dropdown,
	},
	computed: {
		...mapGetters(['themesList', 'filtersList', 'sideBarIsOpened', 'device'])
	},
	methods: {
		...mapActions(['setTheme', 'toggleFilter', 'setSidebar']),
		checkedVideosFilter(item){
			this.toggleFilter(item.value);
			this.setSidebar(false);
		},
		checkedTheme(item){
			this.setTheme(item.value);
			this.setSidebar(false);
		}
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/index.scss';

	.sidebar {
		grid-area: sidebar;
		width: 100%;
		height: 100%;

		-webkit-box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.2);
		box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.2);

		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		background-color: #fff;

		&-desktop {
			padding: 20px 0;
		}

		&-mobile {
			display: none;
		}

		@include mobile {
			height: calc(100% - 100px);
			display: flex;
			position: absolute;
			top: 100px;
			left: -1000px;
			
			width: 0%;
			padding-right: calc(100% - 260px);
			
			transition: 0.5s;
			overflow: hidden;

			&.opened {
				width: 100%;
				left: 0;
				transition: 0.5s;
				background-color: rgba(0, 0, 0, .5);
			}

			&-desktop { display: none; }

			&-mobile {
    			width: 100%;
				display: flex;
				flex-direction: column;
				padding-top: 110px;
				height: 100%;
				background-color: #fff;
			}

			
		}
	}

</style>