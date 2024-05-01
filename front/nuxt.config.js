const BACK_URL = process.env.BACK_URL
const APP_URL = process.env.APP_URL
const FRONT_URL = process.env.FRONT_URL || BACK_URL
import axios from 'axios'

export default {
	publicRuntimeConfig: {
		urls: {
			back: BACK_URL,
		},
	},
	env: {
		frontUrl: process.env.FRONT_URL
	},
	head: {
		title: 'Бани бочки и купели купить в Москве от производителя с доставкой напрямую с завода на сайте banybochkionline.ru',
		htmlAttrs: {
			lang: 'ru'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Качественные бани бочки и купели в Москве от производителя с доставкой. Погрузитесь в мир релаксации и здоровья с нашими уникальными изделиями для бани напрямую с завода на сайте banybochkionline.ru' },
			{ hid: 'keywords', name: 'keywords', content: 'бани бочки, купели, купить, москва, от производителя, доставка, завод, сайт' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
			// { rel: 'preconnect', href: BACK_URL },
			// { rel: 'dns-prefetch', href: BACK_URL }
		],
		htmlAttrs: {
			lang: 'ru',
		},
	},

	router: {
		trailingSlash: false,
		scrollBehavior (to, from, savedPosition) {
			if (savedPosition) {
				return { x: savedPosition.x, y: savedPosition.y };
			}
			return { x: 0, y: 0 };
		}
	},

	loading: {
		color: 'rgba(128, 127, 27, .7)',
		height: '3px',
	},

	css: [
		'vue-select/dist/vue-select.css',
		{ src: '~/assets/sass/app.scss', lang: 'scss' },
		// 'element-ui/lib/theme-chalk/index.css',
		// '~/assets/element-ui/index.css',
	],

	styleResources: {
		scss: ['~assets/sass/_mixins.scss'],
	},

	plugins: [
		{ src: '~/directives' },
		{ src: '~/plugins/global' },
		{ src: '~/plugins/axios' },
		{ src: '~/plugins/asyncComputed' },
		{ src: '~/plugins/ymap',  mode: 'client' },
		{ src: '~/plugins/nuxt-client-init', mode: 'client' },
		{ src: '~/plugins/glightbox', mode: 'client' },
		{ src: '~/plugins/vue-carousel', mode: 'client' },
		{ src: '~/plugins/vue-select', mode: 'client' },
		{ src: '~/plugins/vue-friendly-iframe' },
		{ src: '~/plugins/v-mask', mode: 'client' },
		{ src: '~/plugins/vform' },
		{ src: '~/plugins/gtag' },
		// '~/plugins/element-ui',
	],

	components: false,

	buildModules: [
		// '@nuxtjs/eslint-module',
		'@nuxtjs/device',
	],

	modules: [
		'@nuxtjs/axios',
		'@nuxtjs/svg',
		'@nuxtjs/style-resources',
		'@nuxt/image',
		'@nuxtjs/sitemap',
		[
			'@nuxtjs/yandex-metrika',
			{
				id: '43459729',
				webvisor: true,
				clickmap: true,
				trackLinks: true,
				trackHash:true,
				accurateTrackBounce: true,
				useRuntimeConfig: 'ym'
			}
		],
		[
			'vue-yandex-maps/nuxt',
			{
				// apiKey: 'ca913e0d-396f-41fb-aba4-8537720869c5',
				lang: 'ru_RU',
				version: '2.1'
			}
		]
	],

	sitemap: {
		path: '/sitemap.xml',
		hostname: FRONT_URL,
		cacheTime: 1000 * 60 * 15,
		trailingSlash: false,
		gzip: true,
		defaults: {
			changefreq: 'daily',
			priority: 1,
			lastmod: new Date()
		},
		routes: async () => {
			const { data } = await axios.get(`${BACK_URL}/v1/sitemap`)
			return data
		}
	},

	image: {
		domains: [
			'api.banybochkionline.ru',
			'img.youtube.com',
		]
	},

	axios: {
		proxy: true,
	},

	proxy: {
		'/v1/': BACK_URL
	},

	build: {
		postcss: null,
		// transpile: [/^element-ui/],
	},
}
