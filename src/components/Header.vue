<template>
	<header class="header">
		<div class="header-burger_menu">
			<button
				class="header-burger_menu-bttn"
				@click="toggleSidebar"
			>
				<img
					src="@/assets/icons/menu.png"
					alt="menu"
					class="header-burger_menu-bttn-icon"
				>
				<div class="header-burger_menu-bttn-text">
					МЕНЮ
				</div>
			</button>
		</div>
	</header>
</template>

<script>
import {mapActions} from 'vuex';

export default {
	name: 'Header',
	methods: {
		...mapActions(['toggleSidebar'])
	}
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/index.scss';

	.header {
		height: 45px;
		background-color: $global-colors-header_background;

		&-burger_menu {
			display: none;
			color: #fff;
			width: 100%;
			height: 100%;
			padding: 15px;
			align-items: center;
			justify-content: flex-end;

			@include mobile {
				display: flex;
				flex-direction: row;
			}

			&-bttn {
				display: flex;
				border-radius: 17px;
				border: 1px solid #fff;
				background-color: transparent;
				color: #fff;
				padding: 12px;
				justify-content: center;
				align-items: center;

				height: 34px;

				&-icon {
					width: 11px;
					height: 10px;
				}

				&-text {
					margin-left: 5px;
					font-size: 14;
				}
			}

			&-text {
				color: #fff;
			}
		}

		@include mobile {
			height: 100px;
		}
	}

</style>