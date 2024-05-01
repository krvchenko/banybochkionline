<template>
	<client-only>
		<div :class="[
			'slider',
			navigation && 'slider_nav'
		]">
			<figure
				v-if="showMain"
				class="slider__main"
			>
				<nuxt-img
					:src="`${mediaUrl}/imgcache/object/${items[0].filename}`"
					:alt="title"
					width="760px"
					height="480px"
					decoding="async"
					loading="lazy"
					@click="handleSlideClick(0)"
					format="webp"
				/>
			</figure>
			<carousel
				:class="[
					'slider__carousel',
					navigation && 'slider__carousel_nav',
				]"
				:navigation-enabled="navigation"
				:pagination-enabled="pagination"
				navigation-next-label=""
				navigation-prev-label=""
				pagination-color="#d4d3d3"
				pagination-active-color="#807f1b"
				:pagination-padding="5"
				:per-page-custom="perPage"
			>
				<slide
					:class="[
						'slider__item',
						navigation && 'slider__item_nav',
						index === slideActive && 'slider__item_active'
					]"
					v-for="(item, index) in items.filter((img, i) => {
						return showMain ? i !== 0 : true
					})"
					:key="index"
					@slideclick="handleSlideClick(showMain ? index + 1 : index)"
				>
					<nuxt-img
						:width="width"
						:height="height"
						class="slider__img"
						:src="`${mediaUrl}/${prefix}/${galleryStyle}/${item.filename}`"
						:alt="`${title} фото ${index + 1}`"
						decoding="async"
						loading="lazy"
					/>
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
		title: {
			type: String,
		},
		showMain: {
			type: Boolean,
			default: false
		},
		glightbox: {
			type: Boolean,
			default: true
		},
		navigation: {
			type: Boolean,
			default: false
		},
		pagination: {
			type: Boolean,
			default: true
		},
		slideActive: {
			type: Number,
			default: 0
		},
		prefix: {
			type: String,
			default: 'imgcache'
		},
		lightboxStyle: {
			type: String,
			default: 'product-lightbox'
		},
		galleryStyle: {
			type: String,
			default: 'product-gallery'
		},
		perPage: {
			type: Array,
			default() {
				return [
					[0, 1],
					[375, 2],
					[480, 3],
					[768, 4],
					[992, 4]
				]
			}
		},
		width: {
			type: String,
			default: '225px'
		},
		height: {
			type: String,
			default: '142px'
		},
	},

	computed: {
		mediaUrl() {
			return this.$config.urls.back
		},
		lightbox() {
			return this.items.map(item => {
				return {
					href: `${this.mediaUrl}/${this.prefix}/${this.lightboxStyle}/${item.filename}`
				}
			})
		}
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
		gallery: null
	}),

	methods: {
		handleSlideClick(index) {
			if (this.glightbox) {
				this.gallery.openAt(index)
			}
			this.$emit('click', index)
		}
	},
}
</script>
<style lang="scss">
	$ico-slider-arrow: url('~assets/i/ico-slider-arrow.svg?data');
	.slider {
		min-height: 134px;
		overflow: hidden;
		margin-bottom: 15px;
		&__main {
			cursor: pointer;
			img {
				display: block;
				width: 100%;
				height: auto;
			}
		}
		&__carousel {
			margin: 0 -10px;
			&_nav {
				margin: 0;
				.VueCarousel-wrapper {
					padding: 0 50px;
				}
				.slider__item {
					img {
						border: 3px solid transparent;
					}
				}
				.slider__item_active {
					img {
						border: 3px solid #807f1b;
					}
				}
			}
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
				background-color: #999949;
				&:hover {
					background-color: #807e1b;
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