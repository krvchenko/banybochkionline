<template>
	<div class="products">
		<product-header :title="category.title">
			<product-filters :categories="category.childrens" />
		</product-header>

		<div class="container products__list">
			<product-card
				v-for="item in category.products"
				:key="item.id"
				:title="item.title"
				:slug="item.slug"
				:category="item.category"
				:image="item.image"
				:price="item.price"
				:length="item.total_length"
				:steam_length="item.steam_room_length"
			/>
		</div>

		<div
			v-if="category.description"
			class="container products__description"
			v-html="category.description">
		</div>

		<lazy-hydrate when-visible>
			<projects-disclaimer />
		</lazy-hydrate>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import ProductHeader from '~/components/product/Header'
import ProductFilters from '~/components/product/Filters'
import ProductCard from '~/components/product/Card'
import ProjectsDisclaimer from '~/components/ProjectsDisclaimer'

export default {
	components: {
		LazyHydrate,
		ProductHeader,
		ProductFilters,
		ProductCard,
		ProjectsDisclaimer,
		// MainMap: () => import('~/components/main/Map'),
	},

	layout: 'default',

	middleware: [
		async({ store, route }) => {
			await store.dispatch('product/fetchCategory', route.params)
		}
	],

	head() {
		return {
			title: this.category.meta_title,
			titleTemplate: '%s',
			meta: [
				{ hid : 'description', name: 'description', content: this.category.meta_description },
				{ hid : 'keywords', name: 'keywords', content: this.category.meta_keywords },
				{ name: 'og:title', content: this.category.meta_title },
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.path}` }
			]
		}
	},

	computed: {
		...mapGetters({
			category: 'product/category'
		}),
		breadcrumbs() {

			let items = []

			if (this.category.parent) {
				items.push({
					title: this.category.parent.title,
					url: `/${this.category.parent.slug}`,
				})
			}

			if (this.category) {
				items.push({
					title: this.category.title,
					url: this.$route.fullPath,
				})
			}

			return items
		}
	},

	watch: {
		breadcrumbs: {
			immediate: true,
			handler(val) {
				this.$store.commit('breadcrumbs/SET_BREADCRUMBS', val)
			}
		}
	},

	mounted() {
		console.log('sdfsdfsdf')
	},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.products {
		&__description {
			margin-bottom: 28px;

			h2 {
				font-size: 24px;
			}

			p {
				&:last-child {
					margin: 0;
				}
			}

			ul {
				list-style: none;
				li {
					&:before {
						content: "\2022";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
						color: #807e00; /* Change the color */
						font-weight: bold; /* If you want it to be bold */
						display: inline-block; /* Needed to add space between the bullet and the text */
						width: 1em; /* Also needed for space (tweak if needed) */
						margin-left: -1em; /* Also needed for space (tweak if needed) */
					}
				}
			}
		}
		&__list {
			padding: 28px 15px;
			grid-column-gap: 28px;
			grid-row-gap: 28px;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			@include mq('laptop') {
				grid-template-columns: repeat(2, 1fr);
			}
			@include mq('tablet') {
				grid-template-columns: repeat(1, 1fr);
				justify-items: center;
			}
		}
	}
</style>