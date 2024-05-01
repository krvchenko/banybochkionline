<template>
	<form
		class="review-form"
		@submit.prevent="submit"
	>
		<h2 class="review-form__title">
			<template v-if="!form.successful">Оставить отзыв</template>
			<template v-else>Благодарим Вас за отзыв!</template>
		</h2>

		<transition name="fade">
			<div v-if="!form.successful" class="review-form__body">
				<div class="review-form-group">
					<form-upload
						name="images"
						folder="review"
						label="Фото"
						:submited="form.successful"
						:error="form.errors.has('images')"
						@submit="handleUpload"
						@delete="handleDelete"
					>
					</form-upload>
					<transition name="fade">
						<has-error :form="form" field="images" />
					</transition>
				</div>

				<div class="review-form-group">
					<form-input
						v-model="form.title"
						placeholder="ФИО"
						type="text"
						name="title"
						label-color="#636363"
						:required="true"
						:loading="form.busy"
						:error="form.errors.has('title')"
					/>
					<transition name="fade">
						<has-error :form="form" field="title" />
					</transition>
				</div>

				<div class="review-form-group">
					<form-textarea
						v-model="form.description"
						placeholder="Сообщение"
						name="description"
						label-color="#636363"
						:required="true"
						:loading="form.busy"
						:error="form.errors.has('description')"
					/>
					<transition name="fade">
						<has-error :form="form" field="description" />
					</transition>
				</div>

				<div class="review-form-group">
					<form-checkbox
						class="review-form__form-checkbox"
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
				
				<div class="review-form-group">
					<form-submit-button
						class="btn-review-form"
						label="Оставить отзыв"
						:loading="form.busy"
						:size="isMobile ? 'lg' : 'md'"
					>
					</form-submit-button>
				</div>
			</div>

		</transition>
	</form>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import FormInput from '~/components/form/Input'
	import FormCheckbox from '~/components/form/Checkbox'
	import FormTextarea from '~/components/form/Textarea'
	import FormUpload from '~/components/form/Upload'
	import FormSubmitButton from '~/components/form/SubmitButton'

	export default {
		name: 'ReviewForm',

		components: {
			FormInput,
			FormCheckbox,
			FormTextarea,
			FormUpload,
			FormSubmitButton
		},

		computed: {
			...mapGetters({
				isMobile: 'responsive/isMobile',
				isTablet: 'responsive/isTablet'
			}),
		},

		data: () => ({
			form: new Form({
				title: null,
				description: null,
				terms: null,
				images: null
			}),
		}),

		mounted() {},

		methods: {
			handleUpload(data) {
				this.form.images = data.map(item => { return item.id })
			},

			handleDelete() {
				this.form.images = null
			},

			async submit() {
				// const token = await this.$recaptcha.getResponse()
				// this.form['g-recaptcha-response'] = token
				this.$nuxt.$loading.start()

				this.form
					.post('/v1/reviews')
					.then(response => {
						this.$emit('submit')
						this.form.reset()
						this.$nuxt.$loading.finish()
					})
					.catch(e => {})
			},
		},
	}
</script>

<style lang="scss">
	.review-form {
		max-width: 640px;
		margin: 0 auto;
		text-align: center;
		&-group {
			position: relative;
			margin-bottom: 24px;
			&:last-child {
				margin: 0;
			}
		}

		&__title {
			margin-top: 0;
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

		&__form-checkbox {
			display: inline-flex;
		}
	}

	@include mq('laptop') {
		.review-form {
			&__review {
				column-gap: 20px;
			}
		}
	}

	@include mq('tablet') {
		.review-form {
			&__review {
				grid-template-columns: 1fr;
				row-gap: 24px;
			}
		}

		.btn-review-form {
			max-width: none;
			width: 100%;
		}
	}
</style>
