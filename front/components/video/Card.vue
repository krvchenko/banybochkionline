<template>
	<div class="video-card"
		@click="handleClick"
		@mouseover="hover = true"
		@mouseleave="hover = false"
	>
		<div class="video-card__wrap">
			<nuxt-img
				class="video-card__preview"
				:src="youtubeImg"
				:alt="title"
				width="480px"
				height="360px"
				decoding="async"
				loading="lazy"
				format="webp"
			/>
			<svg-icon
				:class="[
					'video-card__icon',
					hover && 'video-card__icon_hover'
				]"
				icon="youtube"
				:width="54"
				:height="48"
			/>
			<h2 class="video__title">{{ title }}</h2>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Card',

	components: {},

	props: {
		title: {
			type: String,
			required: true
		},
		code: {
			type: String,
			required: true
		},
	},

	computed: {
		youtubeUrl() {
			return `https://www.youtube.com/watch?v=${this.code}`
		},
		youtubeImg() {
			return `https://img.youtube.com/vi/${this.code}/hqdefault.jpg`
		},
	},

	mounted() {
		this.lightbox = this.$glightbox({
			elements: [{
				href: this.youtubeUrl
			}],
			autoplayVideos: true,
		})
	},

	data: () => ({
		lightbox: null,
		hover: false
	}),

	methods: {
		handleClick() {
			this.lightbox.open()
		}
	},
}
</script>
<style lang="scss">
	.video-card {
		cursor: pointer;
		width: 100%;
		max-width: 480px;
		&__icon {
			fill: white;
			position: absolute;
			font-size: 48px;
			z-index: 3;
			color: #fff;
			top: 50%;
			left: 50%;
			transform: translate3d(-50%,-50%,0);
			opacity: .76;
			&_hover {
				fill: red;
				opacity: 1;
			}
		}
		&__wrap {
			display: block;
			height: 240px;
			overflow: hidden;
			position: relative;
			max-width: 100%;
			&:before {
				background: linear-gradient(180deg,transparent 61.98%,rgba(0,0,0,.32));
				content: '';
				height: 100%;
				position: absolute;
				width: 100%;
				z-index: 2;
			}
		}
		&__preview {
			width: auto;
			height: auto;
			position: absolute;
			top: 50%;
			transform: translate3d(-50%,-50%,0);
			left: 50%;
			z-index: 1;
		}
	}
</style>