export const state = () => ({
	videos: null,
})

export const getters = {
	videos: state => state.videos,
}

export const mutations = {
	FETCH_VIDEOS(state, { data }) {
		state.videos = data
	},
}

export const actions = {
	async fetchVideos({ commit, params }, payload) {
		try {
			const { data } = await this.$axios.get('/v1/videos')
			commit('FETCH_VIDEOS', { data: data })
		} catch (e) {}
	},
}
