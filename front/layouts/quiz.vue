<template>
	<div class="quiz-page">
		<nuxt />
	</div>
</template>

<script>
import {
	mapGetters,
	mapMutations,
	mapActions,
} from 'vuex'

export default {
	components: {
	},
	computed: {
		...mapGetters({
			
		}),
	},
}
</script>

<style lang="scss" scoped>
	@import '~/assets/fonts/ProximaNova/styles.css';

	body {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-family: Proxima Nova;
	}

	.quiz-page {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100vw;
		height: 100vh;
		justify-content: center;
		&__wrap {
	    flex-flow: column;
	    width: 550px;
	    justify-content: center;
	    display: flex;
			@include mq('mobile') {
				width: 100%;
			}
		}
	}

	.quiz-fade-next-enter-active,
	.quiz-fade-next-leave-active {
		transition: all 1s;
	}
	.quiz-fade-next-enter,
	.quiz-fade-next-leave-active {
		opacity: 0;
	}
	.quiz-fade-next-enter {
		transform: translateX(50%);
	}
	.quiz-fade-next-leave-active {
		transform: translateX(-50%);
	}

	.quiz-fade-prev-enter-active,
	.quiz-fade-prev-leave-active {
		transition: all 1s;
	}
	.quiz-fade-prev-enter,
	.quiz-fade-prev-leave-active {
		opacity: 0;
	}
	.quiz-fade-prev-enter {
		transform: translateX(-50%);
	}
	.quiz-fade-prev-leave-active {
		transform: translateX(50%);
	}
</style>