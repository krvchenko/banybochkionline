<template>
	<div class="object-card">
		<nuxt-link
			class="object-card__img-wrap"
			:to="url"
		>
			<nuxt-img
				class="object-card__img"
				width="400px"
				height="266px"
				:src="img"
				:alt="title"
				decoding="async"
				:loading="index === 0 ? 'eager' : 'lazy'"
				format="webp"
			/>
		</nuxt-link>
		<nuxt-link
			class="object-card__title"
			:to="url"
		>
			{{ title }}
		</nuxt-link>
		<div class="object-card__location">
			<svg-icon
				class="object-card__icon"
				icon="map-marker"
				fill="#807f1b"
				:width="12"
				:height="16"
			/> {{ location }}</div>
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
		location: {
			type: String,
		},
	},

	computed: {
		mediaUrl() {
			return process.env.BACK_URL
		},
		img() {
			return `https://api.banybochkionline.ru/imgcache/object-list/${this.image.filename}`
		},
		url() {
			return `/objects/${this.slug}`
		}
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.object-card {
		max-width: 400px;
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
	}
</style>