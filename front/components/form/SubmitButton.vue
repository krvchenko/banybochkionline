<template>
	<button
		type="submit"
		:disabled="disabled"
		:class="[
			'btn',
			'btn-primary',
			`btn-${size}`,
			'form-submit',
			loading && 'form-submit_loading',
			disabled && 'form-submit_disabled',
			icon && 'form-submit_icon',
		]"
	>
		{{ label }}
	</button>
</template>

<script>
	export default {
		name: 'SubmitButtom',

		components: {},

		props: {
			loading: {
				type: Boolean,
				default: false,
			},

			label: {
				type: String,
				default: '',
			},

			size: {
				type: String,
				default: 'lg',
			},

			disabled: {
				type: Boolean,
				default: false,
			},

			icon: {
				type: Boolean,
				default: false,
			},
		},

		data: () => ({}),

		computed: {},

		watch: {},

		created() {},

		methods: {},
	}
</script>

<style lang="scss">
	$ico-btn-loading: url('~assets/i/ico-btn-loading.svg?data');
	.form-submit {
		font-weight: bold;
		// font-size: 18px;
		&_loading {
			transition: none;
			background-image: $ico-btn-loading;
			background-repeat: no-repeat;
			background-position: center;
			color: transparent!important;
			&:hover {
				color: transparent!important;
				background-image: $ico-btn-loading;
				background-repeat: no-repeat;
				background-position: center;
			}
		}

		&_disabled {
			color: transparent;
			cursor: not-allowed;
			background: #c9c9c9;
		}

		&_icon {
			position: relative;
			width: 42px;
			height: 40px;
			padding: 0;
			&:before {
				content: '';
				top: 50%;
				left: 50%;
				position: absolute;
				width: 14px;
				height: 2px;
				display: block;
				background: #ffffff;
				transform: rotate(45deg) translate3d(-8px, 0px, 0);
			}
			&:after {
				content: '';
				bottom: 50%;
				left: 50%;
				position: absolute;
				width: 14px;
				height: 2px;
				display: block;
				background: #ffffff;
				transform: rotate(-45deg) translate3d(-8px, 0px, 0);
			}
		}
	}
</style>
