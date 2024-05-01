<template>
	<div class="main-products">
		<div class="container">
			<h2 class="main-products__title">Наша продукция</h2>
			<div class="main-products__list">
				<nuxt-link
					v-for="(item, index) in items"
					:key="index"
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					to="/projects"
				>
					<a
						class="main-products__item"
						:href="href"
						@click="navigate"
					>
						<img
							class="main-products__item-img"
							width="250px"
							height="230px"
							:src="require(`~/assets/images/${item.img}`)"
							:alt="item.title"
							decoding="async"
							loading="lazy"
						>
						<div class="main-products__item-title">{{ item.title }}</div>
					</a>
				</nuxt-link>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Products',

	components: {},

	props: {},

	computed: {
		...mapGetters({}),
	},

	mounted() {},

	data: () => ({
		items: [
			{
				title: 'Бани бочки',
				img: 'bochki.webp'
			},
			{
				title: 'Бани квадро бочки',
				img: 'quadro.webp'
			},
			{
				title: 'Купели',
				img: 'kupel.webp'
			},
		],
	}),

	methods: {},
}
</script>
<style lang="scss">
	.main-products {
		&__title {
			text-align: center;
			margin: 30px 0;
			text-transform: uppercase;
			letter-spacing: 1.5px;
			font-weight: 700;
		}
		&__list {
			grid-column-gap: 28px;
			grid-row-gap: 28px;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: end;
			@include mq('tablet') {
				grid-template-columns: 1fr;
				grid-column-gap: 0;
			}
		}
		&__item {
			text-decoration: none;
			&:hover,
			&:active,
			&:focus {
				text-decoration: none;
			}
			&-img {
				margin: 0 auto;
				display: block;
				max-width: 100%;
				height: auto;
			}
			&-title {
				text-align: center;
				color: #464646;
				text-decoration: none;
				font-weight: 700;
				margin-bottom: 10px;
				text-transform: uppercase;
				letter-spacing: 1px;
				font-size: 18px;
			}
		}
	}
</style>