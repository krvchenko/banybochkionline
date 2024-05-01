<template>
	<footer class="quiz-page__footer">
		<div class="quiz-page__docs">
			ОГРН 1183525001098<br>
			ИНН 3507313856
		</div>
		<div class="quiz-page__contact">
			<a 
				href="tel:+78002224261"
				target="_parent"
				class="quiz-page__phone"
			>
				8 800 222 42 61
			</a>
			<div class="quiz-page__legal">ООО «Бани бочки онлайн»</div>
		</div>
	</footer>
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
		&__footer {
			padding: 15px 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			@include mq('tablet') {
				padding: 15px;
			}
		}
		&__contact {
			text-align: right;
		}
		&__phone {
			color: #807f1b;
			font-weight: bold;
		}
		&__legal {
			color: #777;
			font-size: 12px;
		}
		&__docs {
			color: #777;
			font-size: 12px;
		}
	}
</style>