<template>
	<div class="projects-disclaimer">
		<div class="container projects-disclaimer__container">
			<div class="projects-disclaimer__text">
				<span
					class="projects-disclaimer__icon"
					:style="{
						width: '32px',
						height: '32px',
					}"
				>
					<svg-icon
						:width="32"
						:height="32"
						icon="question"
						fill="#807F1B"
					/>
				</span>
				Не нашли подходящий проект? Изготовим по вашему дизайну!
			</div>
			<div class="projects-disclaimer__actions">
				<button
					:class="[
						'btn btn-outline-primary projects-disclaimer__contacts',
						isMobile ? 'btn-md' : 'btn-sm'
					]"
					@click="handleContactsClick"
				>Оставить заявку</button>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	name: 'ProjectsDisclaimer',

	components: {},

	props: {},

	computed: {
		...mapGetters({
			isMobile: 'responsive/isMobile',
			isTablet: 'responsive/isTablet'
		}),
	},

	mounted() {},

	data: () => ({}),

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
	.projects-disclaimer {
		// margin-bottom: 30px;
		@include noize-bg();
		&__container {
			padding: 30px 15px;
		}
		&__text {
			font-size: 20px;
			line-height: 23px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&__icon {
			margin-right: 20px;
		}
		&__actions {
			margin-top: 10px;
			text-align: center;
			@include mq('mobile') {
				text-align: left;
				margin-left: 52px;
			}
		}
	}
</style>