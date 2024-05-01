/* eslint-disable import/prefer-default-export */
export const actions = {
	nuxtServerInit({ commit, dispatch }, ctx) {
		commit('responsive/setIsMobile', {
			value: ctx.isMobile,
		})
		commit('responsive/setIsTablet', {
			value: ctx.isTablet,
		})
		commit('responsive/setIsDesktop', {
			value: ctx.isDesktop,
		})
	},
	nuxtClientInit({ commit, dispatch }) {
		window.addEventListener('resize', () => {
			commit('responsive/setIsMobile', {
				value: window.innerWidth < 768,
			})
			commit('responsive/setIsTablet', {
				value: window.innerWidth >= 768 && window.innerWidth < 1280,
			})
			commit('responsive/setIsDesktop', {
				value: window.innerWidth >= 1280,
			})
		})
	},
}
