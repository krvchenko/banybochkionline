<template>
	<div class="main-delivery">
		<h2 class="main-delivery__title">Доставка и оплата</h2>
		<div class="container main-delivery__container">
			<ul class="main-delivery__list">
				<li class="main-delivery__item">
					Вы <a class="main-delivery__action" href="tel:88002224261">звоните</a> или оставляете <span class="main-delivery__action" @click="handleContactClick">заявку</span> на нашем сайте.
				</li>
				<li class="main-delivery__item">
					Мы с вами связывемся и обговариваем все условия и детали. Заключаем договор и вы оставляете предоплату 10 000р.
				</li>
				<li class="main-delivery__item">
					Мы изготавливаем выбранную вами баню-бочку, если такой нет в наличии, 2 недели.
				</li>
				<li class="main-delivery__item">
					Если все устраивает, мы привозим баню-бочку вам на участок. Мы устанавливаем и проверяем баню на месте. Подписываем акт приема-передачи бани и только после этого вы оплачиваете оставшиеся 90%.
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Delivery',

	components: {},

	props: {},

	computed: {},

	mounted() {},

	data: () => ({}),

	methods: {
		handleContactClick() {
			this.$store.dispatch('modal/setContacts', {
				open: true
			})
		}
	},
}
</script>
<style lang="scss">
	.main-delivery {
		&__title {
			margin-bottom: 30px;
			margin-top: 30px;
			text-align: center;
			text-transform: uppercase;
			letter-spacing: 1px;
			font-weight: 700;
			font-size: 28px;
		}
		&__container {
			max-width: 510px;
		}
		&__list {
			margin: 0;
			padding: 0;
			list-style: none;
		}
		&__item {
			position: relative;
			display: block;
			margin-bottom: 30px;
			padding-left: 40px;
			line-height: 30px;
			&:before {
				left: 0;
				position: absolute;
				margin-right: 10px;
				width: 30px;
				height: 30px;
				display: block;
				content: '';
				border-radius: 50%;
				border: 2px solid #efeeec;
				color: #807f1b;
				text-align: center;
				font-weight: 700;
				line-height: 26px;
			}
			&:nth-child(1) {
				&:before {
					content: '1';
				}
			}
			&:nth-child(2) {
				&:before {
					content: '2';
				}
			}
			&:nth-child(3) {
				&:before {
					content: '3';
				}
			}
			&:nth-child(4) {
				&:before {
					content: '4';
				}
			}
		}
		&__action {
			text-decoration: none;
			cursor: pointer;
			color: #807f1b;
			text-decoration: none;
			border-bottom: 1px dashed #807f1b;
			&:hover,
			&:active,
			&:focus {
				color: #807f1b;
				text-decoration: none;
				border-bottom: 1px dashed #807f1b;
			}
		}
	}
</style>