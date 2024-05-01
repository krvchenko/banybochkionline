import GLightbox from 'glightbox'

export default ({ app }, inject) => {
	inject('glightbox', (props) => {
		return new GLightbox(props)
	} )
}