export const state = () => ({
	modalOpened: false,
})

export const getters = {
	modalOpened: state => state.modalOpened,
}

export const mutations = {
	setModalOpened(state, value) {
		state.modalOpened = value
	},
}

export const actions = {
	setModalOpened({ commit }, value) {
		commit('setModalOpened', value)
	},
}
