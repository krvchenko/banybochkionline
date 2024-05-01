<template>
	<div class="form-upload">
		<label
			v-if="label"
			:for="name"
			:style="{ color: labelColor }"
			:class="[
				'form-upload__label',
				required && 'form-upload__label_required'
			]"
		>
			{{ label }}
		</label>

		<ul v-if="images" class="form-upload__images">
			<li
				v-for="(item, index) in images"
				class="form-upload__item"
			>
				<nuxt-img
					class="form-upload__img"
					:src="`${mediaUrl}/imgcache/product-gallery/${item.filename}`"
					width="225px"
					height="142px"
					decoding="async"
					loading="lazy"
					format="webp"
				/>
			</li>
		</ul>

		<label
			v-if="!images"
			:for="name"
			class="form-upload__inner"
			@mouseover="hover = true"
			@mouseleave="hover = false"
		>
			<input
				:id="name"
				:name="name"
				type="file"
				class="form-upload__input"
				accept=".jpg, .png"
				multiple
				@change="handleChange"
			>
			<span :class="[
				'btn',
				'btn-outline-primary',
				'form-upload__btn',
				loading && 'form-upload__btn_loading disabled',
				hover && 'form-upload__btn_hover',
				error && 'form-upload__btn_error'
			]">
				<svg-icon
					:class="[
						'form-upload__icon',
						hover && 'form-upload__icon_hover',
						error && 'form-upload__icon_error'
					]"
					icon="file-upload"
					:width="10"
					:height="14"
				/>
				Добавить фото
			</span>
		</label>
		<div v-if="!images">
			<small style="color: #888">jpg/png файлы размером до 3mb</small>
		</div>

		<button
			v-if="images"
			class="btn btn-sm btn-outline-danger"
			@click.prevent="handleRemove"
		>
			Удалить фото
		</button>
	</div>
</template>
<script>
export default {
	name: 'Upload',

	components: {},

	props: {
		label: {
			type: [String, Boolean],
			default: false,
		},
		name: {
			type: String,
			default: 'files',
		},
		error: {
			type: Boolean,
			default: false,
		},
		folder: {
			type: [String],
			default: '',
		},
		labelColor: {
			type: String,
			default: '#222222',
		},
		required: {
			type: Boolean,
			default: false,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		submited: {
			type: Boolean,
			default: false,
		},
	},

	computed: {
		mediaUrl() {
			return this.$config.urls.back
		},
	},

	mounted() {},

	data: () => ({
		loading: false,
		hover: false,
		images: null
	}),

	watch: {
		submited: {
			immediate: false,
			handler(val) {
				if (val) {
					this.images = null
				}
			}
		}
	},

	methods: {
		async upload(data) {
			this.$nuxt.$loading.start()
			this.loading = true
			await this.$axios.post('/v1/images', data)
				.then(response => {
					this.$nuxt.$loading.finish()
					this.loading = false
					this.images = response.data
					this.$emit('submit', response.data)
				})
				.catch(e => {
					this.$nuxt.$loading.finish()
					this.loading = false
				})
		},

		handleChange(event) {
			const formData = new FormData(),
						files = event.target.files

			Object.keys(files).map(i => {
				formData.append(`${this.name}[]`, files[i])
			})

			formData.append('folder', this.folder)

			this.upload(formData)
		},

		handleRemove() {
			this.images = null
			this.$emit('delete')
		}
	},
}
</script>
<style lang="scss">
	.form-upload {
		&__label {
			position: relative;
			display: block;
			margin-bottom: 10px;
			font-weight: bold;
			font-size: 16px;
			line-height: 20px;
			color: #222222;
			&_required {
				display: flex;
				align-items: center;
				&:after {
					margin-left: 8px;
					content: '';
					width: 5px;
					height: 5px;
					display: block;
					line-height: 20px;
					border-radius: 50%;
					background: #F56C6C;
				}
			}
		}
		&__input {
			display: none;
		}

		&__inner {
			margin: 0;
		}

		&__btn {
			display: inline-flex;
			align-items: center;
			&_error {
				color: #F56C6C;
				border-color: #F56C6C;
			}
		}

		&__icon {
			fill: #807f1b;
			margin-right: 10px;
			&_hover {
				fill: #ffffff!important;
			}
			&_error {
				fill: #F56C6C;
			}
		}

		&__images {
			padding: 0;
			margin: 0;
			display: flex;
			list-style: none;
			align-items: flex-end;
			justify-content: center;
			flex-flow: wrap;
		}

		&__item {
			margin: 0 10px 10px 0;
			&:last-child {
				margin-right: 0;
			}
		}
	}
</style>