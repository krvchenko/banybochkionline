<template>
	<nav class="tab-list">
		<ul class="tab-list__list">
			<slot />
		</ul>
	</nav>
</template>
<script>
export default {
	name: 'TabList',

	components: {},

	props: {},

	computed: {},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.tab-list {
		&__list {
			border-bottom: 1px solid #ddd;
			padding-left: 0;
			margin-bottom: 0;
			list-style: none;
			display: flex;
			align-items: center;
			overflow: scroll;
			@include hide-scroll();
		}
	}
</style>