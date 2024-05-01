<template>
	<div class="tab-content">
		<div class="tab-content__body">
			<slot />
		</div>
	</div>
</template>
<script>
export default {
	name: 'TabContent',

	components: {},

	props: {},

	computed: {},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.tab-content {
		&__body {}
	}
</style>