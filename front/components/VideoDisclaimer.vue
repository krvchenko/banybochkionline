<template>
	<div class="video-disclaimer" role="alert">
		<div class="container video-disclaimer__container">
			<div class="video-disclaimer__icon-container">
				<svg-icon
					class="video-disclaimer__icon"
					icon="youtube"
					fill="#fff"
					:width="36"
					:height="32"
				/>
			</div>
			<div class="video-disclaimer__info">
				<h4 class="video-disclaimer__title">Новый раздел «Видео»</h4>
				<small class="video-disclaimer__text">«Видео» дает возможность увидеть наши бани изнутри</small>
			</div>

			<nuxt-link
				v-slot="{ href, route, navigate, isActive, isExactActive }"
				to="/video"
			>
				<a
					class="btn btn-outline-light video-disclaimer__btn"
					:href="href"
					@click="navigate"
				>
					Смотреть видео
				</a>
			</nuxt-link>

			<span class="video-disclaimer__close"
				@click="handleClose"
			>
				<svg-icon
					icon="times-circle"
					fill="#fff"
					:width="21"
					:height="21"
				/>
			</span>
		</div>
	</div>
</template>
<script>
import {
	mapGetters,
	mapMutations,
	mapActions,
} from 'vuex'
export default {
	name: 'VideoDisclaimer',

	components: {},

	props: {},

	computed: {
		...mapGetters({}),
	},

	mounted() {},

	data: () => ({}),

	methods: {
		handleClose() {
			console.log('test');
			this.$emit('close', true)
		}
	},
}
</script>
<style lang="scss">
	.video-disclaimer {
		background: #54362f;
		&__container {
			padding: 15px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		&__icon {
			&-container {
				margin-right: 25px;
				min-width: 36px;
				min-height: 32px;
				@include mq('tablet') {
					display: none;
				}
			}
		}
		&__info {
			margin-right: auto;
		}
		&__title {
			color: #fff;
			margin: 0 10px 0 0;
			font-weight: 400;
			letter-spacing: 0;
			text-transform: none;
			line-height: 20px;
			font-size: 20px;
		}
		&__text {
			color: #fff;
			letter-spacing: .3px;
			font-size: 14px;
			@include mq('tablet') {
				display: none;
			}
		}

		&__btn {
			white-space: nowrap;
		}

		&__close {
			margin-left: 20px;
			min-width: 25px;
			min-height: 25px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0;
		}
	}
</style>