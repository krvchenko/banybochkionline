<template>
	<nav class="pagination-wrap">
		<ul class="pagination pagination__list">
			<!-- Prev -->
			<li v-if="prevUrl" :class="[
				'page-item',
				'pagination__item',
				'pagination__item_prev'
			]">
				<nuxt-link
					:to="current - 1 !== 1 ? { url: url, query: { page: current - 1 } } : url"
					:class="[
						'page-link',
						'pagination__link',
						'pagination__link_prev'
					]"
					aria-label="Предыдущая страница"
					:disabled="!prevUrl"
				>
					<span aria-hidden="true">&laquo;</span>
				</nuxt-link>
			</li>
			<!-- Pages -->
			<li
				v-for="(item, index) in pages"
				:key="index"
				:class="[
					'page-item',
					'pagination__item',
					item.number === current && 'active',
				]"
			>
				<nuxt-link
					:class="[
						'page-link',
						'pagination__link',
						item.number === current && 'pagination__link_active',
					]"
					:disabled="item.number === current"
					:to="item.number > 1 ? { url: url, query: { page: item.number } } : url"
				>
					{{ item.number }}
				</nuxt-link>
			</li>
			<!-- Next -->
			<li v-if="nextUrl" :class="[
				'page-item',
				'pagination__item',
				'pagination__item_next'
			]">
				<nuxt-link
					:to="{ url: url, query: { page: current + 1 } }"
					:class="[
						'page-link',
						'pagination__link',
						'pagination__link_next'
					]"
					aria-label="Следующая страница"
					:disabled="!nextUrl"
				>
					<span aria-hidden="true">&raquo;</span>
				</nuxt-link>
			</li>
		</ul>
		<div class="pagination__info">
			{{ from }}–{{ to }} из {{ total }}
		</div>
	</nav>
</template>

<script>
	export default {
		name: 'Pagination',

		components: {},

		props: {
			last: {
				type: Number,
				required: true,
			},
			current: {
				type: Number,
				required: true,
			},
			prevUrl: {
				type: String,
				required: false,
			},
			nextUrl: {
				type: String,
				required: false,
			},
			from: {
				type: Number,
				required: true,
			},
			to: {
				type: Number,
				required: true,
			},
			total: {
				type: Number,
				required: true,
			},
			url: {
				type: String,
				default: '/'
			}
		},

		data: () => ({}),

		created() {},

		computed: {
			pages() {
				let range = []

				for (var i = 0; i < this.last; i++) {
					range.push({
						number: i + 1,
					})
				}

				if (this.current > 3 && this.current + 3 < this.last) {
					range = range.slice(this.current - 3, this.current + 2)
				} else if (this.current + 2 >= this.last) {
					range = range.slice(Math.max(0, this.last - 5), this.last)
				} else {
					range = range.slice(0, 5)
				}

				return range
			},
		},

		watch: {},

		methods: {
			handlePageNext() {
				this.$emit('next', this.current + 1)
			},
			handlePagePrev() {
				this.$emit('prev', this.current - 1)
			},
			// handlePageChange(number) {
			// 	number === this.current ? return false : this.$emit('change', number)
			// },
			// handleShowMore() {
			// 	!this.nextUrl ? return false : this.$emit('more')
			// },
		},
	}
</script>

<style lang="scss">
	.pagination {
		align-items: center;
		margin: 0;
		&-wrap {
			margin: 30px 0;
			display: flex;
			align-items: center;
		}
		&__link	{
			line-height: normal;
			text-decoration: none;
		}
		&__info {
			margin-left: 15px;
		}
	}
</style>
