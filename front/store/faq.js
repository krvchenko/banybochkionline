export const state = () => ({
	faqs: null,
})

export const getters = {
	faqs: state => state.faqs,
}

export const mutations = {
	FETCH_FAQS(state, { data }) {
		state.faqs = data
	},
}

export const actions = {
	async fetchFaqs({ commit, params }, payload) {
		try {
			const { data } = await this.$axios.get('/v1/faq')
			commit('FETCH_FAQS', { data: data })
		} catch (e) {}
	},
}
