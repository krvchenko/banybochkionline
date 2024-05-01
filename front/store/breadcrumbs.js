export const state = () => ({
	breadcrumbs: [],
})

export const getters = {
	breadcrumbs: state => state.breadcrumbs,
}

export const mutations = {
	SET_BREADCRUMBS(state, data) {
		state.breadcrumbs = data
	},
}

export const actions = {}
