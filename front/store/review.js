export const state = () => ({
	reviews: null,
	review: null,
	products: null
})

export const getters = {
	reviews: state => state.reviews,
	review: state => state.review,
	products: state => state.products,
}

export const mutations = {
	FETCH_REVIEWS(state, { data }) {
		state.reviews = data
	},
	FETCH_REVIEW(state, { data }) {
		state.review = data
	},
	FETCH_PRODUCTS(state, { data }) {
		state.products = data
	},
}

export const actions = {
	async fetchReview({ commit }, params) {
		try {
			const { data } = await this.$axios.get(`/v1/reviews/${params.slug}`)

			commit('FETCH_REVIEW', { data: data.item })
			commit('FETCH_PRODUCTS', { data: data.products })
		} catch (e) {}
	},

	async fetchReviews({ commit, params }, payload) {
		try {
			const { data } = await this.$axios.get('/v1/reviews', {
				params: payload
			})
			commit('FETCH_REVIEWS', { data: data })
		} catch (e) {}
	},
}
