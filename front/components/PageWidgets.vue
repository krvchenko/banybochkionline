<template>
	<div class="page-widgets">
		<transition name="fade">
			<button
				v-show="showBtnUp"
				class="page-widgets__btn page-widgets__btn_up"
				@click.prevent="handlePageUp"
			>
				<svg-icon
					icon="angle-up"
					:width="24"
					:height="38"
					fill="#fff"
				/>
			</button>
		</transition>
		<a
			href="https://api.whatsapp.com/send/?phone=79215396303"
			target="_blank"
			class="page-widgets__btn page-widgets__btn_whatsapp"
		>
			<svg-icon
				icon="whatsapp"
				:width="33"
				:height="38"
				fill="#fff"
			/>
		</a>
	</div>
</template>
<script>
export default {
	name: 'PageWidgets',

	components: {},

	props: {},

	computed: {},

	mounted() {
		window.addEventListener('scroll', (e) => {
			if (window.scrollY >= 300) {
				this.showBtnUp = true
			} else {
				this.showBtnUp = false
			}
		})
	},

	data: () => ({
		showBtnUp: false,
	}),

	methods: {
		handlePageUp() {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		}
	},
}
</script>
<style lang="scss">
	.page-widgets {
		position: fixed;
		bottom: 50px;
		right: 50px;
		max-width: 120px;
		min-height: 130px;
		z-index: 50;
		min-height: 130px;
		flex-direction: column;
		display: flex;
		justify-content: flex-end;
		@include mq('mobile') {
			right: 15px;
		}
		&__btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 60px;
			height: 60px;
			text-align: center;
			line-height: 90px;
			border-radius: 50%;
			outline: none;
			border: none;
			&:active,
			&:focus,
			&:hover {
				outline: none;
				border: none;
			}
			&_up {
				margin-bottom: 10px;
				background-color: #54362f;
			}
			&_whatsapp {
				background-color: #8dc63f;
			}
		}
	}
</style>