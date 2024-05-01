<template>
	<header class="quiz-page__header">
		<a class="quiz-page__logo" href="https://banybochkionline.ru/" title="Бани бочки онлайн">
			<img src="~/assets/i/quiz/quiz-logo.svg" alt="Бани бочки онлайн">
		</a>
		<span class="quiz-page__text">Напрямую с завода в Вологде <br> по всей России</span>
	</header>
</template>

<script>

export default {

	components: {

	},

	props: {

	},

	created() {

	},

	data: () => ({

	}),

	computed: {

	},

	watch: {

	},

	methods: {

	}
}
</script>

<style lang="scss" scoped>
	.quiz-page {
		&__header {
			padding: 15px 0;
			display: flex;
			align-items: center;
			@include mq('tablet') {
				padding: 15px;
			}
		}
		&__logo {
			display: block;
			margin-right: 15px;
		}
		&__text {
			color: #888;
			line-height: 16px;
			font-size: 14px;
			font-family: Proxima Nova Sb;
		}
	}
</style>