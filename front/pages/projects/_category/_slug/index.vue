<template>
	<div class="product">
		<div
			itemscope
			itemtype="http://schema.org/Product"
			class="container product__container"
		>
			<!-- Content -->
			<main class="product__content">
				<article>
					<!-- Header -->
					<header class="product__header">
						<h1 itemprop="name" class="product__title">{{ fullTitle }} под ключ</h1>
						<div class="product__summary" v-html="product.description"></div>
					</header>
					<!-- Body -->
					<section>
						<figure
							v-if="product.virtual_tour && !isMobile"
						>
							<vue-friendly-iframe
								class="product__tour"
								:src="product.virtual_tour"
								@load="handleTourLoad"
							/>
						</figure>
<!-- 							<nuxt-img
								v-show="isMobile"
								width="760px"
								height="480px"
								class="product__img"
								itemprop="image"
								:src="`${mediaUrl}/imgcache/product/${product.image.filename}`"
								:alt="fullTitle"
								decoding="async"
								loading="lazy"
								format="webp"
							/> -->
						<!-- Slider -->
						<lazy-hydrate when-visible>
							<slider
								v-if="product && product.images.length"
								:items="[
									product.image,
									...product.images
								]"
								:per-page="[
									[0, 2],
									[480, 3],
									[768, 4],
									[992, 4]
								]"
								:show-main="isMobile"
								:title="fullTitle"
								:width="isMobile ? '330px' : '225px'"
								:height="isMobile ? '208px' : '142px'"
							/>
						</lazy-hydrate>
						<!-- Buttons -->
						<lazy-hydrate when-visible>
							<div class="product__buttons">
								<button
									v-if="product.virtual_tour && product.virtual_tour.length"
									:class="[
										'btn btn-outline-primary product__btn product__btn_tour',
										isMobile && 'btn-lg'
									]"
									@click="handleTourOpen"
								>
									<svg-icon
										icon="360"
										:width="27"
										:height="17"
									/>
									Виртуальный тур
								</button>
								<button
									:class="[
										'btn btn-primary product__btn product__btn_contacts',
										isMobile && 'btn-lg'
									]"
									@click="handleContactsClick"
								>
									Заказать баню
								</button>
								<div class="product__price"><span>{{ priceFormatted }}</span>₽</div>
							</div>
						</lazy-hydrate>
						<!-- Tabs -->
						<lazy-hydrate when-visible>
							<product-tab-list>
								<product-tab-item
									v-for="(item, index) in tabs"
									:key="item.name"
									:name="item.name"
									:title="item.title"
									:active="item.name === tabActive"
									@click="tabActive = $event"
								/>
							</product-tab-list>
						</lazy-hydrate>

						<lazy-hydrate when-visible>
							<product-tab-content
								v-show="tabActive === 'complectation'"
								key="complectation"
							>
								<table class="table table-hover product__table">
									<tbody>
										<tr>
											<th>#</th>
											<th>Название</th>
											<th></th>
										</tr>
										<tr v-for="(item, index) in product.rows"
											:key="`rows_${index}`"
										>
											<td>{{ index + 1 }}.</td>
											<td>{{ item.title }}</td>
											<td></td>
										</tr>
									</tbody>
								</table>
							</product-tab-content>
						</lazy-hydrate>

						<lazy-hydrate when-visible>
							<product-tab-content
								v-show="tabActive === 'params'"
								key="params"
							>
								<table class="table table-hover product__table">
									<tbody>
										<tr>
											<th>#</th>
											<th>Название</th>
											<th>Параметр</th>
										</tr>
										<tr v-for="(item, index) in productParams"
											:key="`params_${index}`"
										>
											<td>{{ index + 1 }}.</td>
											<td>{{ item.title }}</td>
											<td>{{ item.value }}</td>
										</tr>
									</tbody>
								</table>
							</product-tab-content>
						</lazy-hydrate>

						<lazy-hydrate when-visible>
						<product-tab-content
							v-show="tabActive === 'extra'"
							key="extra"
							>
								<table class="table table-hover product__table">
									<tbody>
										<tr>
											<th>#</th>
											<th>Название</th>
											<th>Стоимость</th>
										</tr>
										<tr v-for="(item, index) in product.services"
											:key="`extra_${index}`"
										>
											<td>{{ index + 1 }}.</td>
											<td>{{ item.title }}</td>
											<td>{{ item.operator }} {{ item.price }} {{ item.unit }}</td>
										</tr>
									</tbody>
								</table>
							</product-tab-content>
						</lazy-hydrate>

						<lazy-hydrate when-visible>
							<product-tab-content
								v-show="tabActive === 'delivery'"
								key="delivery"
							>
								<h3>Доставка</h3>
								<p>Мы предлагаем 2 варианта доставки:</p>
								<ul>
									<li>В готовом виде (манипулятор)</li>
									<li>Наша сборка у Вас на участке, в этом случае сборка оплачивается отдельно. Стоимость сборки составляет <b style="color: #807F1B; white-space: nowrap;">10 000 рублей.</b></li>
								</ul>
								<p>Доставка по Вологде осуществляется нашей компанией <b style="color: #807F1B; white-space: nowrap;">бесплатно.</b></p>
								<p>Рассчитать стоимость доставки в другие регионы всего за 1 минуту Вы можете по телефону нашей горячей линии <b style="color: #807F1B; white-space: nowrap;">8 921 539 63 03</b></p>
								<!-- Calc form -->
								<h3>Калькулятор стоимости доставки</h3>
								<delivery-form />
								<h3>Оплата</h3>
								<p>Оплата происходят только после заключения договора!<br>Заключение договора может проходить как в нашем офисе, так и дистанционно<br>по электронной почте, оригинал Вашего экземпляра договора всегда приезжает с баней.</p>
								<p>Предоплата после заключения договора 10% от суммы договора, полная оплата у Вас на участке после установки и проверки бани, оплата наличными денежными средствами, кредитными картами, на расчетный счет организации, а так- же в кредит. Банки партнеры Хоум Кредит, Почта банк.</p>
							</product-tab-content>
						</lazy-hydrate>
					</section>
				</article>
			</main>

			<!-- Aside -->
			<lazy-hydrate when-visible>
				<aside class="product__aside">
					<div class="product__aside-title">Похожие проекты</div>
					<product-related>
						<product-card
							v-for="item in related"
							:key="item.id"
							:title="item.title"
							:slug="item.slug"
							:category="item.category"
							:image="item.image"
							:price="item.price"
							:length="item.total_length"
							:steam_length="item.steam_room_length"
						/>
					</product-related>
				</aside>
			</lazy-hydrate>
		</div>
		<lazy-hydrate when-visible>
			<projects-disclaimer />
		</lazy-hydrate>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import ProductCard from '~/components/product/Card'
import Slider from '~/components/Slider'
import ProjectsDisclaimer from '~/components/ProjectsDisclaimer'
import ProductRelated from '~/components/product/Related'
import ProductTabList from '~/components/product/TabList'
import ProductTabItem from '~/components/product/TabItem'
import ProductTabContent from '~/components/product/TabContent'
import DeliveryForm from '~/components/DeliveryForm'

const PRODUCT_PARAMS = [
	{
		title: 'Общая длина',
		value: 'total_length'
	},
	{
		title: 'Длина парной',
		value: 'steam_room_length'
	},
	{
		title: 'Длина комнаты отдыха',
		value: 'restroom_length'
	},
	{
		title: 'Длина помывочной',
		value: 'washing_room_length'
	},
	{
		title: 'Длина раздевалки',
		value: 'dressing_room_length'
	},
	{
		title: 'Диаметр',
		value: 'diameter'
	},
	{
		title: 'Ширина',
		value: 'width'
	},
	{
		title: 'Высота',
		value: 'height'
	},
]

export default {
	components: {
		LazyHydrate,
		ProductCard,
		ProjectsDisclaimer,
		Slider,
		ProductRelated,
		ProductTabList,
		ProductTabItem,
		ProductTabContent,
		DeliveryForm,
		// MainMap: () => import('~/components/main/Map'),
	},

	layout: 'default',

	middleware: [
		async({ store, params }) => {
			await store.dispatch('product/fetchProduct', params)
		}
	],

	meta: {
		scrollPos: {
			x: 0,
			y: 0
		}
	},

	head() {
		return {
			title: `Купить ${this.product.category.accusative} ${this.product.title} под ключ от производителя`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `Купить ${this.product.category.accusative} ${this.product.title} ${this.product.total_length}x${this.product.steam_room_length}x${this.product.diameter}см под ключ от производителя за ${this.product.price} рублей`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `${this.product.category.nominative.toLowerCase()}, ${this.product.title.toLowerCase()}`
				},
				{
					name: 'og:title',
					content: `${this.product.category.nominative} ${this.product.title}`
				},
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.path}` }
			]
		}
	},

	props: {},

	computed: {
		...mapGetters({
			product: 'product/product',
			related: 'product/related',
			isMobile: 'responsive/isMobile',
			isTablet: 'responsive/isTablet'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Проекты',
					url: '/projects',
				},
				{
					title: this.product.category.title,
					url: `/${this.product.category.slug}`,
				},
				this.product.sub_category ? {
					title: this.product.sub_category.title,
					url: `/${this.product.sub_category.slug}`,
				} : {},
			]
		},
		mediaUrl() {
			return this.$config.urls.back
		},
		fullTitle() {
			return `${this.product.category.nominative} ${this.product.title}`
		},
		priceFormatted() {
			return new Intl.NumberFormat('ru-RU').format(this.product.price)
		},

		productParams() {
			return PRODUCT_PARAMS.map(item => {
				return {
					title: item.title,
					value: `${this.product[item.value]} см`
				}
			})
		}
	},

	mounted() {
		this.lightbox = this.$glightbox({
			elements: [{
				href: `${this.mediaUrl}/imgcache/product-lightbox/${this.product.image.filename}`
			}],
		})

		this.tour = this.$glightbox({
			elements: [{
				href: this.product.virtual_tour
			}],
		})
	},

	watch: {
		breadcrumbs: {
			immediate: true,
			handler(val) {
				this.$store.commit('breadcrumbs/SET_BREADCRUMBS', val)
			}
		}
	},

	data: () => ({
		lightbox: null,
		tour: null,
		tabActive: 'complectation',
		tabs: [
			{
				name: 'complectation',
				title: 'Комплектация',
			},
			{
				name: 'params',
				title: 'Характеристики',
			},
			{
				name: 'extra',
				title: 'Дополнительные услуги',
			},
			{
				name: 'delivery',
				title: 'Доставка и оплата',
			},
		]
	}),

	methods: {
		handleTourLoad() {
		},
		handleTourOpen() {
			this.tour.open()
		},
		handleContactsClick() {
			this.$store.dispatch('modal/setContacts', {
				open: true
			})
		},
	},
}
</script>
<style lang="scss">
	.product {
		@include noize-bg();
		&__container {
			grid-column-gap: 28px;
			display: grid;
			grid-template-areas:
				'content aside';
			grid-template-columns: minmax(0, 8fr) 4fr;
			@include mq('laptop') {
				grid-template-areas:
					'content'
					'aside';
				grid-template-columns: repeat(1, 1fr);
			}
		}
		&__content {
			grid-area: content;
			overflow: hidden;
		}
		&__title {
			margin: 30px 0;
			font-weight: 700;
			font-size: 32px;
			line-height: 32px;
		}
		&__summary {
			margin-bottom: 30px;
			font-size: 18px;
		}
		&__img {
			width: 100%;
			height: auto;
		}
		&__buttons {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
			flex-flow: wrap;
			@include mq('mobile') {
				flex-flow: column;
			}
		}
		&__btn {
			margin-bottom: 10px;
			width: 200px;
			font-weight: 700;
			white-space: nowrap;
			&_tour {
				margin-right: 30px;
				display: flex;
				align-items: center;
				justify-content: center;
				@include mq('mobile') {
					margin: 0 0 20px 0;
					width: 100%;
				}
				.svg-icon {
					fill: #807f1a;
					margin-right: 5px;
				}
				&:hover {
					.svg-icon {
						fill: #ffffff;
					}
				}
			}
			&_contacts {
				margin-right: auto;
				@include mq('mobile') {
					margin: 0 0 10px 0;
					width: 100%;
				}
			}
		}
		&__price {
			margin-bottom: 10px;
			margin-left: 30px;
			white-space: nowrap;
			font-size: 24px;
			font-weight: 700;
			line-height: 38px;
			white-space: nowrap;
			span {
				font-size: 30px;
				color: #807f1b;
				padding-right: 5px;
			}
			@include mq('mobile') {
				margin: 0 0 10px 0;
			}
		}
		&__aside {
			overflow: hidden;
			grid-area: aside;
			&-title {
				margin: 30px 0;
				font-size: 26px;
				line-height: 32px;
				font-weight: 700;
				@include mq('laptop') {
					margin-top: 0;
				}
			}
		}
		&__tour {
			min-height: 400px;
			margin-bottom: 15px;
			iframe {
				display: block;
				width: 100%;
				height: 400px;
			}
		}
	}
</style>