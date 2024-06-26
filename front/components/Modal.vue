<template>
	<div v-if="show" class="modal">
		<div
			class="modal__wrap"
			:style="{
				width: `${width}px`,
			}"
		>
			<div
				v-if="header"
				class="modal-header"
			>
				<span
					v-if="showClose"
					:class="['modal__close', `modal__close_${closeColor}`]"
					@click="handleModalClose"
				></span>
				<slot name="header" />
			</div>
			<div class="modal-body">
				<slot name="body" />
			</div>
		</div>
		<div class="modal-overlay" @click="handleModalClose"></div>
	</div>
</template>
<script>
	export default {
		name: 'Modal',
		
		props: {
			show: {
				type: Boolean,
				default: false,
			},

			showClose: {
				type: Boolean,
				default: true,
			},

			width: {
				type: Number,
				default: 600,
			},

			closeColor: {
				type: String,
				default: 'gray',
			},
		},

		data: () => ({}),

		computed: {
			header() {
				return this.$slots.header ? true : false
			},
		},

		watch: {},

		mounted() {
			document.body.classList.add('modal-open')
		},

		methods: {
			handleModalClose() {
				document.body.classList.remove('modal-open')
				this.$emit('close', false)
			},

			onEsc() {},
		},
	}
</script>

<style lang="scss">
	.modal-open {
		overflow: hidden;
	}
	.modal {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9999;
		&__wrap {
			max-height: calc(100% - 52px);
			max-width: calc(100% - 52px);
			overflow-y: scroll;
			margin: 26px;
			position: fixed;
			z-index: 9999;
			top: calc(50% - 26px);
			left: calc(50% - 26px);
			transform: translate(-50%, -50%);
			background: #ffffff;
			border-radius: 3px;
			box-shadow: 0px 15px 50px rgba(0, 0, 0, 0.5);

			@include hide-scroll();
		}

		&-overlay {
			cursor: pointer;
			height: 100%;
			width: 100%;
			position: absolute;
			z-index: 8888;
			background: rgba(34, 34, 34, 0.5);
		}

		&-header {
			position: relative;
			padding: 28px 28px 0 28px;
			&__wrap {
				display: flex;
			}
			&__info {
				flex-grow: 1;
			}
			&__title {
				margin-bottom: 20px;
				font-weight: 700;
				font-size: 32px;
				line-height: 38px;
				color: #243238;
			}

			&__description {
				font-family: Proxima Nova;
				font-size: 18px;
				line-height: 24px;
				color: #333333;
				opacity: 0.9;
			}
		}

		&-body {
			padding: 24px 28px 32px 28px;
			.container-fluid {
				padding: 0;
			}
		}

		&__close {
			cursor: pointer;
			position: absolute;
			display: block;
			width: 20px;
			height: 20px;
			float: right;
			top: 5px;
			right: 5px;
			padding: 18px;

			&:before,
			&:after {
				content: '';
				top: 0;
				left: 0;
				position: absolute;
				width: 2px;
				height: 26px;
				display: block;
				background: #000000;
			}

			&:before {
				transform: rotate(45deg) translate(16px, -9px);
			}
			&:after {
				transform: rotate(-45deg) translate(9px, 16px);
			}

			&_gray {
				opacity: 0.5;
				&:before,
				&:after {
					background: #555555;
				}
			}

			&_white {
				opacity: 0.7;
				&:before,
				&:after {
					background: #ffffff;
				}
			}
		}
	}

	@include mq('tablet') {
		.modal {
			--body-padding: 16px;
			&__wrap {
				max-width: calc(100% - 24px);
				margin-left: 12px;
				margin-right: 12px;
				left: calc(50% - 12px);
				overflow-x: hidden;
			}

			&-body {
				padding-left: var(--body-padding);
				padding-right: var(--body-padding);
			}

			&-header {
				padding-left: var(--body-padding);
				padding-right: var(--body-padding);
			}
		}
	}
</style>
