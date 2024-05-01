<template>
	<div class="reviews">
		<div class="container reviews__container">
			<h1 class="reviews__title">Отзывы</h1>
			<div class="reviews__list">
				<review-banner @click="handleBannerClick" />
				<review-card
					v-for="(item, index) in reviews.data"
					:key="index"
					:index="index"
					:title="item.title"
					:slug="item.slug"
					:image="item.image"
					:date="item.created_at"
				/>
			</div>
			<pagination
				class="reviews__pagination"
				:last="reviews.last_page"
				:current="reviews.current_page"
				:prev-url="reviews.prev_page_url"
				:next-url="reviews.next_page_url"
				:total="reviews.total"
				:from="reviews.from"
				:to="reviews.to"
				url="/reviews"
			/>
		</div>

		<lazy-hydrate when-visible>
			<div class="test">
				<div v-if="showForm" ref="form" class="reviews__form">
					<div class="container">
						<review-form />	
					</div>
				</div>
			</div>
		</lazy-hydrate>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
import ReviewCard from '~/components/review/Card'
import ReviewBanner from '~/components/review/Banner'
import ReviewForm from '~/components/review/Form'
import Pagination from '~/components/Pagination'

export default {
	components: {
		LazyHydrate,
		ReviewCard,
		ReviewBanner,
		ReviewForm,
		Pagination
	},

	layout: 'default',

	middleware: [
		async({ store, query }) => await store.dispatch('review/fetchReviews', query)
	],

	head() {
		return {
			title: `Отзывы о компании - banybochkionline.ru${this.reviews.current_page === 1 ? '' : ' | Страница '+ this.reviews.current_page}`,
			titleTemplate: '%s',
			meta: [
				{ hid : 'description', name: 'description', content: 'Отзывы о банях и бочках на сайте banybochkionline.ru. Узнайте, что говорят наши клиенты о наших услугах и продукции.' },
				{ hid : 'keywords', name: 'keywords', content: 'отзывы, бани-бочки' },
				{ name: 'og:title', content: `Отзывы о компании - banybochkionline.ru ${this.reviews.current_page}` },
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.path}` }
			]
		}
	},

	props: {},

	computed: {
		...mapGetters({
			reviews: 'review/reviews'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Отзывы',
					url: this.$route.fullPath,
				}
			]
		}
	},

	mounted() {},

	data: () => ({
		showForm: false,
	}),

	watch: {
		breadcrumbs: {
			immediate: true,
			handler(val) {
				this.$store.commit('breadcrumbs/SET_BREADCRUMBS', val)
			}
		},
	},

	methods: {
		handleBannerClick() {
			this.showForm = true

			const form = document.querySelector('.test')

			setTimeout(() => {
				form.scrollIntoView({block: 'center', behavior: 'smooth'})
			}, 100)
		}
	},
}
</script>
<style lang="scss">
	.reviews {
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
		&__pagination {
			justify-content: center;
		}
		&__form {
			@include noize-bg();
			padding: 30px 0;
		}
	}
</style>