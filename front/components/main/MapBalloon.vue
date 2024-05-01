<template>
	<div class="map-baloon">
		<h5>{{ location }}</h5>
		<p>{{ title }}</p>
		<nuxt-link
			v-slot="{ href, route, navigate, isActive, isExactActive }"
			:to="`/objects/${slug}`"
		>
			<a
				:href="href"
				@click="navigate"
			>
				Подробнее...
			</a>
		</nuxt-link>
	</div>
</template>
<script>
export default {
	name: 'MapBalloon',

	components: {},

	props: {
		title: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
	},

	computed: {

	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>
<style lang="scss">
</style>