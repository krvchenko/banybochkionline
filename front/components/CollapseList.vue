<template>
	<div
		itemscope=""
		itemtype="https://schema.org/FAQPage"
		class="collapse-list"
	>
		<div class="collapse-list__wrap">
			<slot />
		</div>
	</div>
</template>
<script>
export default {
	name: 'CollapseList',

	components: {},

	props: {},

	computed: {},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
	.collapse-list {
		&__wrap {
			margin-bottom: 30px;
		}
	}
</style>