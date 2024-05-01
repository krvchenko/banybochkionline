<template>
	<div class="contacts">
		<div class="container contacts__container test">
			<!-- Content -->
			<main class="contacts__content">
				<section class="contacts__body">
					<contacts-info class="contacts__contacts-info" />
					<contacts-form class="contacts__contacts-form">
						<template #header>
							<h2 style="text-align: center; margin-top: 0; line-height: 28px;">Бесплатная консультация</h2>
							<div style="text-align: center; margin-bottom: 10px;">Заполните форму и мы перезвоним Вам совершенно бесплатно!</div>
						</template>
					</contacts-form>
				</section>
			</main>
		</div>

		<div v-if="!isMobile" class="contacts__map">
			<contacts-map />
		</div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
import ContactsMap from '~/components/contacts/Map'
import ContactsInfo from '~/components/contacts/Info'
import ContactsForm from '~/components/ContactsForm'

export default {
	components: {
		LazyHydrate,
		ContactsMap,
		ContactsInfo,
		ContactsForm
	},

	layout: 'default',

	middleware: [],

	head() {
		return {
			title: `Контакты компании - banybochkionline.ru`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `Свяжитесь с нами, чтобы узнать больше о наших банях в бочках. Адрес, телефон и электронная почта для быстрой связи.`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `контакты, бани бочки`
				},
				{
					name: 'og:title',
					content: `Контакты компании - banybochkionline.ru`
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
			isMobile: 'responsive/isMobile'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Контакты',
					url: '/contacts',
				},
			]
		},
	},

	mounted() {},

	watch: {
		breadcrumbs: {
			immediate: true,
			handler(val) {
				this.$store.commit('breadcrumbs/SET_BREADCRUMBS', val)
			}
		}
	},

	data: () => ({
	}),

	methods: {},
}
</script>
<style lang="scss">
	.contacts {
		position: relative;
		padding: 30px 0;
		@include mq('tablet') {
			padding: 0;
		}
		&__container {
			position: relative;
			overflow: hidden;
		}
		&__body {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			flex-flow: wrap;
		}
		&__contacts-info {
			margin-right: 15px;
			max-width: 520px;
			z-index: 2;
			position: relative;
			@include mq('laptop') {
				margin: 0 0 30px 0;
				max-width: 100%;
				width: 100%;
			}
			@include mq('tablet') {
				margin: 0;
			}
		}
		&__contacts-form {
			margin-left: 15px;
			max-width: 400px;
			z-index: 10;
			padding: 30px;
			background: #fff;
			z-index: 2;
			position: relative;
			@include mq('laptop') {
				margin: 0;
				max-width: 100%;
				width: 100%;
			}
			@include mq('tablet') {
				padding: 30px 0;
			}
		}
	}
</style>