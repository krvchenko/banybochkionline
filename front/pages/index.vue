<template>
	<div class="main-page">
		<div class="main-page__top">
			<main-slider />
			<lazy-hydrate>
				<main-products />
			</lazy-hydrate>
			<lazy-hydrate on-interaction="click">
				<main-delivery />
			</lazy-hydrate>
			<lazy-hydrate>
				<main-advantages />
			</lazy-hydrate>
			<div class="main-text">
				<div class="container">
					<h2 class="main-text__title">Почему мы?</h2>
					<p>Наша компания предлагаем вам лучшие бани бочки, купели и множество других решений для вашего здоровья и комфорта.</p>
					<ul>
						<li>Прямые поставки от производителя. Мы - завод по производству бань бочек, что означает, что вы получаете надежные и качественные изделия без посредников.</li>
						<li>Широкий ассортимент. У нас вы найдете разные размеры и конфигурации, чтобы выбрать идеальное решение под ваши потребности.</li>
						<li>Доставка по Москве и области. Мы готовы доставить вашу баню бочку прямо к вам, гарантируя безопасность и надежность доставки.</li>
						<li>Гарантированное качество. Все наши изделия проходят строгий контроль качества, чтобы убедиться, что они прослужат вам долгие годы.</li>
						<li>Опыт и профессионализм. Мы на рынке уже долгие годы и знаем, как сделать вашу баню бочку действительно уникальной и комфортной.</li>
					</ul>

					<p>Сделайте правильный выбор – выберите бани бочки от производителя. У нас есть все, что нужно для создания вашего идеального уголка релакса. Наши изделия - это гарантированный способ наслаждаться здоровьем и уютом каждый день.</p>

					<p>Закажите вашу баню бочку прямо сейчас на нашем сайте, и начните новую главу в своей жизни полную комфорта и удовольствия!</p>	
				</div>
			</div>
			<div class="main-objects" ref="objects">
				<div class="main-objects__title">География работ</div>
				<lazy-hydrate>
					<main-map v-if="showMap" :placemarks="placemarks" />
				</lazy-hydrate>
			</div>
		</div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import MainSlider from '~/components/main/Slider'
import MainProducts from '~/components/main/Products'
import MainDelivery from '~/components/main/Delivery'
import MainAdvantages from '~/components/main/Advantages'

export default {
	components: {
		LazyHydrate,
		MainSlider,
		MainProducts,
		MainDelivery,
		MainAdvantages,
		MainMap: () => import('~/components/main/Map'),
	},

	layout: 'default',

	middleware: [
		// async({ store, $axios }) => await $axios.get('/v1/products').then(res => {
		// 	console.log(res)
		// }),
	],

	head() {
		return {
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}` }
			]
		}
	},

	props: {},

	computed: {
		...mapGetters({}),
	},

	mounted() {
		window.addEventListener('scroll', this.handleShowMap)
		this.$store.commit('breadcrumbs/SET_BREADCRUMBS', [])
	},

	data: () => ({
		showMap: false,
		placemarks: [],
	}),

	methods: {
		handleShowMap() {
			const offsetTop = this.$refs.objects.offsetTop

			if (window.pageYOffset + window.innerHeight >= offsetTop - 300) {
				window.removeEventListener('scroll', this.handleShowMap)
				this.getObjects()
			}
		},

		async getObjects() {
			await this.$axios.get('/v1/objects/map')
			.then(res => {
				this.placemarks = res.data
				this.showMap = true
			})
			.catch(e => {})
		}
	},
}
</script>
<style lang="scss">
	.main-text {
		ul {
			list-style: none;
			li {
				&:before {
					content: "\2022";  /* Add content: \2022 is the CSS Code/unicode for a bullet */
					color: #807e00; /* Change the color */
					font-weight: bold; /* If you want it to be bold */
					display: inline-block; /* Needed to add space between the bullet and the text */
					width: 1em; /* Also needed for space (tweak if needed) */
					margin-left: -1em; /* Also needed for space (tweak if needed) */
				}
			}
		}
		&__title {
			margin-bottom: 30px;
			margin-top: 30px;
			text-align: center;
			text-transform: uppercase;
			letter-spacing: 1px;
			font-weight: 700;
			font-size: 28px;
		}
	}
	.main-page {

	}
	.main-objects {
		// height: 500px;
		&__title {
			font-size: 28px;
			margin-bottom: 30px;
			margin-top: 30px;
			text-align: center;
			text-transform: uppercase;
			letter-spacing: 1px;
			font-weight: 700;
		}
	}
</style>