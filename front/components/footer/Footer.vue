<template>
	<footer
		class="footer"
		itemscope=""
		itemtype="http://schema.org/Organization"
	>
		<span
			itemprop="name"
			:style="{
				display: 'none'
			}"
		>
			ООО «Бани бочки онлайн»
		</span>

		<div class="container footer__container">
			<div
				class="footer__info"
				itemprop="address"
				itemscope=""
				itemtype="http://schema.org/PostalAddress"
			>
				<nuxt-link
					v-slot="{ href, route, navigate, isActive, isExactActive }"
					to="/"
				>
					<a
						class="footer__logo"
						:href="href"
						@click="navigate"
					>
						<img
							width="80px"
							height="46px"
							class="logo__img"
							src="~/assets/i/logo.svg"
							alt="Бани бочки онлайн"
						>
					</a>
				</nuxt-link>
				<small class="footer__address">
					<span itemprop="addressLocality">Вологда</span>,
					<span itemprop="postalCode">160002</span>,
					<span itemprop="streetAddress">Вологодская Слобода, 4</span>
				</small>
				<small class="footer__phone" itemprop="telephone" href="tel:+79215396303">8 800 222 42 61</small>
				<small class="footer__copy">© 2014 - 2022 ООО «Бани бочки онлайн». Все права защищены.</small>
				<small class="footer__requisites">ОГРН 1183525001098. ИНН 3507313856.</small>
			</div>
			<div class="footer__nav">
				<nav class="footer-nav">
					<ul class="footer-nav__list">
						<li
							class="footer-nav__item"
							v-for="(item, index) in menu"
							:key="index"
						>
							<nuxt-link
								v-slot="{ href, route, navigate, isActive, isExactActive }"
								:to="item.route"
							>
								<a
									class="footer-nav__link"
									:href="href"
									@click="navigate"
								>
									{{ item.name }}
								</a>
							</nuxt-link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</footer>
</template>
<script>
export default {
	components: {},

	props: {},

	computed: {

	},

	mounted() {},

	data: () => ({
		menu: [
			{
				name: 'Проекты',
				route: 'projects'
			},
			{
				name: 'Наши работы',
				route: 'objects'
			},
			{
				name: 'Виртуальные туры',
				route: 'tour'
			},
			{
				name: 'О компании',
				route: 'about'
			},
			{
				name: 'Отзывы',
				route: 'reviews'
			},
			{
				name: 'Контакты',
				route: 'contacts'
			},
			{
				name: 'Соглашение об использовании персональных данных',
				route: 'policy'
			},
		]
	}),

	methods: {},
}
</script>
<style lang="scss">
	.footer {
		background: #efeeec;
		&__container {
			grid-column-gap: 28px;
			grid-row-gap: 28px;
			display: grid;
			grid-template-areas:
				'info nav';
			grid-template-columns: 4fr 7fr;
			align-items: start;
			@include mq('tablet') {
				grid-template-areas:
					'nav' 'info';
				grid-template-columns: 100%;
				grid-column-gap: 0;
				grid-row-gap: 0;
			}
		}
		&__info {
			grid-area: info;
		}
		&__nav {
			grid-area: nav;
		}
		&__logo {
			display: inline-flex;
			padding: 25px 0 10px;
		}
		&__address {
			display: block;
			margin-bottom: 5px;
			color: #777;
		}
		&__phone {
			display: block;
			margin-bottom: 5px;
			color: #777;
		}
		&__copy {
			display: block;
			margin-bottom: 5px;
			color: #777;
		}
		&__requisites {
			display: block;
			padding-bottom: 25px;
			color: #777;
		}
	}

	.footer-nav {
		&__list {
			padding: 25px 0 0 0;
			margin: 0;
			list-style: none;
		}
		&__item {
			margin-right: 10px;
			display: inline-block;
			vertical-align: top;
			&:last-child {
				margin: 0;
			}
		}
		&__link {
			color: #807f1b;
			text-decoration: underline;
			&:hover {
				color: #807f1b;
				text-decoration: none;
			}
		}
	}
</style>