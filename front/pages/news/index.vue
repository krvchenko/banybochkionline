<template>
	<div class="posts">
		<div class="container posts__container">
			<h1 class="posts__title">Новости компании</h1>
			<div class="posts__list">
				<post-card
					v-for="(item, index) in posts"
					:key="index"
					:index="index"
					:title="item.title"
					:slug="item.slug"
					:announce="item.announce"
					:date="item.created_at"
					:image="item.image"
				/>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
import PostCard from '~/components/post/Card'

export default {
	components: {
		LazyHydrate,
		PostCard,
	},

	layout: 'default',

	middleware: [
		async({ store }) => await store.dispatch('post/fetchPosts')
	],

	head() {
		return {
			title: `Новости компании | Бани Бочки Онлайн`,
			titleTemplate: '%s',
			meta: [
				{ hid : 'description', name: 'description', content: 'Новости нашей компании Бани Бочки Онлайн' },
				{ hid : 'keywords', name: 'keywords', content: 'бани-бочки, новости' },
				{ name: 'og:title', content: `Новости компании | Бани Бочки Онлайн` },
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.path}` }
			]
		}
	},

	props: {},

	computed: {
		...mapGetters({
			posts: 'post/posts'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Новости',
					url: this.$route.fullPath,
				}
			]
		}
	},

	mounted() {},

	data: () => ({}),

	watch: {
		breadcrumbs: {
			immediate: true,
			handler(val) {
				this.$store.commit('breadcrumbs/SET_BREADCRUMBS', val)
			}
		},
	},

	methods: {

	},
}
</script>
<style lang="scss">
	.posts {
		&__title {
			margin: 10px 0 30px;
			font-weight: 700;
			font-size: 32px;
			line-height: 24px;
			@include mq('tablet') {
				margin: 30px 0;
			}
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
	}
</style>