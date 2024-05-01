export const state = () => ({
	posts: null,
	post: null,
	products: null
})

export const getters = {
	posts: state => state.posts,
	post: state => state.post,
	products: state => state.products,
}

export const mutations = {
	FETCH_POSTS(state, { data }) {
		state.posts = data
	},
	FETCH_POST(state, { data }) {
		state.post = data
	},
	FETCH_PRODUCTS(state, { data }) {
		state.products = data
	},
}

export const actions = {
	async fetchPost({ commit }, params) {
		try {
			const { data } = await this.$axios.get(`/v1/posts/${params.slug}`)

			commit('FETCH_POST', { data: data.item })
			commit('FETCH_PRODUCTS', { data: data.products })
		} catch (e) {}
	},

	async fetchPosts({ commit, params }, payload) {
		try {
			const { data } = await this.$axios.get('/v1/posts', {
				params: payload
			})
			commit('FETCH_POSTS', { data: data })
		} catch (e) {}
	},
}
