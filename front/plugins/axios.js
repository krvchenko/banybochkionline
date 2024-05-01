export default ({ app, store, redirect, $axios, error: nuxtError }) => {
	$axios.onError(error => {
		const { status } = error.response || {}

		if (status === 404) {
			nuxtError({
				statusCode: error.response.status,
				message: error.message,
			})
			
			return Promise.resolve(false)
		}
	})
}
