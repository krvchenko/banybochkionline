<template>
	<div class="breadcrumbs">
		<div class="container">
			<ol
				class="breadcrumbs__list"
				itemscope
				itemtype="http://schema.org/BreadcrumbList"
			>
				<li
					class="breadcrumbs__item"
					itemprop="itemListElement"
					itemscope
					itemtype="http://schema.org/ListItem"
				>
					<nuxt-link
						class="breadcrumbs__link"
						itemprop="item"
						to="/"
					>
						<span itemprop="name">Главная</span>
					</nuxt-link>
					<meta itemprop="position" content="1" />
				</li>
				<li
					class="breadcrumbs__item"
					v-for="(item, index) in items"
					:key="index"
					itemprop="itemListElement"
					itemscope
					itemtype="http://schema.org/ListItem"
				>
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						:to="item.url"
					>
						<a
							v-if="!isExactActive"
							class="breadcrumbs__link"
							:href="href"
							itemprop="item"
							@click="navigate"
						>
							<span itemprop="name">{{ item.title }}</span>
						</a>
						<span
							v-else
							class="breadcrumbs__current"
							itemprop="item"
						>
							<span itemprop="name">{{ item.title }}</span>
						</span>
					</nuxt-link>
					<meta itemprop="position" :content="index + 2" />
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Breadcrumbs',
	props: {
		items: {
			type: Array,
		}
	},
	computed: {},
}
</script>

<style lang="scss">
.breadcrumbs {
	&__list {
		padding: 20px 0;
		margin: 0;
		list-style: none;
		display: flex;
		flex-flow: wrap;
		align-items: center;
	}
	&__item {
		display: flex;
		align-content: baseline;
		&:after {
			content: '/';
			color: #ccc;
			padding: 0 5px;
		}
		&:last-child {
			&:after {
				content: '';
			}
		}
	}
	&__current {
		color: #777;
	}
}
</style>