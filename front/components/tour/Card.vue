<template>
	<div class="tour-card" @click="$emit('click')">
		<div
			class="tour-card__img-wrap"
		>
			<nuxt-img
				class="tour-card__img"
				width="400px"
				height="266px"
				:src="img"
				:alt="title"
				decoding="async"
				:loading="index === 0 ? 'eager' : 'lazy'"
				format="webp"
			/>
		</div>
		<div
			class="tour-card__title"
		>
			{{ title }}
		</div>

		<div class="tour-card__footer">
			<div class="tour-card__price"><span>{{ priceFormatted }}</span> руб</div>
			<div
				:class="[
					'btn btn-md btn-block btn-primary tour-card__more',
					isMobile && 'btn-lg'
				]"
			>Смотреть тур</div>
		</div>
		<slot />
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
		image: {
			type: Object,
			required: true,
		},
		tour: {
			type: String,
			required: true,
		},
		price: {
			type: [String, Number],
			required: true,
		},
	},

	computed: {
		...mapGetters({
			isMobile: 'responsive/isMobile',
			isTablet: 'responsive/isTablet'
		}),
		img() {
			return `https://api.banybochkionline.ru/imgcache/object-list/${this.image.filename}`
		},
		priceFormatted() {
			return new Intl.NumberFormat('ru-RU').format(this.price)
		},
	},

	mounted() {
		if (this.glightbox) {
			this.gallery = this.$glightbox({
				elements: this.lightbox,
				autoplayVideos: true,
			})
		}
	},

	data: () => ({
		gallery: null,
	}),

	methods: {
		handleLoadTour() {

		}
	},
}
</script>
<style lang="scss">
	.tour-card {
		max-width: 400px;
		width: 100%;
		cursor: pointer;
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
			margin-bottom: 10px;
			color: #464646;
			text-decoration: none;
			text-transform: capitalize;
			font-weight: 700;
			font-size: 18px;
		}
		&__icon {
			margin-right: 5px;
		}
		&__location {
			display: flex;
			align-items: center;
			flex-flow: wrap;
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