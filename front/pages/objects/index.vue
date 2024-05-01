<template>
	<div class="objects">
		<div class="container objects__container">
			<h1 class="objects__title">Наши работы</h1>
			<div class="objects__list">
				<object-card
					v-for="(item, index) in objects.data"
					:key="index"
					:title="item.title"
					:slug="item.slug"
					:image="item.image"
					:location="item.location"
				/>
			</div>
			<pagination
				class="objects__pagination"
				:last="objects.last_page"
				:current="objects.current_page"
				:prev-url="objects.prev_page_url"
				:next-url="objects.next_page_url"
				:total="objects.total"
				:from="objects.from"
				:to="objects.to"
				url="/objects"
			/>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
import ObjectCard from '~/components/object/Card'
import Pagination from '~/components/Pagination'

export default {
	components: {
		LazyHydrate,
		ObjectCard,
		Pagination
	},

	layout: 'default',

	middleware: [
		async({ store, $axios, query }) => await store.dispatch('object/fetchObjects', query)
	],

	head() {
		return {
			title: `Примеры наших работ - banybochkionline.ru${this.objects.current_page === 1 ? '' : ' | Страница ' + this.objects.current_page}`,
			titleTemplate: '%s',
			meta: [
				{ hid : 'description', name: 'description', content: 'Посмотрите наши лучшие проекты по строительству деревянных бань и бочек. Вдохновляйтесь нашими работами и выбирайте идеальное решение для своего участка.' },
				{ hid : 'keywords', name: 'keywords', content: 'бани-бочки, наши работы' },
				{ name: 'og:title', content: `Примеры наших работ - banybochkionline.ru | Страница ${this.objects.current_page}` },
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.path}` }
			]
		}
	},

	props: {},

	computed: {
		...mapGetters({
			objects: 'object/objects'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Наши работы',
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
	.objects {
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
	}
</style>