<template>
	<li class="tab-item">
		<button
			:class="[
				'tab-item__button',
				active && 'tab-item__button_active',
			]"
			@click="$emit('click', name)"
		>{{ title }}</button>
	</li>
</template>
<script>
export default {
	name: 'TabItem',

	components: {},

	props: {
		name: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		active: {
			type: Boolean,
			default: false,
		},
	},

	computed: {},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.tab-item {
		display: block;
		list-style: none;
		&__button {
			display: block;
			padding: 10px 15px;
			color: #807f1b;
			margin-right: 2px;
			border: 1px solid transparent;
			border-radius: 4px 4px 0 0;
			text-decoration: underline;
			background: transparent;
			white-space: nowrap;
			&:hover {
				background-color: #eee;
				text-decoration: none;
			}
			&_active {
				font-weight: 700;
				color: #555;
				background-color: #fff;
				border: 1px solid #ddd;
				border-bottom-color: transparent;
				text-decoration: none;
				&:hover {
					background-color: #fff;
					text-decoration: none;
				}
			}
		}
	}
</style>