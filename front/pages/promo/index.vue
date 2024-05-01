<template>
	<div class="quiz-page__wrap">
		<transition name="fade">
			<quiz-header v-show="!modal && !submited" />
		</transition>
		<transition name="fade">
			<div class="quiz-lp"
				v-show="!modal && !submited"
			>
				<div class="quiz-page__bg"></div>
				<div class="quiz-page__content">
					<div class="quiz-page__body">
						<h1 class="quiz-page__title">
							Рассчитайте стоимость бани и получите скидку <span>3 000</span> рублей!
						</h1>
						<div class="quiz-page__description">
							Ответь всего на несколько вопросов и получи бонусы!
						</div>
						<el-button
							class="quiz-page__btn"
							type="primary"
							@click="handleModalClick"
						>
							<i class="el-icon-arrow-right el-icon-right"></i>
							<b>Получить скидку!</b>
						</el-button>
					</div>
				</div>
			</div>
		</transition>
		<transition name="fade">
			<quiz-footer v-show="!modal && !submited" />
		</transition>

		<transition name="fade">
			<div
				v-if="submited"
				class="quiz-thanks"
			>
				<h2 class="quiz-thanks__title">Спасибо! Мы свяжемся с Вами в ближайшее время! 👏</h2>
			</div>
		</transition>

		<el-dialog
			class="quiz-modal"
			:visible.sync="modal"
			:show-close="false"
			:fullscreen="false"
			:close-on-click-modal="false"
			:width="screenWidth <= '960' ? '100%' : '960px'"
		>
			<quiz-steps
				v-if="steps"
				key="steps"
				@complete="handleStepsComplete"
			/>
			<quiz-contacts
				v-if="contacts"
				key="contacts"
				:data="data"
				@submit="handleSubmited"
			/>
		</el-dialog>
	</div>
</template>

<script>
import {
	mapGetters,
	mapMutations,
	mapActions,
} from 'vuex'

import QuizHeader from '~/components/quiz/Header'
import QuizFooter from '~/components/quiz/Footer'
import QuizSteps from '~/components/quiz/Steps'
import QuizContacts from '~/components/quiz/Contacts'

export default {

	components: {
		QuizHeader,
		QuizFooter,
		QuizSteps,
		QuizContacts
	},

	layout: 'quiz',

	head() {
		return {
			title: `Промо | Бани Бочки Онлайн`,
			titleTemplate: '%s',
			meta: [
				{
					hid : 'description',
					name: 'description',
					content: `Промо`
				},
				{
					hid : 'keywords',
					name: 'keywords',
					content: `cоглашение, бани бочки онлайн`
				},
				{
					name: 'og:title',
					content: `Промо | Бани Бочки Онлайн`
				},
			],
			link: [
				{ rel: 'canonical', href: `${process.env.frontUrl}${this.$route.path}` }
			]
		}
	},

	props: {

	},

	created() {

	},

	computed: {
		...mapGetters({
			// modal: 'quiz/modalOpened',
			screenWidth: 'responsive/screenWidth'
		}),
	},

	data: () => ({
		modal: false,
		steps: true,
		contacts: false,
		submited: false,
		data: null,
	}),

	watch: {

	},

	methods: {
		handleModalClick() {
			this.modal = !this.modal
		},
		handleStepsComplete(val) {
			this.data = val
			this.contacts = true
			this.steps = false
		},
		handleSubmited() {
			this.steps = false
			this.contacts = false
			this.submited = true
			this.modal = false
		}
	}
}
</script>

<style lang="scss">
	$quiz-bg: url('~assets/i/quiz/quiz-bg.jpg');
	.quiz-page {
		&__bg {
			height: 275px;
			border-radius: 6px;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			background-image: $quiz-bg;
			@include mq('mobile') {
				border-radius: 0;
				height: 180px;
			}
		}
		&__content {
			padding: 15px 0;
			@include mq('tablet') {
				padding: 15px;
			}
		}
		&__body {
			margin-bottom: 30px;
			text-align: center;
		}
		&__title {
			margin-bottom: 16px;
			font-size: 26px;
			line-height: 32px;
			span {
				color: #807f1b;
				font-family: Proxima Nova;
			}
			&-icon {
				font-style: normal;
				transform: translate3d(-2px, -8px, 0) rotate(-33deg);
				display: inline-block;
			}
		}
		&__description {
			margin-bottom: 15px;
			font-size: 18px;
			font-style: normal;
			color: #888;
		}
		&__btn {
			font-size: 16px;
			span {
				display: flex;
				align-items: center;
			}
			i {
				font-weight: bold;
				font-size: 20px;
			}
			b {
				margin-left: 12px;
			}
		}
	}

	.quiz-modal {
		.el-dialog__header {
			display: none;
			// border-bottom: 1px solid #eee;
		}
		.el-dialog__body {
			// padding: 20px 20px 30px 20px;
			padding: 0;
		}
		&__title {
			margin: 0;
			font-family: Proxima Nova Sb;
			i {
				color: #807f1b;
			}
		}
	}

	.quiz-thanks {
		&__title {
			text-align: center;
		}
	}
</style>