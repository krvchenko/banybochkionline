export const state = () => ({
	contacts: false,
	cost: null,
})

export const getters = {
	contacts: state => state.contacts,
	cost: state => state.cost,
}

export const mutations = {
	setContacts(state, value) {
		state.contacts = value
	},
	setCost(state, value) {
		state.cost = value
	},
}

export const actions = {
	setContacts({ commit }, value) {
		commit('setContacts', value.open)
		commit('setCost', value.data)
	},
}
