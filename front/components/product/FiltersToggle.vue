<template>
	<button
		:class="[
			'btn',
			'btn-link',
			'filters-toggle',
			active && 'filters-toggle_active',
		]"
		@click.prevent="handleClick"
	>
		<span
			class="filters-toggle__icon"
			:style="{
				width: '12px',
				height: '12px'
			}"
		>
			<svg-icon
				:width="12"
				:height="12"
				icon="filter"
				fill="#807e00"
			/>
		</span>
		<span
			:class="[
				'filters-toggle__icon',
				active && 'filters-toggle__icon_active',
			]"
			:style="{
				width: '8px',
				height: '12px'
			}"
		>
			<svg-icon
				:width="8"
				:height="12"
				icon="caret"
				fill="#807e00"
			/>
		</span>
		<span class="filters-toggle__label">Фильтры</span>
	</button>
</template>
<script>

export default {
	name: 'FiltersToggle',

	components: {},

	props: {
		active: {
			type: Boolean,
			default: false
		}
	},

	computed: {

	},

	mounted() {},

	data: () => ({}),

	methods: {
		handleClick() {
			this.$emit('update:active', !this.active)
		}
	},
}
</script>
<style lang="scss">
	.filters-toggle {
		padding: 0;
		border: none;
		margin-bottom: 15px;
		color: #807e00;
		font-size: 12px;
		font-weight: 700;
		letter-spacing: .3px;
		vertical-align: middle;
		&:hover,
		&:focus,
		&:active {
			color: #807e00;
			text-decoration: none;
		}
		&__icon {
			display: inline-block;
			&_active {
				transform: rotate(180deg) translateY(-8px);
			}
		}
		&__label {
			color: #807e00;
			border-bottom: 1px #807e00 dotted;
			&:hover {
				border-bottom: none;
			}
		}
	}
</style>