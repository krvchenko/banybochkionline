<template>
	<div class="delivery">
		<div class="container delivery__container">
			<!-- Content -->
			<main class="delivery__content">
				<article>
					<!-- Header -->
					<header class="delivery__header">
						<h1 class="delivery__title">Доставка и оплата</h1>
					</header>
					<section>
						<p>Доставка нашей продукции осуществляется по всей России. Мы можем предложить два варианта доставки Бани бочки:</p>
						<h2>В готовом виде, манипулятором</h2>
						<ul>
							<li>Для доставки необходимо обеспечить беспрепятственный проезд тяжелой грузовой техники грузоподъемностью 5 тонн не повышенной проходимости (манипулятор) на место выгрузки.</li>
							<li>Высота грузового автомобиля с баней 4 метра. Соответственно, ограничение по высоте проезда не должно быть менее 4 метров.</li>
							<li>Вам необходимо обеспечить подготовленное для установки изделия основание, возможность подъезда транспорта не повышенной проходимости (манипулятор длиной 8 метров и шириной 2,4 метра) к месту установки бани.</li>
							<li>Условия проезда: ширина проезжей части не менее 3 метров, ширина проезжей части для поворота и проезда на участок манипулятора под углом 90° к проезжей части не менее 6 метров.</li>
							<li>Установка бани происходит параллельно манипулятору согласно схеме разгрузки, размещенной ниже. На месте разгрузки и установки не должно быть высоковольтных проводов и прочих препятствий для стрелы крана манипулятора.</li>
						</ul>
						<h2>Наша сборка у Вас на участке</h2>
						<ul>
							<li>В случае если нет заезда большой технике (манипулятору), осуществляем сборку бани прямо у Вас на участке.</li>
							<li>Стоимость сборки на участке <b style="color: #807F1B;">10 000</b> рублей любой модели бани.</li>
							<li>Доставка рассчитывается отдельно и зависит от точного адреса установки.</li>
						</ul>
						<h3>Калькулятор стоимости доставки</h3>
						<lazy-hydrate when-visible>
							<delivery-form />
						</lazy-hydrate>
						<h2>Наш транспорт</h2>
						<lazy-hydrate when-visible>
							<slider
								:items="images"
							/>
						</lazy-hydrate>
						<h2>Оплата</h2>
						<p>Оплаты происходят только после заключения договора!<br>Заключение договора может проходить как в нашем офисе, так и дистанционно по электронной почте, оригинал Вашего экземпляра договора всегда приезжает с баней.</p>
						<p>Предоплата 10000 рублей. Полная оплата у Вас на участке после установки и проверки бани, оплата наличными денежными средствами, кредитными картами, на расчетный счет организации, а так- же в кредит. Банки партнеры Хоум Кредит, Почта банк.</p>
						<h2>Остались вопросы?</h2>
						<p>Звоните на горячую линию <b>8 800 222 42 61</b> ответим на все Ваши вопросы, звонок бесплатный с любого мобильного из любой точки России.</p>
					</section>
				</article>
			</main>
		</div>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import DeliveryForm from '~/components/DeliveryForm'
import Slider from '~/components/Slider'

export default {
	components: {
		LazyHydrate,
		DeliveryForm,
		Slider
	},

	layout: 'default',

	middleware: [],

	head() {
		return {
			title: `Доставка и Оплата - banybochkionline.ru`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `Информация о доставке и оплате товаров на сайте Бани Бочки. Узнайте о способах оплаты и условиях доставки нашей продукции.`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `доставка, оплата, бани бочки`
				},
				{
					name: 'og:title',
					content: `Доставка и Оплата - banybochkionline.ru`
				},
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.path}` }
			]
		}
	},

	props: {},

	computed: {
		...mapGetters({}),
		breadcrumbs() {
			return [
				{
					title: 'Доставка и оплата',
					url: '/delivery',
				},
			]
		},
	},

	mounted() {

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
		images: [
			{
				filename: 'dostavka-4.jpeg'
			},
			{
				filename: 'dostavka-0.jpg'
			},
			{
				filename: 'dostavka-1.jpg'
			},
			{
				filename: 'dostavka-2.jpg'
			},
			{
				filename: 'dostavka-3.jpg'
			},
		]
	}),

	methods: {
		handleContactsClick() {
			this.$store.dispatch('modal/setContacts', true)
		},
	},
}
</script>
<style lang="scss">
	.delivery {
		&__content {
			overflow: hidden;
		}
		&__list {
			margin-bottom: 30px;
			grid-column-gap: 28px;
			grid-row-gap: 28px;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			@include mq('laptop') {
				grid-template-columns: repeat(2, 1fr);
			}
			@include mq('tablet') {
				grid-template-columns: repeat(1, 1fr);
				justify-items: center;
			}
		}
		&__title {
			margin: 0 0 30px 0;
			font-weight: 700;
			font-size: 32px;
			line-height: 32px;
			@include mq('tablet') {
				margin: 30px 0;
			}
		}
	}
</style>