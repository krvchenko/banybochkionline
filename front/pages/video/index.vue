<template>
	<div class="videos">
		<div class="container videos__container">
			<!-- Content -->
			<main class="videos__content">
				<!-- Header -->
				<header class="videos__header">
					<h1 class="videos__title">Видео</h1>
				</header>
				<!-- Body -->
				<lazy-hydrate when-visible>
					<div class="videos__list">
						<video-card
							v-for="(item, index) in videos"
							:key="index"
							:title="item.title"
							:code="item.code"
						/>
					</div>
				</lazy-hydrate>
			</main>
		</div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import VideoCard from '~/components/video/Card'

export default {
	components: {
		LazyHydrate,
		VideoCard
	},

	layout: 'default',

	middleware: [
		async({ store, params }) => {
			await store.dispatch('video/fetchVideos')
		}
	],

	head() {
		return {
			title: `Наши видео | Бани бочки под ключ по всей России`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `Видео обзоры бань-бочек`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `бани бочки под ключ`
				},
				{
					name: 'og:title',
					content: `Наши видео | Бани бочки под ключ по всей России`
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
			videos: 'video/videos',
		}),
		breadcrumbs() {
			return [
				{
					title: 'Видео',
					url: '/video',
				},
			]
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
	.videos {
		&__content {
			overflow: hidden;
		}
		&__list {
			margin-bottom: 30px;
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
		&__title {
			margin: 0 0 30px 0;
			font-weight: 700;
			font-size: 32px;
			line-height: 32px;
			@include mq('tablet') {
				margin: 30px 0;
			}
		}
	}
</style>