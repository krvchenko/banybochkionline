<template>
	<nav
		class="menu-main"
		@click="handleMenuItemClick"
	>
		<div class="container menu-main__container">	
			<ul class="menu-main__list">
				<slot />
			</ul>
			<slot name="footer" />
		</div>
	</nav>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Menu',

	components: {},

	props: {},

	computed: {
		...mapGetters({}),
	},

	mounted() {},

	data: () => ({}),

	methods: {
		handleMenuItemClick() {
			// console.log('test');
			this.$store.dispatch('menu/setOpened', false)
		}
	},
}
</script>

<style lang="scss">
	.menu-main {
		margin: 0;
		background: #efeeec;
		@include mq('tablet') {
			position: absolute;
			width: 100%;
			left: 0;
			z-index: 100;
		}
		&__container {
			@include mq('tablet') {
				padding: 10px 15px;
			}
		}
		&__list {
			margin: 0;
			padding: 0;
			display: flex;
			overflow: scroll;
			@include hide-scroll;
			@include mq('tablet') {
				flex-flow: column;
			}
		}

		&__social {
			padding: 10px 0;
			display: flex;
			align-items: center;
		}

		&__btn-social {
			margin-right: 10px;
		}
	}
</style>