<template>
	<div class="product-card">
		<nuxt-link
			class="product-card__img-wrap"
			:to="url"
		>
			<nuxt-img
				class="product-card__img"
				width="400px"
				height="266px"
				:src="img"
				:alt="fullTitle"
				decoding="async"
				:loading="index === 0 ? 'eager' : 'lazy'"
				format="webp"
				:placeholder="[400, 266, 1]"
			/>
		</nuxt-link>
		<nuxt-link
			class="product-card__title"
			:to="url"
		>
			{{ fullTitle }}
		</nuxt-link>
		<div class="product-card__description">
			<div>Общая длина: <span>{{ length }}см</span></div>
			<div>Длина парной: <span>{{ steam_length }}см</span></div>
		</div>
		<div class="product-card__footer">
			<div class="product-card__price"><span>{{ priceFormatted }}</span> руб</div>
			<nuxt-link
				:class="[
					'btn btn-md btn-block btn-primary product-card__more',
					isMobile && 'btn-lg'
				]"
				:to="url"
			>Подробнее</nuxt-link>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	name: 'Card',

	components: {},

	props: {
		index: {
			type: [String, Number]
		},	
		title: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		category: {
			type: Object,
			required: true,
		},
		image: {
			type: Object,
			required: true,
		},
		price: {
			type: [String, Number],
			required: true,
		},
		length: {
			type: [String, Number],
			required: true,
		},
		steam_length: {
			type: [String, Number],
			required: true,
		},
	},

	computed: {
		...mapGetters({
			isMobile: 'responsive/isMobile',
			isTablet: 'responsive/isTablet'
		}),
		mediaUrl() {
			return process.env.BACK_URL
		},
		img() {
			return `https://api.banybochkionline.ru/imgcache/product-list/${this.image.filename}`
		},
		url() {
			return `/projects/${this.category.slug}/${this.slug}`
		},
		fullTitle() {
			return `${this.category.nominative} ${this.title}`
		},
		priceFormatted() {
			return new Intl.NumberFormat('ru-RU').format(this.price)
		},
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.product-card {
		// max-width: 400px;
		width: 100%;
		&__img-wrap {
			display: block;
			margin-bottom: 10px;
		}
		&__img {
			// max-width: 100%;
			width: 100%;
			height: auto;
		}
		&__title {
			display: block;
			margin-bottom: 10px;
			color: #464646;
			text-decoration: none;
			font-weight: 700;
			font-size: 18px;
		}
		&__description {
			margin-bottom: 10px;
			line-height: 20px;
			div {
				span {

				}
			}
		}
		&__footer {
			display: flex;
	    align-items: center;
	    flex-flow: wrap;
	    @include mq('laptop') {
	    	align-items: start;
	    	flex-flow: column;
	    }
			@include mq('mobile') {
				flex-flow: column;
			}
		}
		&__price {
			width: 50%;
			color: #464646;
			text-decoration: none;
			font-weight: 700;
			@include mq('laptop') {
				width: 100%;
				margin-bottom: 10px;
			}
			@include mq('mobile') {
				margin-bottom: 10px;
				width: 100%;
			}
			span {
				color: #807f1b;
				font-size: 24px;
			}
		}
		&__more {
			font-weight: 700;
			width: 50%;
			max-width: 200px;
			@include mq('laptop') {
				width: 100%;
				max-width: 100%;
				margin-bottom: 10px;
			}
			@include mq('mobile') {
				width: 100%;
			}
		}
	}
</style>