<template>
	<footer class="footer"></footer>
</template>

<script>

export default {
	name: 'Footer'
}

</script>

<style lang="scss" scoped>
	@import '@/assets/scss/index.scss';

	.footer {
		grid-area: footer;
		height: 240px;

		background-color: $global-colors-footer_background;
	}

</style>