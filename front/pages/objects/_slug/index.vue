<template>
	<div class="object">
		<div class="container object__container">
			<!-- Content -->
			<main class="object__content">
				<article class="object__article">
					<!-- Header -->
					<header class="object__header">
						<h1 class="object__title">{{ object.title }} под ключ</h1>
					</header>
					<!-- Body -->
					<section>
						<!-- Slider -->
						<lazy-hydrate when-visible>
							<slider
								v-if="object"
								:items="[
									object.image,
									...object.images
								]"
								:width="isMobile ? '330px' : '225px'"
								:height="isMobile ? '208px' : '142px'"
								:show-main="true"
								:object-title="object.title"
							/>
						</lazy-hydrate>
						<lazy-hydrate when-visible>
							<div class="object__actions">
								<button
									:class="[
										'btn btn-primary object__contacts',
										isMobile ? 'btn-lg' : 'btn-md'
									]"
									@click="handleContactsClick"
								>Узнать стоимость проекта</button>
							</div>
						</lazy-hydrate>
					</section>
					<!-- Aside -->
					<lazy-hydrate when-visible>
						<div class="object__aside">
							<div class="object__table table" v-html="object.description"></div>
						</div>
					</lazy-hydrate>
				</article>
			</main>
		</div>
		<lazy-hydrate when-visible>
			<projects-disclaimer />
		</lazy-hydrate>
	</div>
</template>
<script>

import { mapGetters } from 'vuex'

import LazyHydrate from 'vue-lazy-hydration'
import Slider from '~/components/Slider'
import ProjectsDisclaimer from '~/components/ProjectsDisclaimer'

export default {
	components: {
		LazyHydrate,
		ProjectsDisclaimer,
		Slider,
	},

	layout: 'default',

	middleware: [
		async({ store, params }) => {
			await store.dispatch('object/fetchObject', params)
		}
	],

	head() {
		return {
			title: `${this.object.title} | Наши проекты`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `${this.object.title}`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `${this.object.title.toLowerCase()}`
				},
				{
					name: 'og:title',
					content: `${this.object.title} | Наши проекты`
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
			object: 'object/object',
			isMobile: 'responsive/isMobile',
			isTablet: 'responsive/isTablet'
		}),
		breadcrumbs() {
			return [
				{
					title: 'Наши работы',
					url: '/objects',
				},
				{
					title: this.object.title,
					url: this.$route.fullPath,
				},
			]
		},
		mediaUrl() {
			return this.$config.urls.back
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
	}),

	methods: {
		handleContactsClick() {
			this.$store.dispatch('modal/setContacts', {
				open: true
			})
		},
	},
}
</script>
<style lang="scss">
	.object {
		@include noize-bg();
		&__content {
			overflow: hidden;
		}
		&__header {
			grid-area: header;
		}
		&__article {
			grid-column-gap: 28px;
			display: grid;
			grid-template-areas:
				'header header'
				'content aside';
			grid-template-columns: minmax(0, 8fr) 4fr;
			@include mq('laptop') {
				grid-template-areas:
					'header'
					'content'
					'aside';
				grid-template-columns: repeat(1, 1fr);
			}
		}
		&__title {
			margin: 30px 0;
			font-weight: 700;
			font-size: 32px;
			line-height: 32px;
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
		&__actions {
			margin-bottom: 30px;
			text-align: center;
		}
		&__contacts {
			font-weight: 700;
		}
		&__aside {
			grid-area: aside;
		}
	}
</style>