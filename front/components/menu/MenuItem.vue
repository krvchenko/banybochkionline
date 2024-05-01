<template>
	<nuxt-link
		v-slot="{ href, route, navigate, isActive, isExactActive }"
		:to="route"
	>
		<li :class="['menu-main__item', isActive && 'menu-main__item_active']">
			<a
				:class="['menu-main__link', isActive && 'menu-main__link_active']"
				:href="href"
				@click="navigate"
			>
				<span
					:class="['menu-main__name', isActive && 'menu-main__name_active']"
					>{{ name }}</span
				>
			</a>
		</li>
	</nuxt-link>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
	name: 'MenuItem',

	components: {},

	props: {
		name: {
			type: String,
			required: true
		},
		route: {
			type: String,
			required: true
		},
	},

	computed: {
		...mapGetters({}),
	},

	mounted() {},

	data: () => ({}),

	methods: {},
}
</script>

<style lang="scss">
	.menu-main {
		&__item {
			padding-left: 0;
			margin-bottom: 0;
			list-style: none;
			padding-right: 20px;
			white-space: nowrap;
			&:last-child {
				padding-right: 0;
			}
			&_active {

			}
			@include mq('tablet') {
				padding-right: 0;
			}
		}

		&__link {
			display: block;
			padding: 15px 0;
			position: relative;
			color: #464646;
			text-transform: uppercase;
			text-decoration: none;
			letter-spacing: 1px;
			font-weight: 700;
			line-height: 20px;
			text-decoration: none;
			@include mq('tablet') {
				padding: 10px 0;
			}
			&:hover,
			&:focus,
			&:active {
				text-decoration: none;
				color: #807f1b;
			}
			&_active {
				color: #807f1b;
				&:hover,
				&:focus,
				&:active {
					color: #807f1b;
				}
			}
		}

		&__name {
			&_active {
				
			}
		}
	}
</style>