<template>
	<client-only>
		<div class="product-slider">
			<carousel
				class="product-slider__carousel"
				:navigation-enabled="false"
				:pagination-enabled="true"
				pagination-color="#d4d3d3"
				pagination-active-color="#807f1b"
				:per-page-custom="[[0, 1], [375, 2], [480, 3], [768, 3], [992, 4]]"
			>
				<slide
					class="product-slider__item"
					v-for="(item, index) in items"
					:key="index"
					@slideclick="handleSlideClick(index)"
				>
					<img
						width="225px"
						height="142px"
						class="product-slider__img"
						:src="`${mediaUrl}/imgcache/product-gallery/${item.filename}`"
						:alt="`${productTitle} фото ${index + 1}`"
						decoding="async"
						loading="lazy"
					>
				</slide>
			</carousel>
		</div>
	</client-only>
</template>
<script>
export default {
	name: 'Slider',

	components: {
		Carousel: () => import('/node_modules/vue-carousel/src/Carousel'),
		Slide: () => import('/node_modules/vue-carousel/src/Slide'),
	},

	props: {
		items: {
			type: Array,
			required: true
		},

		productTitle: {
			type: String,
		}
	},

	computed: {
		mediaUrl() {
			return this.$config.urls.back
		},
		lightbox() {
			return this.items.map(item => {
				return {
					href: `${this.mediaUrl}/imgcache/product-lightbox/${item.filename}`
				}
			})
		}
	},

	mounted() {
		this.gallery = this.$glightbox({
			elements: this.lightbox,
			autoplayVideos: true,
		})
	},

	data: () => ({
		gallery: null
	}),

	methods: {
		handleSlideClick(index) {
			this.gallery.openAt(index)
		}
	},
}
</script>
<style lang="scss">
	$ico-slider-arrow: url('~assets/i/ico-slider-arrow.svg?data');
	.product-slider {
		min-height: 142px;
		overflow: hidden;
		margin-bottom: 15px;
		&__carousel {
			margin: 0 -10px;
		}
		&__img {
			width: 100%;
			height: auto;
		}
		&__item {
			padding: 0 10px;
			cursor: pointer;
		}

		.VueCarousel-pagination {
			.VueCarousel-dot-container {
				margin-top: 10px!important;
				.VueCarousel-dot {
					margin: 0!important;
					&:focus {
						outline: none;
					}
				}
			}
		}

		.VueCarousel-navigation {
			.VueCarousel-navigation-button {
				padding: 0!important;
				margin: 0!important;
				top: 0;
				opacity: 1;
				height: 100%;
				width: 40px;
				transform: none;
				border: none;
				background-color: rgba(128,127,27, .8);
				&:hover {
					background-color: rgba(128,127,27, .9);
				}
			}
			.VueCarousel-navigation-prev {
				left: 0px;
				background-image: $ico-slider-arrow;
				background-repeat: no-repeat;
				background-position: center;
			}
			.VueCarousel-navigation-next {
				right: 0px;
				transform: rotate(180deg);
				background-image: $ico-slider-arrow;
				background-repeat: no-repeat;
				background-position: center;
			}
		}
	}
</style>