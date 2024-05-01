<template>
	<div class="tour">
		<div class="container tour__container">
			<!-- Content -->
			<main class="tour__content">
				<article class="tour__article">
					<!-- Header -->
					<header class="tour__header">
						<h1 class="tour__title">Виртуальные туры по баням-бочкам</h1>
					</header>
					<!-- Body -->
					<section class="tour__list">
						<tour-card
							v-for="(item, index) in tours"
							:key="index"
							:title="item.title"
							:slug="item.slug"
							:price="item.price"
							:image="item.image"
							:tour="item.virtual_tour"
							@click="handleClick(index)"
						>
						</tour-card>
					</section>
				</article>
			</main>
		</div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import Slider from '~/components/Slider'
import TourCard from '~/components/tour/Card'

export default {
	components: {
		LazyHydrate,
		Slider,
		TourCard
	},

	layout: 'default',

	middleware: [
		async({ store, params }) => {
			await store.dispatch('product/fetchTours')
		}
	],

	head() {
		return {
			title: `Виртуальные туры | Бани бочки онлайн`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `Виртуальные туры бань бочек`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `бани бочки под ключ`
				},
				{
					name: 'og:title',
					content: `Виртуальные туры | Бани бочки онлайн`
				},
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.path}` }
			]
		}
	},

	props: {},

	computed: {
		...mapGetters({
			tours: 'product/tours',
		}),
		breadcrumbs() {
			return [
				{
					title: 'Виртуальные туры',
					url: '/tour',
				},
			]
		},
		mediaUrl() {
			return this.$config.urls.back
		},
	},

	mounted() {
		this.gallery = this.$glightbox({
			elements: this.tours.map((item, index) => {
				return {
					href: item.virtual_tour
				}
			}),
			autoplayVideos: true,
		})
	},

	watch: {
		breadcrumbs: {
			immediate: true,
			handler(val) {
				this.$store.commit('breadcrumbs/SET_BREADCRUMBS', val)
			}
		}
	},

	data: () => ({
		gallery: null,
	}),

	methods: {
		handleContactsClick() {
			this.$store.dispatch('modal/setContacts', true)
		},
		handleSlideClick(index) {
			this.slideActive = index
		},
		handleClick(index) {
			console.log(index)
			this.gallery.openAt(index)
		},
	},
}
</script>
<style lang="scss">
	.tour {
		&__content {
			overflow: hidden;
		}
		&__box {
			min-height: 640px;
			@include mq('mobile') {
				min-height: 320px;
			}
			iframe {
				width: 100%;
				height: 640px;
				display: block;
				margin-bottom: 30px;
			}
		}
		&__title {
			margin: 0 0 30px 0;
			font-weight: 700;
			font-size: 32px;
			line-height: 32px;
			@include mq('tablet') {
				margin: 30px 0;
			}
		}
		&__list {
			margin-bottom: 28px;
			grid-column-gap: 28px;
			grid-row-gap: 28px;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			@include mq('laptop') {
				grid-template-columns: repeat(2, 1fr);
			}
			@include mq('mobile') {
				grid-template-columns: repeat(1, 1fr);
				justify-items: center;
			}
		}
	}
</style>