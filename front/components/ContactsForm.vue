<template>
	<form
		class="contacts-form"
		@submit.prevent="submit"
		@keydown="form.onKeydown($event)"
	>
		<slot name="header" />

		<div class="contacts-form-group">
			<form-input
				v-model="form.name"
				placeholder="Ваше имя"
				type="text"
				name="name"
				label-color="#636363"
				:required="true"
				:loading="form.busy"
				:error="form.errors.has('name')"
			/>
			<transition name="fade">
				<has-error :form="form" field="name" />
			</transition>
		</div>

		<div class="contacts-form-group">
			<form-input
				v-mask="phoneMask"
				v-model="form.phone"
				placeholder="Ваш телефон*"
				type="tel"
				autocorrect="off"
				autocomplete="on"
				name="phone"
				inputmode="numeric"
				label-color="#636363"
				:required="true"
				:loading="form.busy"
				:error="form.errors.has('phone')"
			/>
			<transition name="fade">
				<has-error :form="form" field="phone" />
			</transition>
		</div>

		<div class="contacts-form-group">
			<form-textarea
				v-model="form.message"
				placeholder="Сообщение"
				name="message"
				label-color="#636363"
				:required="true"
				:loading="form.busy"
				:error="form.errors.has('message')"
			/>
			<transition name="fade">
				<has-error :form="form" field="message" />
			</transition>
		</div>

		<div class="contacts-form-group">
			<form-checkbox
				v-model="form.terms"
				label="Принимаю"
				:true-value="1"
				:false-value="null"
			>
				<a class="payments-form__link" href="/policy" target="_blank"
					> условия передачи и хранения данных</a
				>
			</form-checkbox>
			<transition name="fade">
				<has-error :form="form" field="terms" />
			</transition>
		</div>

		<!-- <recaptcha /> -->

		<div class="contacts-form-group">
			<form-submit-button
				class="btn-block btn-contacts-form"
				label="Отправить"
				:loading="form.busy"
				size="md"
			>
			</form-submit-button>
		</div>
	</form>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import FormInput from '~/components/form/Input'
	import FormCheckbox from '~/components/form/Checkbox'
	import FormTextarea from '~/components/form/Textarea'
	import FormSubmitButton from '~/components/form/SubmitButton'

	export default {
		name: 'ContactsForm',

		components: {
			FormInput,
			FormCheckbox,
			FormTextarea,
			FormSubmitButton
		},

		computed: {
			...mapGetters({}),

			phoneMask() {
				return '+7 ### ### ## ##'
			},

			// phone() {
			// 	if (this.form.phone && this.form.phone.charAt(0) === '8') {
			// 		return this.form.phone.replace('8', '+7')
			// 	}

			// 	return this.form.phone
			// }
		},

		data: () => ({
			form: new Form({
				name: null,
				phone: '+7',
				message: null,
				terms: null,
			}),
		}),

		mounted() {},

		methods: {
			async submit() {
				// const token = await this.$recaptcha.getResponse()

				// this.form['g-recaptcha-response'] = token

				// this.form.phone = this.phone
				
				this.$nuxt.$loading.start()

				this.form
					.post('/v1/contacts')
					.then(response => {
						this.$emit('submit')
						this.form.reset()
						this.$nuxt.$loading.finish()
						if (process.env.NODE_ENV === 'production') {
							ym(43459729, 'reachGoal', 'contacts')
						}
						this.$store.dispatch('modal/setContacts', false)
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	.contacts-form {
		&-group {
			position: relative;
			margin-bottom: 24px;
			&:last-child {
				margin: 0;
			}
		}

		&__link {
			margin-left: 2px;
			font-family: Proxima Nova;
			font-size: 14px;
			line-height: 20px;
			text-decoration-line: underline;
			font-feature-settings: 'tnum' on, 'lnum' on;
			color: #008be2;
		}
	}

	@include mq('laptop') {
		.contacts-form {
			&__contacts {
				column-gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.contacts-form {
			&__contacts {
				grid-template-columns: 1fr;
				row-gap: 24px;
			}
		}

		.btn-contacts-form {
			max-width: none;
			width: 100%;
		}
	}
</style>
