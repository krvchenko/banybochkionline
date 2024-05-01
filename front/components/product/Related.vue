<template>
	<div class="products-related">
		<div class="products-related__list">
			<slot />
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Related',

	components: {},

	props: {},

	computed: {
		...mapGetters({}),
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss" scoped>
.products-related {
	overflow: hidden;
	&__list {
		display: grid;
		grid-row-gap: 28px;
		@include mq('laptop') {
			grid-column-gap: 28px;
			grid-template-columns: repeat(3, 1fr);
			align-items: start;
		}
		@include mq('tablet') {
			overflow: scroll;
			display: flex;
			grid-column-gap: 0;
			@include hide-scroll();
		}
	}

	.product-card {
		max-width: 100%;
		margin-bottom: 30px;
		@include mq('tablet') {
			flex: 0 0 398px;
			max-width: 80%;
			margin-right: 30px;
			margin-bottom: 0;
			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>