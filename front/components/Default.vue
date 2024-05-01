<template>
	<nuxt-link
		v-slot="{ href, route, navigate, isActive, isExactActive }"
		to="/"
	>
		<a
			:href="href"
			@click="navigate"
		>
		</a>
	</nuxt-link>
</template>
<script>
import {
	mapGetters,
	mapMutations,
	mapActions,
} from 'vuex'
export default {
	components: {},

	props: {},

	computed: {
		...mapGetters({}),
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
</style>