<template>
	<div class="faq">
		<div class="container faq__container">
			<!-- Content -->
			<main class="faq__content">
				<article>
					<!-- Header -->
					<header class="faq__header">
						<h1 class="faq__title">Вопрос-ответ</h1>
					</header>
				</article>

				<section>

					<collapse-list>
						<collapse-item
							v-for="(item, index) in faqs"
							:key="index"
							:title="item.question"
							:text="item.answer"
						>
						</collapse-item>
					</collapse-list>
				</section>
			</main>
		</div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'

import CollapseList from '~/components/CollapseList'
import CollapseItem from '~/components/CollapseItem'

export default {
	components: {
		LazyHydrate,
		CollapseList,
		CollapseItem
	},

	layout: 'default',

	middleware: [
		async({ store }) => await store.dispatch('faq/fetchFaqs')
	],

	head() {
		return {
			title: `Вопрос-ответ - banybochkionline.ru`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `Ответы на часто задаваемые вопросы о банях бочках. Информация о выборе, уходе и эксплуатации бань.`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `вопрос, ответ, faq`
				},
				{
					name: 'og:title',
					content: `Вопрос-ответ - banybochkionline.ru`
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
			faqs: 'faq/faqs'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Вопрос-ответ',
					url: '/faq',
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

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.faq {
		&__content {
			overflow: hidden;
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