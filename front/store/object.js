export const state = () => ({
	objects: null,
	object: null,
	related: null
})

export const getters = {
	objects: state => state.objects,
	object: state => state.object,
	related: state => state.related,
}

export const mutations = {
	FETCH_OBJECTS(state, { data }) {
		state.objects = data
	},
	FETCH_OBJECT(state, { data }) {
		state.object = data
	},
	FETCH_RELATED(state, { data }) {
		state.related = data
	},
}

export const actions = {
	async fetchObject({ commit }, params) {
		try {
			const { data } = await this.$axios.get(`/v1/objects/${params.slug}`)

			commit('FETCH_OBJECT', { data: data })
		} catch (e) {}
	},

	async fetchObjects({ commit, params }, payload) {
		try {
			const { data } = await this.$axios.get('/v1/objects', {
				params: payload
			})
			commit('FETCH_OBJECTS', { data: data })
		} catch (e) {}
	},
}
