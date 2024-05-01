// state
export const state = () => ({
	isMobile: false,
	isTablet: false,
	isDesktop: false,
})

// getters
export const getters = {
	isReady: state => state.isMobile || state.isTablet || state.isDesktop,
	isTouch: state => state.isMobile || state.isTablet,
	isMobile: state => state.isMobile,
	isTablet: state => state.isTablet,
	isDesktop: state => state.isDesktop,
}

// mutations
export const mutations = {
	setIsMobile(state, { value }) {
		state.isMobile = value
	},
	setIsTablet(state, { value }) {
		state.isTablet = value
	},
	setIsDesktop(state, { value }) {
		state.isDesktop = value
	},
}

// actions
export const actions = {}
