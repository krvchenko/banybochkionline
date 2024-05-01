<template>
	<form
		class="product-filters"
		@submit.prevent="submit"
	>
		<div class="product-filters__menu">
			<label class="product-filters__label" for="category">Категория</label>
			<ul class="product-filters__categories">
				<li
					v-for="(item, index) in mainCategories"
					:key="item.id"
					class="product-filters__category"
				>
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						:to="item.slug"
					>
						<a
							:class="[
								'btn btn-outline-primary',
								isExactActive  && 'active'
							]"
							:href="href"
							@click="navigate"
						>
							{{ item.title }}
						</a>
					</nuxt-link>
				</li>
			</ul>
			<ul v-if="category && category.id !== 16" class="product-filters__categories">
				<li
					v-for="(item, index) in categories.length ? categories : category.parent.childrens"
					:key="item.id"
					class="product-filters__category"
				>
					<nuxt-link
						v-slot="{ href, route, navigate, isActive, isExactActive }"
						:to="item.slug"
					>
						<a
							:class="[
								'btn btn-outline-primary',
								isExactActive  && 'active'
							]"
							:href="href"
							@click="navigate"
						>
							{{ item.title }}
						</a>
					</nuxt-link>
				</li>
			</ul>
		</div>
		<!-- 
		<div class="product-filters__row">
			<div class="product-filters__group">
				<label class="product-filters__label">Общая длина (см)</label>
				<div class="product-filters__wrap">
					<form-input
						class="product-filters__input"
						v-model="selected.total_length_from"
						placeholder="от"
						type="text"
						name="total_length_from"
					/>
					<form-input
						class="product-filters__input"
						v-model="selected.total_length_to"
						placeholder="до"
						type="text"
						name="total_length_to"
					/>
				</div>
			</div>

			<div class="product-filters__group">
				<label class="product-filters__label">Длина парной (см)</label>
				<div class="product-filters__wrap">
					<form-input
						class="product-filters__input"
						v-model="selected.steam_room_length_from"
						placeholder="от"
						type="text"
						name="steam_room_length_from"
					/>
					<form-input
						class="product-filters__input"
						v-model="selected.steam_room_length_to"
						placeholder="до"
						type="text"
						name="steam_room_length_to"
					/>
				</div>
			</div>

			<div class="product-filters__group">
				<label class="product-filters__label">Цена</label>
				<div class="product-filters__wrap">
					<form-input
						class="product-filters__input"
						v-model="selected.price_from"
						placeholder="от"
						type="text"
						name="price_from"
					/>
					<form-input
						class="product-filters__input"
						v-model="selected.price_to"
						placeholder="до"
						type="text"
						name="price_to"
					/>
				</div>
			</div>

			<div class="product-filters__group">
				<div class="btn-group product-filters__btn-group" role="group" aria-label="submit">
					<form-submit-button
						class="btn btn-primary product-filters__btn"
						label="Применить"
						size="sm"
						:loading="loading"
					/>
					<button
						type="button"
						class="btn btn-outline-primary product-filters__btn"
						@click="handleClear"
					>
						Сбросить фильтры
					</button>
				</div>
			</div>
		</div>
		-->
	</form>
</template>
<script>

import { mapGetters } from 'vuex'
import FormInput from '~/components/form/Input'
import FormSubmitButton from '~/components/form/SubmitButton'

export default {
	name: 'Filters',

	components: {
		FormInput,
		FormSubmitButton,
	},

	props: {
		categories: {
			type: Array,
			default: () => {
				return []
			}
		}
	},

	computed: {
		...mapGetters({
			category: 'product/category'
		}),
	},

	mounted() {
		if (this.category) {
			if (this.category.parent_id) {
				this.selected.category = this.category.parent
				this.selected.type = this.category
			}

			if (this.category.childrens.length) {
				this.selected.category = this.category
			}
		}
	},

	data: () => ({
		loading: false,
		mainCategories: [
			{
				title: 'Все проекты',
				id: null,
				slug: '/projects'
			},
			{
				title: 'Бани бочки',
				id: 1,
				slug: '/bani-bochki'
			},
			{
				title: 'Бани квадро бочки',
				id: 2,
				slug: '/bani-kvadro-bochki'
			},
			// {
			// 	title: 'Купели',
			// 	id: 3,
			// 	slug: '/kupeli'
			// },
		],
		selected: {
			category: null,
			type: null,
			total_length_from: null,
			total_length_to: null,
			steam_room_length_from: null,
			steam_room_length_to: null,
			price_from: null,
			price_to: null,
		},
	}),

	methods: {
		async submit() {
			this.loading = true
			this.$nuxt.$loading.start()

			await this.$axios.get('/v1/products', {
				params: {
					...this.selected,
					disable_cache: true,
				}
			})
			.then(res => {
				this.loading = false
				this.$nuxt.$loading.finish()
				this.$store.commit('product/FETCH_PRODUCTS', { data: res.data })
			})
			.catch(e => {})
		},

		handleClear() {
			Object.keys(this.selected).forEach(key => {
				this.selected[key] = null
			})

			this.submit()
		},

		handleCategoryChange(val) {
			this.$router.push(`/${val.slug}`)
		}
	},
}
</script>
<style lang="scss">
	.product-filters {
		&__row {
			margin-bottom: 28px;
			display: grid;
			grid-template-columns: repeat(4, 1fr);
			grid-column-gap: 28px;
			align-items: end;
			@include mq('laptop') {
				grid-template-columns: repeat(2, 1fr);
				grid-row-gap: 28px;
			}
			@include mq('tablet') {
				grid-template-columns: repeat(1, 1fr);
			}
			&_last {
				margin-bottom: 0;
			}
			&:last-child {
				margin-bottom: 0;
			}
		}
		&__group {

		}
		&__wrap {
			display: flex;
			.form-input {
				margin-right: 28px;
				&:last-child {
					margin: 0;
				}
			}
		}
		&__select {
			width: 100%;
		}
		&__label {
			display: block;
			margin-bottom: 5px;
			font-weight: 700;
		}
		&__input {
			width: 100%;
		}
		&__btn {
			font-size: 1rem;
			white-space: nowrap;
		}
		&__btn-group {
			width: 100%;
		}
		&__menu {
			// margin-bottom: 10px;
		}
		&__categories {
			padding: 0;
			margin: 0;
			list-style: none;
			display: flex;
			flex-flow: wrap;
		}
		&__category {
			margin: 0 10px 10px 0;
		}
	}
</style>