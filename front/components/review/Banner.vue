<template>
	<div class="review-banner">
		<div class="review-banner__wrap">
			<h4 class="review-banner__title">Здесь вы можете оставить свой отзыв о нашей работе!</h4>
			<button
				:class="[
					'btn btn-outline-light review-banner__btn',
					hover && 'review-banner__btn_hover'
				]"
				@click.prevent="$emit('click')"
				@mouseover="hover = true"
				@mouseleave="hover = false"
			>
				<svg-icon
					:class="[
						'review-banner__icon',
						hover && 'review-banner__icon_hover'
					]"
					icon="pencil"
					:width="14"
					:height="14"
				/>
				Оставить отзыв
			</button>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Banner',

	components: {},

	props: {},

	computed: {},

	mounted() {},

	data: () => ({
		hover: false,
	}),

	methods: {},
}
</script>
<style lang="scss">
	.review-banner {
		max-height: 266px;
		max-width: 480px;
		// margin-bottom: 30px;
		border-radius: 4px;
		background: #807f1b;
		&__wrap {
			padding: 40px 30px;
	    display: flex;
	    flex-flow: wrap;
	    height: 100%;
	    align-items: center;
		}
		&__title {
			margin-bottom: 40px;
			margin-top: 0;
			color: #fff;
			line-height: normal;
			font-weight: 700;
		}
		&__btn {
			display: flex;	
	    align-items: center;
	    font-weight: 700;
			&_hover {

			}
		}
		&__icon {
			margin-right: 5px;
			fill: #fff;
			&_hover {
				fill: #212529;
			}
		}
	}
</style>