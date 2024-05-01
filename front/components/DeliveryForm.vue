<template>
	<form
		class="delivery-form"
		@submit.prevent="submit"
	>
		<div class="delivery-form__group">
			<v-select
				class="delivery-form__select"
				v-model="form.region_id"
				name="region_id"
				label="title"
				placeholder="Выберите город"
				:clearable="false"
				:filterable="false"
				:options="regions"
				:reduce="region => region.id" 
				@search="onSearch"
			>
				<template slot="no-options">
					Введите название города...
				</template>
			</v-select>
			<form-submit-button
				class="delivery-form__btn delivery-form__btn_submit"
				:size="isMobile ? 'lg': 'md'"
				label="Расчитать стоимость доставки!"
				:loading="form.busy"
			/>
<!-- 			<button
				class="btn btn-outline-primary delivery-form__btn delivery-form__btn_calc"
			>Расчитать стоимость доставки!</button>

			<button
				class="btn btn-primary delivery-form__btn delivery-form__btn_submit"
				@click.prevent="handleContactsClick"
			>Отправить заявку</button> -->
		</div>

		<transition name="fade">
			<has-error :form="form" field="region_id" />
		</transition>

		<transition name="fade">
			<div
				v-if="result"
				class="delivery-form__group"
			>
				<h4>Приблизительная стоимость доставки в г. {{ result.city }} - <span style="color: #807F1B;">{{ result.cost }}</span> рублей.</h4>
			</div>
		</transition>
	</form>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Form from 'vform'
	import FormSubmitButton from '~/components/form/SubmitButton'

	export default {
		name: 'DeliveryForm',

		components: {
			FormSubmitButton,
		},

		computed: {
			...mapGetters({
				isMobile: 'responsive/isMobile',
				isTablet: 'responsive/isTablet'
			}),
		},

		data: () => ({
			regions: [],
			result: null,
			form: new Form({
				region_id: null,
			}),
		}),

		mounted() {},

		methods: {
			handleContactsClick() {
				this.$store.dispatch('modal/setContacts', true)
			},
			onSearch(search, loading) {
				if(search.length) {
					loading(true)
					this.search(loading, search.toLowerCase(), this)
				}
			},
			async search(loading, search, vm) {
				await this.$axios.get('/v1/delivery/regions', {
					params: {
						query: search
					}
				})
				.then(res => {
					this.regions = res.data
					loading(false)
				})
				.catch(e => {
				})
			},
			async submit() {
				this.$nuxt.$loading.start()
				this.form
					.post('/v1/delivery/calculate')
					.then(res => {
						this.result = {
							cost: res.data.cost,
							city: res.data.region.title,
						}
						this.$nuxt.$loading.finish()
						this.$store.dispatch('modal/setContacts', {
							open: true,
							data: this.result
						})
					})
					.catch(e => {})
			},

			debounce(func, wait, immediate) {
				let timeout

				return function executedFunction() {
						let	args = arguments
						
					let later = () => {
						timeout = null
						if (!immediate) func.apply(this, args)
					}

					let callNow = immediate && !timeout
				
					clearTimeout(timeout)

					timeout = setTimeout(later, wait)
				
					if (callNow) func.apply(this, args)
				}
			}
		},
	}
</script>

<style lang="scss">
	.delivery-form {
		&__group {
			display: flex;
			align-items: center;
			@include mq('mobile') {
				flex-flow: column;
			}
		}
		&__select {
			margin-right: 30px;
			max-width: 100%;
			width: 300px;
			@include mq('mobile') {
				margin-bottom: 30px;
				width: 100%;
				margin-right: 0;
			}
		}
		&__btn {
			margin-right: 30px;
			white-space: nowrap;
			// font-size: 16px;
			font-weight: 400;
			@include mq('mobile') {
				margin: 0;
				width: 100%;
			}
			&_submit {
				font-weight: 700;
			}
			&_calc {
				font-weight: 700;
			}
		}
	}
</style>
