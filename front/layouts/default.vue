<template>
	<div class="page">
		<div class="page__wrap">
			<div class="page__content">
				<page-header />
				<video-disclaimer
					v-if="videoDisclaimer"
					@close="videoDisclaimer = !videoDisclaimer"
				/>
				<breadcrumbs
					v-if="$route.fullPath !== '/'"
					v-show="!isMobile"
					:items="breadcrumbs"
				/>
				<section class="content">
					<transition name="fade">
						<nuxt />
					</transition>
				</section>
			</div>
			<div class="page__footer">
				<lazy-hydrate on-interaction="click">
					<page-footer />
				</lazy-hydrate>
			</div>
		</div>
		<lazy-hydrate>
			<transition name="fade">
				<modal
					v-if="contactsModal"
					:show="contactsModal"
					:width="440"
					@close="handleContactsClose"
				>
					<template #header>
						<h2
							:style="{
								textAlign: 'center',
								fontSize: '28px',
								lineHeight: '32px',
								marginBottom: '10px',
								marginTop: '0'
							}"
						>
							Бесплатная консультация
						</h2>
						<div
							:style="{
								textAlign: 'center',
								fontSize: '18px',
								lineHeight: 'normal'
							}"
						>
							Заполните форму и мы перезвоним вам совершенно бесплатно!
						</div>
					</template>
					<template #body>
						<div
							v-if="cost"
							:style="{
								marginBottom: '24px',
								textAlign: 'center',
								lineHeight: 'normal'
							}">
								Приблизительная стоимость доставки в г. <b>{{ cost.city }}</b>: <br> <span style="color: #807F1B;"><b>{{ cost.cost }}</b></span> рублей.
							</div>
						<contacts-form />
					</template>
				</modal>
			</transition>
		</lazy-hydrate>

		<client-only>
			<page-widgets />
		</client-only>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
import PageHeader from '~/components/header/Header'
import PageFooter from '~/components/footer/Footer'
import PageWidgets from '~/components/PageWidgets'
import VideoDisclaimer from '~/components/VideoDisclaimer'

export default {
	components: {
		LazyHydrate,
		PageHeader,
		PageFooter,
		VideoDisclaimer,
		PageWidgets,
		Modal: () => import('~/components/Modal'),
		ContactsForm: () => import('~/components/ContactsForm'),
	},

	head() {
		return {
			meta: [
				{ name : 'yandex-verification', content: '230315a6a780730c' },
			],
		}
	},

	computed: {
		...mapGetters({
			contactsModal: 'modal/contacts',
			cost: 'modal/cost',
			breadcrumbs: 'breadcrumbs/breadcrumbs',
			isMobile: 'responsive/isMobile'
		}),
	},

	data: () => ({
		videoDisclaimer: true,
	}),

	mounted() {
		// document.onreadystatechange = () => {
		// 	if (document.readyState === 'complete') {
		// 		this.setScreenSize()
		// 	}
		// }

		// window.addEventListener('resize', () => {
		// 	this.setScreenSize()
		// })
	},

	methods: {
		handleContactsClose() {
			this.$store.dispatch('modal/setContacts', false)
		},
		// setScreenSize() {
		// 	this.$store.commit('responsive/setIsMobile', {
		// 		value: window.innerWidth < 768,
		// 	})
		// 	this.$store.commit('responsive/setIsTablet', {
		// 		value: window.innerWidth >= 768 && window.innerWidth < 1280,
		// 	})
		// 	this.$store.commit('responsive/setIsDesktop', {
		// 		value: window.innerWidth >= 1280,
		// 	})
		// },
	}
}
</script>

<style lang="scss">
.page {
	&__wrap {
		height: 100vh;
		display: flex;
		flex-flow: column;
		justify-content: space-between;
	}
}
</style>
