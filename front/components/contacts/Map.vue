<template>
	<div class="contacts-map">
		<client-only>
			<yandex-map
				:coords="[59.218885, 39.908968]"
				:controls="['zoomControl', 'fullscreenControl']"
				:zoom="13"
				:scroll-zoom="false"
				:callbacks="{ click: getDataPoint }"
				:options="{ 
					suppressMapOpenBlock: true,
					autoFitToViewport: 'always'
				}"
				@map-was-initialized="initHandler"
			>
				<ymap-marker
					marker-id="contacts"
					marker-type='Placemark'
					:coords="[59.218885, 39.908968]"
					:callbacks="{ click: getDataPoint }"
					:options="{
						iconColor: '#807F1B'
					}"
				>
					<map-balloon slot="balloon" />
				</ymap-marker>
			</yandex-map>
		</client-only>
	</div>
</template>

<script>

import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import MapBalloon from '~/components/contacts/MapBalloon'

export default {
	name: 'Map',

	components: {
		yandexMap,
		ymapMarker,
		MapBalloon
	},

	props: {},

	mounted() {

	},

	data: () => ({}),

	methods: {
		getDataPoint(obj) {},
		initHandler(obj) {}
	}
};
</script>

<style lang="scss">
.contacts-map {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
}
.ymap-container {
	height: 100%;
}
</style>
