export const state = () => ({
	products: null,
	product: null,
	related: null,
	tours: null,
})

export const getters = {
	products: state => state.products,
	product: state => state.product,
	category: state => state.category,
	related: state => state.related,
	tours: state => state.tours,
}

export const mutations = {
	FETCH_PRODUCTS(state, { data }) {
		state.products = data
	},
	FETCH_PRODUCT(state, { data }) {
		state.product = data
	},
	FETCH_CATEGORY(state, { data }) {
		state.category = data
	},
	FETCH_RELATED(state, { data }) {
		state.related = data
	},
	FETCH_TOURS(state, { data }) {
		state.tours = data
	},
}

export const actions = {
	async fetchProduct({ commit }, params) {
		try {
			const { data } = await this.$axios.get(`/v1/products/${params.category}/${params.slug}`)

			commit('FETCH_PRODUCT', { data: data.item })
			commit('FETCH_RELATED', { data: data.related })
		} catch (e) {}
	},

	async fetchProducts({ commit }, { params }) {
		try {
			const { data } = await this.$axios.get('/v1/products', {
				params: params
			})

			commit('FETCH_PRODUCTS', { data: data })
		} catch (e) {}
	},

	// Categories
	async fetchCategory({ commit }, params) {
		try {
			const { data } = await this.$axios.get('/v1/category', {
				params: { slug: params.category ? params.category : 'projects' }
			})

			commit('FETCH_CATEGORY', { data: data })
		} catch (e) {}
	},

	async fetchTours({ commit }, payload) {
		try {
			const { data } = await this.$axios.get('/v1/tours', {
				params: payload
			})

			commit('FETCH_TOURS', { data: data })
		} catch (e) {}
	},
}
