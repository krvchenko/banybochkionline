<template>
	<div class="review">
		<div class="container review__container">
			<!-- Content -->
			<main>
				<article class="review__article">
					<!-- Header -->
					<section class="review__content">
						<header class="review__header">
							<h1 class="review__title">{{ review.title }}</h1>
							<figure
								class="review__figure"
							>
								<nuxt-img
									class="review__img"
									:src="`${mediaUrl}/imgcache/object/${review.image.filename}`"
									:alt="review.title"
									width="760px"
									height="480px"
									decoding="async"
									loading="lazy"
									format="webp"
									@click="handleSlideClick"
								/>
							</figure>
						</header>
						<!-- Body -->
						<section class="review__body">
							<blockquote cite="" class="review__quote">
								<p>{{ review.description }}</p>
								<p class="review__meta">
									<small>{{ review.title }}</small>
									<small>{{ review.created_at }}</small>
								</p>
							</blockquote>

							<div class="review__actions">
								<button
									:class="[
										'btn btn-primary review__contacts',
										isMobile && 'btn-lg'
									]"
									@click="handleContactsClick"
								>Узнать стоимость проекта</button>
							</div>
						</section>
					</section>
					<!-- Aside -->
					<lazy-hydrate when-visible>
						<aside class="review__aside">
							<h2 class="review__aside-title">Наши проекты</h2>
							<product-related>
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
							</product-related>
						</aside>
					</lazy-hydrate>
				</article>
			</main>
		</div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import ProductCard from '~/components/product/Card'
import ProductRelated from '~/components/product/Related'

export default {
	components: {
		LazyHydrate,
		ProductCard,
		ProductRelated
	},

	layout: 'default',

	middleware: [
		async({ store, params }) => {
			await store.dispatch('review/fetchReview', params)
		}
	],

	head() {
		return {
			title: `${this.review.title} | Отзывы | Бани Бочки Онлайн`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `${this.review.title}`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `${this.review.title.toLowerCase()}`
				},
				{
					name: 'og:title',
					content: `${this.review.title} | Отзывы | Бани Бочки Онлайн`
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
			review: 'review/review',
			products: 'review/products',
			isMobile: 'responsive/isMobile'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Отзывы',
					url: '/reviews',
				},
				{
					title: this.review.title,
					url: this.$route.fullPath,
				},
			]
		},
		mediaUrl() {
			return this.$config.urls.back
		},
	},

	mounted() {
		this.lightbox = this.$glightbox({
			elements: [
				{
					href: `${this.mediaUrl}/imgcache/object-lightbox/${this.review.image.filename}`
				}
			],
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
		lightbox: null,
	}),

	methods: {
		handleContactsClick() {
			this.$store.dispatch('modal/setContacts', {
				open: true
			})
		},

		handleSlideClick() {
			this.lightbox.open()
		}
	},
}
</script>
<style lang="scss">
	.review {
		&__article {
			grid-column-gap: 28px;
			display: grid;
			grid-template-areas:
				'content aside';
			grid-template-columns: minmax(0, 8fr) 4fr;
			@include mq('laptop') {
				grid-template-areas:
					'content'
					'aside';
				grid-template-columns: repeat(1, 1fr);
			}
		}
		&__figure {
			margin-bottom: 30px;
		}
		&__footer {
			display: flex;
			align-items: center;
		}
		&__content {
			margin-bottom: 30px;
			grid-area: content;
		}
		&__body {
			font-size: 16px;
		}
		&__actions {
			text-align: center;
		}
		&__contacts {
			font-weight: 700;
		}
		&__quote {
			margin: 0 0 20px;
			padding-top: 0;
			padding: 0 0 0 20px;
			border-left: 5px solid #807f1b;
			font-style: italic;
			font-size: 18px;
		}
		&__meta {
			text-align: right;
			small {
				display: block;
				font-size: 80%;
				color: #777;
				&:before {
					content: '\2014 \00A0';
				}
			}
		}
		&__aside {
			overflow: hidden;
			margin-bottom: 30px;
			grid-area: aside;
			&-title {
				margin: 0 0 30px;
				line-height: 32px;
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
		&__img {
			display: block;
			cursor: pointer;
			width: 100%;
			height: auto;
		}
	}
</style>