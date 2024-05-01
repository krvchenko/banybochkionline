<template>
	<div class="products-header">
		<div class="container products-header__container">
			<h1 class="products-header__title">{{ title }}</h1>
<!-- 			<filters-toggle
				:active.sync="showFilters"
			/> -->
			<transition name="slide">
				<slot v-if="showFilters" />
			</transition>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import FiltersToggle from '~/components/product/FiltersToggle'
import ProductFilters from '~/components/product/Filters'

export default {
	name: 'Header',

	components: {
		FiltersToggle,
		ProductFilters
	},

	props: {
		title: {
			type: String,
			default: 'Проекты'
		}
	},

	computed: {
		...mapGetters({}),
	},

	mounted() {},

	data: () => ({
		showFilters: true,
	}),

	methods: {},
}
</script>
<style lang="scss">
	.products-header {
		@include noize-bg;
		&__container {
			padding: 30px 15px;
		}
		&__title {
			margin: 0 0 20px;
			font-weight: 700;
			font-size: 32px;
			line-height: 34px;
		}
	}
</style>