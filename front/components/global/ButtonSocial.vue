<template>
	<a
		:class="[
			'btn-social',
			`btn-social_${type}`
		]"
		:href="href"
		:title="type"
		target="_blank"
		rel="noreferrer"
	>
		<svg-icon
			class="btn-social__icon"
			:height="16"
			:icon="type"
			fill="#fff"
		/>
	</a>
</template>
<script>
export default {
	name: 'ButtonSocial',

	components: {},

	props: {
		type: {
			type: String,
			required: true,
		}
	},

	computed: {
		href() {
			return (
				(this.type === 'vk' && 'https://vk.com/banybochkionline') ||
				(this.type === 'odnoklassniki' && 'https://ok.ru/profile/571694624868') ||
				(this.type === 'youtube' && 'https://youtube.com/channel/UCUimG245Ll7MB5m8-mSv2cQ') ||
				(this.type === 'instagram' && 'https://instagram.com/banybochkionline/')
			)
		}
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss" scoped>
.btn-social {
	display: block;
	width: 36px;
	height: 36px;
	border-radius: 50%;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 36px;
	&_vk {
		background: #45668e;
	}
	&_odnoklassniki {
		background: #ed812b;
	}
	&_youtube {
		background: red;
	}
	&_instagram {
		background: radial-gradient(circle farthest-corner at 35% 90%,#fec564,transparent 50%),radial-gradient(circle farthest-corner at 0 140%,#fec564,transparent 50%),radial-gradient(ellipse farthest-corner at 0 -25%,#5258cf,transparent 50%),radial-gradient(ellipse farthest-corner at 20% -50%,#5258cf,transparent 50%),radial-gradient(ellipse farthest-corner at 100% 0,#893dc2,transparent 50%),radial-gradient(ellipse farthest-corner at 60% -20%,#893dc2,transparent 50%),radial-gradient(ellipse farthest-corner at 100% 100%,#d9317a,transparent),linear-gradient(#6559ca,#bc318f 30%,#e33f5f 50%,#f77638 70%,#fec66d);
	}
	&__icon {

	}
}
</style>