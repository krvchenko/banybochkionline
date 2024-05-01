<template>
	<div class="products">
		<!-- <breadcrumbs title="Проекты" /> -->
		<product-header/>
		<div class="container products__list">
			<product-card
				v-for="item in products"
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
		<lazy-hydrate when-visible>
			<projects-disclaimer />
		</lazy-hydrate>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import ProductHeader from '~/components/product/Header'
import ProductCard from '~/components/product/Card'
import ProjectsDisclaimer from '~/components/ProjectsDisclaimer'

export default {
	components: {
		LazyHydrate,
		ProductHeader,
		ProductCard,
		ProjectsDisclaimer,
		// MainMap: () => import('~/components/main/Map'),
	},

	layout: 'default',

	middleware: [
		async({ store, route, redirect }) => {
			if (route.params.category) {
				return redirect(`/${route.params.category}`)
			}

			await store.dispatch('product/fetchProducts', { params: route.params })
		}
	],

	head() {
		return {
			title: 'Наши проекты | Бани бочки под ключ',
			titleTemplate: '%s',
			meta: [
				{ hid : 'description', name: 'description', content: 'Проекты бань бочек, бань квадро и купелей' },
				{ hid : 'keywords', name: 'keywords', content: 'бани' },
				{ name: 'og:title', content: 'бани-бочки, бани квадро, бани бочки, под ключ' },
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.fullPath}` }
			]
		}
	},

	props: {},

	computed: {
		...mapGetters({
			products: 'product/products'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Проекты',
					url: this.$route.fullPath,
				},
			]
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

	async asyncData({ params, store }) {
		if (process.client) {
			store.dispatch('product/fetchProducts', { params: params })
		}
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.products {
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