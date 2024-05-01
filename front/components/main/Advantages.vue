<template>
	<div
		class="main-advantages"
		:style="{
			backgroundImage: `url(${require('~/assets/images/advantages-bg.webp')})`
		}"
	>
		<h2 class="main-advantages__title">Наши преимущества</h2>
		<div class="container">
			<ul class="main-advantages__list">
				<li
					v-for="(item, index) in items"
					:key="index"
					class="main-advantage"
				>
					<div class="main-advantage__icon">
						<img
							class="main-advantage__img"
							:src="require(`~/assets/images/${item.icon}`)"
							:alt="item.title"
							width="92px"
							height="92px"
							decoding="async"
							loading="lazy"
						>
					</div>
					<h3 class="main-advantage__title">{{ item.title }}</h3>
					<p class="main-advantage__description">{{ item.text }}</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Advantages',

	components: {},

	props: {},

	computed: {},

	mounted() {},

	data: () => ({
		items: [
			{
				title: 'Корпус бани',
				text: 'Только еловая просушенная до 10-12% доска, 0-1 сорта, толщиной 45мм',
				icon: 'advantage1.webp',
			},
			{
				title: 'Электрика в подарок',
				text: 'Электрика и освещение в подарок',
				icon: 'advantage2.webp',
			},
			{
				title: 'Бак на 55 л.',
				text: 'Входит в стандартную комплектацию',
				icon: 'advantage3.webp',
			},
			{
				title: 'Индивидуально',
				text: 'любые размеры, комплектация и расположение перегородок',
				icon: 'advantage4.webp',
			},
		]
	}),

	methods: {

	},
}
</script>
<style lang="scss">
	.main-advantages {
		min-height: 360px;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background-position: bottom;
		@include mq('tablet') {
			background-attachment: initial;
			background-position: center;
		}
		&__title {
			text-shadow: 1px 1px 2px #000;
			color: #fff;
			margin: 0;
			padding: 30px 0;
			text-align: center;
			text-transform: uppercase;
			letter-spacing: 1.5px;
			font-weight: 700;
			font-size: 28px;
		}
		&__list {
			list-style-type: none;
			margin: 0;
			padding: 0;
			grid-column-gap: 18px;
			grid-row-gap: 28px;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			align-items: end;
			@include mq('tablet') {
				grid-template-columns: 1fr;
				grid-column-gap: 0;
			}
		}
	}

	.main-advantage {
		padding: 10px;
		margin: 34px auto;
		max-width: 185px;
		height: 190px;
		text-align: center;
		background: #fff;
		&__icon {

		}
		&__img {
			margin-top: -46px;
		}
		&__title {
			margin: 10px 0;
			font-weight: 700;
			font-size: 16px;
			line-height: 16px;
		}
		&__description {
			margin-bottom: 0;
			font-size: 16px;
			line-height: 20px;
		}
	}
</style>