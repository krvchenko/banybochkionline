<template>
<div class="quiz-contacts">
	<div class="quiz-contacts__wrap">
		<div class="quiz-contacts__content">
			<div class="quiz-contacts__progress">
				<div class="quiz-contacts__progress-label">Остался последний шаг!</div>
				<el-progress
					:percentage="95"
					color="#67c23a"
				/>
			</div>
			<h2 class="quiz-contacts__title">Оставьте свои контакты и получите бонусы! 🎁</h2>
			<div class="quiz-contacts__description">Ваша персональная скидка <span>3 000</span> рублей на баню будет закреплена за вашим номером телефона!</div>
			<div class="quiz-bonuses">
				<div class="quiz-bonuses__title">Ваши бонусы</div>
				<div class="quiz-bonuses__wrap">
					<div
						v-for="(item, index) in bonuses"
						:key="index"
						class="quiz-bonus"
					>
						<div
							class="quiz-bonus__wrap"
							:style="{
								backgroundImage: `url(${require('~/assets/i/quiz/'+item.icon)})`
							}"
						>
							<div class="quiz-bonus__text">{{ item.title }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="quiz-contacts__form">
			<form
				@submit.prevent="submit"
				@keydown="form.onKeydown($event)"
			>	
			</form>
				<div class="quiz-contacts__field">
					<label class="quiz-contacts__label">Ваше имя</label>
					<el-input
						:class="[
							'quiz-contacts__input',
							form.errors.has('name') && 'error'
						]"
						placeholder="Ваше имя"
						prefix-icon="el-icon-user-solid"
						v-model="form.name"
						:error="form.errors.has('name')"
					>
					</el-input>
					<transition name="fade">
						<has-error :form="form" field="name" />
					</transition>
				</div>
				<div class="quiz-contacts__field">
					<label class="quiz-contacts__label">Ваш телефон</label>
					<el-input
						placeholder="Ваш телефон"
						prefix-icon="el-icon-phone"
						:class="[
							'quiz-contacts__input',
							form.errors.has('phone') && 'error'
						]"
						v-model="form.phone"
						v-mask="'+7 (###) ###-####'"
					>
					</el-input>
					<transition name="fade">
						<has-error :form="form" field="phone" />
					</transition>
				</div>
				<div class="quiz-contacts__field">
					<el-checkbox
						class="quiz-contacts__checkbox"
						v-model="form.agreement"
						:true-label="1"
						:false-label="0"
					>
						Принимаю <a href="https://banybochkionline.ru/policy">условия передачи и хранения данных</a>
					</el-checkbox>
					<transition name="fade">
						<has-error :form="form" field="agreement" />
					</transition>
				</div>
				<div class="quiz-contacts__field">
					<el-button
						type="primary"
						@click="submit"
						:disabled="form.busy"
					>
						<i :class="form.busy ? 'el-icon-loading' : 'el-icon-success'"></i>
						<b>Получить скидку!</b>
					</el-button>
				</div>
		</div>
	</div>
</div>
</template>

<script>

import Form from 'vform'

export default {

	components: {

	},

	props: {
		data: {
			type: Object,
		}
	},

	created() {

	},

	data: () => ({
		form: new Form({
			type: null,
			length: null,
			color: null,
			date: null,
			phone: null,
			name: null,
			agreement: 1,
		}),
		bonuses: [{
			title: 'Скидка',
			icon: 'bonus-2.jpg'
		},{
			title: 'Подголовник',
			icon: 'bonus-1.jpg'
		},{
			title: 'Рассчет стоимости',
			icon: 'bonus-3.jpg'
		}]
	}),

	computed: {

	},

	watch: {
		data: {
			immediate: true,
			handler(val) {
				Object.keys(this.form).forEach(key => {
					if (val[key]) {
						this.form[key] = val[key]
					}
				})
			},
		}
	},

	methods: {
		async submit() {
			await this.form.post('/v1/contacts')
				.then(res => {
					this.$emit('submit')
				})
				.catch(e => {
					// console.log(e);
				})
		}
	}
}
</script>

<style lang="scss">
	.quiz-bonuses {
		&__title {
			text-align: center;
			margin-bottom: 15px;
			color: #888;
			display: block;
			font-size: 14px;
			line-height: 14px;
			font-family: Proxima Nova Sb;
		}

		&__wrap {
			display: flex;
			justify-content: center;
			flex-flow: wrap;
			@include mq('mobile') {
				flex-direction: column;
				align-items: center;
			}
		}
	}
	.quiz-bonus {
		width: 140px;
		border-radius: 5px;
		overflow: hidden;
		margin-right: 5px;
		margin-left: 5px;
		margin-bottom: 10px;
		&__wrap {
			position: relative;
			height: 64px;
			background-size: cover;
			background-position: 50%;
			background-repeat: no-repeat;
			&:after {
				z-index: 1;
				content: '';
				display: block;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background: linear-gradient(349deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.0001));
			}
		}
		&__text {
			position: absolute;
			right: 10px;
			bottom: 5px;
			color: #fff;
			text-align: right;
			z-index: 2;
			font-weight: bold;
			font-size: 12px;
		}
	}
	.quiz-contacts {
		&__wrap {
			min-height: 350px;
			display: grid;
			grid-template-columns: auto 420px;
			@include mq('tablet') {
				// padding: 15px;
				grid-template-columns: auto;
			}
			@include mq('mobile') {
				display: block;
			}
		}
		&__content {
			padding: 20px 40px 30px 40px;
			border-right: 1px solid #efeeec;
			display: grid;
			align-items: center;
			align-content: center;
			@include mq('tablet') {
				padding: 20px 20px 0 20px;
			}
			@include mq('mobile') {
				display: block;
			}
		}
		&__form {
			padding: 20px 45px;
			display: grid;
			align-items: center;
			align-content: center;
			@include mq('tablet') {
				padding: 20px;
			}
			@include mq('mobile') {
				display: block;
			}
		}
		&__progress {
			&-label {
				font-size: 12px;
			}
		}
		&__title {
			margin: 20px 0 30px 0;
			text-align: center;
			color: #212529;
			font-size: 24px;
			line-height: 30px;
			word-break: break-word;
		}
		&__description {
			margin-bottom: 30px;
			font-size: 16px;
			font-style: normal;
			color: #888;
			word-break: break-word;
			text-align: center;
			span {
				color: #807f1b;
				font-weight: bold;
			}
		}
		&__field {
			margin-bottom: 20px;
		}
		&__label {
			color: #888;
			display: block;
			font-size: 14px;
			line-height: 14px;
			font-family: Proxima Nova Sb;
		}
		&__input {
			font-family: Proxima Nova Sb;
			&.error {
				.el-input__inner {
					border-color: #F56C6C;
				}
			}
		}
		&__checkbox {
			margin: 0;
		}
	}
</style>