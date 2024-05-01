<template>
	<div class="main-slider"
		:style="{
			backgroundImage: `url(${require('~/assets/images/front-top-img.webp')})`
		}"
	>
		<div class="container main-slider__container">
			<h1 class="main-slider__title">Баня бочка напрямую от производителя</h1>
			<div class="main-slider__text">Бани Бочки Онлайн работаем по всей России</div>
			<nuxt-link
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				to="/projects"
			>
				<a
					class="btn btn-outline-light main-slider__btn"
					:href="href"
					@click="navigate"
				>
					Смотреть каталог
				</a>
			</nuxt-link>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	name: 'MainSlider',

	components: {},

	props: {},

	computed: {
		...mapGetters({}),
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.main-slider {
		position: relative;
		height: 550px;
		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
		display: flex;
		align-items: center;
		&:before {
			z-index: 10;
			left: 0;
			top: 0;
			display: block;
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			background: radial-gradient(ellipse at center,hsla(0,0%,100%,0) 0,rgba(0,0,2,.41) 100%);
		}
		&__container {
			z-index: 20;
			position: relative;
		}
		&__title {
			text-align: center;
			margin-bottom: 30px;
			color: #fff;
			text-transform: uppercase;
			font-weight: 700;
			max-width: 600px;
			padding: 27px 10px;
			letter-spacing: 1px;
			font-size: 32px;
			line-height: 40px;
			text-shadow: 1px 1px 2px rgb(0 0 0 / 40%);
			background: rgba(128,127,27,.7);
		}
		&__text {
			text-align: center;
			font-size: 24px;
			text-shadow: 1px 1px 2px #000;
			margin-bottom: 30px;
			color: #fff;
			text-transform: uppercase;
			font-weight: 700;
		}

		&__btn {
			white-space: nowrap;
			max-width: 100%;
			width: 200px;
			margin: 0 auto;
			display: block;
			color: #fff;
			border: 2px solid #fff;
			border-radius: 3px;
			font-size: 20px;
			letter-spacing: .5px;
		}
	}
</style>