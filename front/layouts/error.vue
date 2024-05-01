<template>
	<div class="container error-page">
		<div class="error-page__wrap">
			<template v-if="error.statusCode === 404">
				<h1 class="error-page__code">404</h1>
				<h2 class="error-page__title">Страница не найдена</h2>
			</template>	
			<h1 class="error-page__title" v-else>An error occurred</h1>
			<div class="error-page__content">
				<NuxtLink to="/">На главную</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['error'],
		layout: 'error'
	}
</script>

<style lang="scss">
.error-page {
	&__code {
		font-size: 74px;
		line-height: 74px;
		text-align: center;
	}
	&__title {
		text-align: center;
	}
	&__content {
		margin-bottom: 48px;
		text-align: center;
	}
}
</style>