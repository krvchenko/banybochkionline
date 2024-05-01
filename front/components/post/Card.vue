<template>
	<div class="post-card">
		<nuxt-link
			class="post-card__link"
			:to="url"
		>
			<nuxt-img
				class="post-card__img"
				width="400px"
				height="266px"
				:src="img"
				:alt="title"
				decoding="async"
				:loading="index === 0 ? 'eager' : 'lazy'"
				format="webp"
			/>
			<h2 class="post-card__title">{{ title }}</h2>
		</nuxt-link>
		<div class="post-card__anounce">{{ announce }}</div>
		<div class="post-card__date">{{ date }}</div>
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
		announce: {
			type: String,
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
			return process.env.BACK_URL
		},
		img() {
			return `https://api.banybochkionline.ru/imgcache/post-list/${this.image.filename}`
		},
		url() {
			return `/news/${this.slug}`
		}
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.post-card {
		width: 100%;
		max-width: 400px;
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
		&__anounce {
			margin-bottom: 10px;
		}
		&__date {
			font-size: 14px;
			line-height: normal;
		}
	}
</style>