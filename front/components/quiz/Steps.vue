<template>
<div class="quiz-steps">
	<div class="quiz-steps__body">
		<div class="quiz-steps__steps">
			<transition-group :name="transition">
				<div
					v-if="item.active"
					v-for="(item, index) in steps"
					:key="`question_${index}`"
					class="quiz-steps__question"
				>
					<h2 class="quiz-steps__question-title">{{ item.title }}</h2>
						<div class="quiz-steps__options">
							<el-radio-group
								v-model="form[item.model]"
								:class="[
									'quiz-steps__radio-group',
									`quiz-steps__radio-group_${item.type}`
								]"
								@change="handleChange"
							>
								<template v-if="item.type === 'icon'">
								<el-radio
									:class="[
										'quiz-steps__radio',
										item.model === 'color' && 'quiz-steps__radio_input-inside',
										`quiz-steps__radio_${item.type}`
									]"
									v-for="option in item.options"
									:key="option.value"
									:label="option.label"
								>
									<img
										v-if="item.type === 'icon'"
										class="quiz-steps__radio-img"
										:src="require(`~/assets/i/quiz/${option.icon}`)"
										:alt="option.label"
									>
									<span
										:class="[
											'quiz-steps__radio-text',
											`quiz-steps__radio-text_${item.type}`
										]"
									>
										{{ option.label }}
									</span>
								</el-radio>
								</template>
								<template v-else>
									<el-radio
										:class="[
											'quiz-steps__radio',
											'quiz-steps__radio_text',
										]"
										v-for="option in item.options"
										:key="option.value"
										:label="option.label"
										border
									>
										{{ option.label }}
									</el-radio>
								</template>
							</el-radio-group>
					</div>
				</div>
			</transition-group>
		</div>
	</div>
	<div class="quiz-steps__footer">
		<el-progress
			class="quiz-steps__progress"
			:percentage="progress"
			:color="progressColor"
		/>

		<div
			class="quiz-steps__buttons"
		>
			<el-button
				type="secondary"
				:disabled="current === 0"
				@click="handleBack"
			>
				<b>Назад</b>
			</el-button>
			<el-button
				type="primary"
				@click="handleNext"
				:disabled="allowNext"
			>
				<b>
					<template v-if="current + 1 === steps.length">
						Последний шаг
					</template>
					<template v-else>
						Далее
					</template>
				</b>
			</el-button>
		</div>
	</div>
</div>
</template>

<script>
import {
	mapGetters,
	mapMutations,
	mapActions,
} from 'vuex'
import Form from 'vform'

export default {

	components: {

	},

	props: {

	},

	created() {

	},

	computed: {
		...mapGetters({
			screenWidth: 'responsive/screenWidth'
		}),
		current() {
			return this.steps.findIndex(item => item.active === true)
		},
		allowNext() {
			const item = this.steps[this.current]
			return item.required && !this.form[item.model] ? true : false
		},
		progress() {
			return Math.floor(this.current / this.steps.length * 100)
		}
	},

	data: () => ({
		transition: 'quiz-fade-next',
		form: {
			type: null,
			length: null,
			color: null,
			date: null,
		},
		steps: [{
			title: 'Выберите тип бани',
			required: true,
			active: true,
			type: 'icon',
			model: 'type',
			options: [{
				label: 'Баня бочка',
				value: 'barrel',
				icon: 'type-barel.png'
			},{
				label: 'Баня квадро',
				value: 'quadro',
				icon: 'type-quadro.png'
			}]
		},{
			title: 'Выберите длину бани',
			required: true,
			active: false,
			model: 'length',
			type: 'text',
			options: [{
				label: '2 метра',
				value: 2
			},{
				label: '3 метра',
				value: 3
			},{
				label: '4 метра',
				value: 4
			},{
				label: 'Более 5 метров',
				value: 6
			}]
		},{
			title: 'Выберите цвет кровли',
			required: true,
			active: false,
			type: 'icon',
			model: 'color',
			options: [{
				label: 'Коричневый',
				value: 'brown',
				icon: 'palette-brown.png'
			},{
				label: 'Красный',
				value: 'red',
				icon: 'palette-red.png'
			},{
				label: 'Зеленый',
				value: 'green',
				icon: 'palette-green.png'
			}]
		},{
			title: 'Когда необходима установка бани на участок?',
			required: true,
			active: false,
			model: 'date',
			type: 'text',
			options: [{
				label: 'В ближайшее время',
				value: 'asap'
			},{
				label: 'Через месяц',
				value: 'month'
			},{
				label: 'До конца 2022 года',
				value: 'year'
			},{
				label: 'Нужна консультация',
				value: 'contact'
			}]
		}]
	}),

	watch: {

	},

	methods: {
		handleNext() {
			let next = this.current + 1
			if (!this.steps[next]) {
				this.$emit('complete', this.form)
				return false
			}
			this.transition = 'quiz-fade-next'
			this.steps[next].active = true
			this.steps[this.current].active = false
		},
		handleBack() {
			if (this.current === 0) return false
			let prev = this.current - 1
			this.transition = 'quiz-fade-prev'
			this.steps[this.current].active = false
			this.steps[prev].active = true
		},
		handleChange() {
			this.handleNext()
		},
		progressColor(percentage) {
			if (percentage < 30) {
				return '#909399';
			} else if (percentage < 70) {
				return '#e6a23c';
			} else {
				return '#67c23a';
			}
		},
	}
}
</script>

<style lang="scss">
	.quiz-steps {
		overflow: hidden;
		padding: 20px 20px 30px 20px;
		&__footer {
			min-height: 40px;
			display: flex;
			align-items: center;
			@include mq('mobile') {
				flex-direction: column;
			}
		}
		&__progress {
			flex-grow: 1;
			.el-progress__text {
				color: #807f1b;
				font-weight: bold;
			}
			@include mq('mobile') {
				width: 100%;
			}
		}
		&__buttons {
			display: flex;
			align-items: center;
			@include mq('mobile') {
				margin-top: 20px;
				width: 100%;
				.el-button {
					flex-grow: 1;
				}
			}
		}
		&__steps {
			position: relative;
			min-height: 330px;
		}
		&__question {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			&-title {
				margin-bottom: 30px;
				text-align: center;
				color: #212529;
				font-size: 24px;
			}
		}

		&__radio {
			.el-radio__label {
				color: #212529;
				font-family: Proxima Nova Sb;
			}
			&_icon {
				min-width: 80px;
				margin: 0 15px;
				@include mq('mobile') {
					margin: 0 5px;
				}
				&:last-child {
					margin: 0 15px;
					@include mq('mobile') {
						margin: 0 5px;
					}
				}
				.el-radio__label {
					padding: 0;
					display: block;
				}
				.el-radio__inner {
					width: 20px;
					height: 20px;
					&:after {
						width: 10px;
						height: 10px;
					}
				}
			}

			&_text {
				margin: 0 10px;
				&:first-child {
					margin-left: 0;
				}
				@include mq('tablet') {
					margin: 0 0 20px 0!important;
					&:last-child {
						margin: 0!important;
					}
				}
			}


			&_input-inside {
				.el-radio__input {
					top: 10px;
					left: 10px;
					font-size: 0;
					position: absolute;
					font-size: 0;
				}
			}

			&-text {
				color: #212529;
				font-family: Proxima Nova Sb;
				&_icon {
					margin-top: 15px;
					display: block;
					text-align: center;
					font-size: 18px;
				}
			}

			&-img {
				border-radius: 4px;
				max-width: 100%;
				height: auto;
				display: block;
			}


			&-group {
				&_icon {
					display: flex;
					justify-content: center;
					align-items: end;
				}
				&_text {
					display: flex;
					justify-content: center;
					align-items: end;
					@include mq('tablet') {
						flex-direction: column;
						align-items: start;
					}
				}
			}
		}
	}
</style>