export const state = () => ({
	opened: false,
})

export const getters = {
	opened: state => state.opened,
}

export const mutations = {
	SET_OPENED(state, value) {
		state.opened = value
	},
}

export const actions = {
	setOpened({ commit }, value) {
		commit('SET_OPENED', value)
	}
}
