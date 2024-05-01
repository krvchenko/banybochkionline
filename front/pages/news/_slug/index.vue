<template>
	<div class="post">
		<div class="container post__container">
			<!-- Content -->
			<main>
				<article class="post__article">
					<!-- Header -->
					<section class="post__content">
						<header class="post__header">
							<h1 class="post__title">{{ post.title }}</h1>
							<figure
								class="post__figure"
							>
								<nuxt-img
									class="post__img"
									:src="`${mediaUrl}/uploads/post/${post.image.filename}`"
									:alt="post.title"
									width="760px"
									height="480px"
									decoding="async"
									loading="lazy"
									format="webp"
								/>
							</figure>
						</header>
						<!-- Body -->
						<section class="post__body" v-html="post.body"></section>
						<div v-if="post.promo_url" class="post-promo">
							<a :href="post.promo_url" class="post-promo__link">Наши проекты</a>
						</div>
						<lazy-hydrate when-visible>
							<footer class="post__footer">
								<script src="https://yastatic.net/share2/share.js"></script>
								<div class="ya-share2" data-curtain data-services="vkontakte,odnoklassniki,telegram"></div>
								<small class="post__date">{{ post.created_at }}</small>
							</footer>
						</lazy-hydrate>
					</section>
					<!-- Aside -->
					<lazy-hydrate when-visible>
						<aside class="post__aside">
							<h2 class="post__aside-title">Наши проекты</h2>
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
			await store.dispatch('post/fetchPost', params)
		}
	],

	head() {
		return {
			title: this.post.meta_title ? this.post.title : `${this.post.title} | Бани Бочки Онлайн`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: this.post.meta_description ? this.post.meta_description : `${this.post.title}`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `${this.post.title.toLowerCase()}`
				},
				{
					name: 'og:title',
					content: `${this.post.title} | Бани Бочки Онлайн`
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
			post: 'post/post',
			products: 'post/products',
		}),
		breadcrumbs() {
			return [
				{
					title: 'Новости компании',
					url: '/news',
				},
				{
					title: this.post.title,
					url: this.$route.fullPath,
				},
			]
		},
		mediaUrl() {
			return this.$config.urls.back
		},
	},

	mounted() {

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
			this.$store.dispatch('modal/setContacts', true)
		},
	},
}
</script>
<style lang="scss">
	.post {
		&-promo {
			margin-bottom: 30px;
			position: relative;
			width: 100%;
			min-height: 224px;
			background: url('~assets/images/promo-url-bg.jpg') no-repeat center;
			&__link {
				position: absolute;
			    width: 100%;
			    height: 100%;
			    text-decoration: none;
			    text-align: center;
			    line-height: 224px;
			    color: #fff;
			    font-weight: bold;
			    font-size: 38px;
			    &:hover,
			    &:active,
			    &:focus,
			    &:visited {
			    	color: #fff;
			    	text-decoration: none!important;
			    }
			}
		}
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
		&__footer {
			display: flex;
			align-items: center;
		}
		&__date {
			margin-left: 10px;
			align-items: center;
		}
		&__content {
			margin-bottom: 30px;
			grid-area: content;
		}
		&__body {
			font-size: 16px;
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
			width: 100%;
			height: auto;
		}
	}
</style>