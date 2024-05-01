<template>
	<header class="header">
		<div class="container header__container">
			<div class="header__wrap">
				<div class="logo header__logo">
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						to="/"
					>
						<a
							class="logo__link"
							:href="href"
							@click="navigate"
						>
							<img
								width="118px"
								height="70px"
								class="logo__img"
								src="~/assets/i/logo.svg"
								alt="Бани бочки онлайн"
							>
						</a>
					</nuxt-link>
					<span class="logo__text">Напрямую с завода в Вологде по всей России</span>
				</div>
				<div
					v-if="isTablet || isDesktop"
					class="social header__social"
				>
					<button-social
						v-for="item in socials"
						:key="item"
						:type="item"
						class="header__btn-social"
					/>
				</div>
				<div
					class="header-contacts"
				>
					<a
						href="tel:88002224261"
						class="header-contacts__phone"
					>
						8 800 222 42 61
						<!-- 8 921 539 63 03 -->
					</a>
					<small class="header-contacts__info">Звонок бесплатный</small>
					<button
						v-if="isTablet || isDesktop"
						class="btn btn-primary btn-block header-contacts__btn"
						@click.prevent="handleContactClick"
					>
						Обратный звонок
					</button>
				</div>

				<button
					v-if="isMobile"
					class="menu-toggle header__menu-toggle"
					@click="handleMenuClick"
				>
					<svg-icon
						class=""
						:width="23"
						:height="26"
						icon="bars"
						fill="#888"
					/>
				</button>
			</div>
		</div>
		<transition name="slide">
			<menu-main
				v-show="!isMobile || menuOpened"
				class="header__menu-main"

			>
				<menu-main-item
					v-for="item in menuItems"
					:key="item.route"
					:name="item.name"
					:route="item.route"
				/>

				<template v-if="isMobile" #footer>
					<div
						class="social menu-main__social"
					>
						<button-social
							v-for="item in socials"
							:key="item"
							:type="item"
							class="menu-main__btn-social"
						/>
					</div>
				</template>
			</menu-main>
		</transition>
	</header>
</template>
<script>
import { mapGetters } from 'vuex'
import MenuMain from '~/components/menu/Menu'
import MenuMainItem from '~/components/menu/MenuItem'

export default {
	name: 'Header',

	components: {
		MenuMain,
		MenuMainItem
	},

	props: {},

	computed: {
		...mapGetters({
			isReady: 'responsive/isReady',
			isMobile: 'responsive/isMobile',
			isTablet: 'responsive/isTablet',
			isDesktop: 'responsive/isDesktop',
			menuOpened: 'menu/opened'
		}),
	},

	mounted() {},

	data: () => ({
		// menuShow: false,
		socials: [
			'vk',
			'instagram',
			'odnoklassniki',
			'youtube'
		],
		menuItems: [
			{
				name: 'Проекты',
				route: '/projects'
			},
			{
				name: 'Наши работы',
				route: '/objects'
			},
			{
				name: 'Виртуальные туры',
				route: '/tour'
			},
			{
				name: 'Видео',
				route: '/video'
			},
			{
				name: 'Доставка и оплата',
				route: '/delivery'
			},
			{
				name: 'Вопрос-ответ',
				route: '/faq'
			},
			{
				name: 'Новости',
				route: '/news'
			},
			{
				name: 'О компании',
				route: '/about'
			},
			{
				name: 'Отзывы',
				route: '/reviews'
			},
			{
				name: 'Контакты',
				route: '/contacts'
			},
		],
	}),

	methods: {
		handleContactClick() {
			this.$store.dispatch('modal/setContacts', {
				open: true,
			})
		},
		handleMenuClick() {
			this.$store.dispatch('menu/setOpened', !this.menuOpened)
		}
	},
}
</script>
<style lang="scss">
.header {
	background: #fff;
	position: sticky;
	top: 0;
	z-index: 110;
	box-shadow: 0 8px 30px rgb(0, 0, 0, .15);
	@include noize-bg;
	&__container {
		padding: 10px 15px;
		@include mq('tablet') {
			padding: 15px;
		}
	}
	&__wrap {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	&__social {
		display: flex;
		align-items: center;
		align-self: end;
		margin: 0 25px 0 auto;
		// @include mq('tablet') {
		// 	display: none;
		// }
	}
	&__btn-social {
		margin-right: 5px;
	}

	&__menu-toggle {
		width: 48px;
		height: 46px;
		padding: 10px 15px 10px 10px;
		border: none;
		background: none;
		outline: none;
		margin-right: -15px;
		&:hover,
		&:active,
		&:focus {
			border: none;
			outline: none;
		}
	}

	&-contacts {
		text-align: right;
		align-self: end;
		@include mq('tablet') {
			margin-left: auto;
			margin-right: 10px;
			align-self: center;
		}
		&__phone {
			// margin-bottom: 10px;
			display: block;
			color: #333;
			text-decoration: none;
			font-size: 20px;
			font-weight: 700;
			@include mq('tablet') {
				font-size: 18px;
				line-height: 20px;
			}
			&:hover,
			&:active,
			&:focus {
				color: #333;
				text-decoration: none;
			}
		}

		&__info {
			line-height: normal;
			display: block;
			margin-bottom: 10px;
			@include mq('tablet') {
				margin-bottom: 0;
			}
		}

		&__btn {
			font-weight: bold;
		}
	}
}

.logo {
	&__link {
		max-width: 118px;
		// margin-top: 16px;
		display: block;
	}
	&__img {
		display: block;
		@include mq('tablet') {
			width: 80px;
			height: 48px;
		}
	}
	&__text {
		display: block;
		margin-top: 13px;
		color: #888;
		font-size: 12px;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-weight: 700;
		@include mq('tablet') {
			display: none;
		}
	}
}
</style>