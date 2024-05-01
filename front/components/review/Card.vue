<template>
	<div class="review-card">
		<nuxt-link
			class="review-card__link"
			:to="url"
			custom
		>
			<nuxt-img
				class="review-card__img"
				width="400px"
				height="266px"
				:src="img"
				:alt="title"
				decoding="async"
				:loading="index === 0 ? 'eager' : 'lazy'"
				format="webp"
			/>
			<h2 class="review-card__title">{{ title }}</h2>
		</nuxt-link>
		<div class="review-card__date">{{ date }}</div>
	</div>
</template>
<script>
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
		date: {
			type: String,
		}
	},

	computed: {
		mediaUrl() {
			return this.$config.urls.back
		},
		img() {
			return `${this.mediaUrl}/imgcache/object-list/${this.image.filename}`
		},
		url() {
			return `/reviews/${this.slug}`
		}
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.review-card {
		width: 100%;
		max-width: 480px;
		&__link {
			text-decoration: none;
			display: block;
			&:hover,
			&:visited,
			&:active,
			&:focus {
				text-decoration: none;
			}
		}
		&__img {
			display: block;
			width: 100%;
			height: auto;
		}
		&__title {
			text-decoration: none;
			text-transform: capitalize;
			display: block;
			margin-bottom: 10px;
			line-height: 20px;
			color: #464646;
			font-weight: 700;
			font-size: 18px;
		}
		&__date {
			font-size: 14px;
			line-height: normal;
		}
	}
</style>