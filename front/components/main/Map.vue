<template>
	<div class="main-map">
		<client-only>
			<yandex-map
				:coords="[55.755864, 37.617698]"
				:controls="['zoomControl', 'fullscreenControl']"
				:zoom="6"
				:scroll-zoom="false"
				:callbacks="{ click: getDataPoint }"
				:options="{ 
					suppressMapOpenBlock: true,
					autoFitToViewport: 'always'
				}"
				:cluster-options="{
					1: { 
						clusterDisableClickZoom: false, 
						hasBalloon: false,
						clusterIconColor: '#807F1B',
				}}"
				@map-was-initialized="initHandler"
			>
				<ymap-marker
					v-for="(item, index) in placemarks"
					:key="index"
					:marker-id="index"
					marker-type='Placemark'
					:coords="item.coords"
					:callbacks="{ click: getDataPoint }"
					:options="{
						iconColor: '#807F1B'
					}"
					cluster-name="1"
				>
					<map-balloon
						slot="balloon"
						:title="item.title"
						:slug="item.slug"
						:location="item.location"
					/>
				</ymap-marker>
			</yandex-map>
		</client-only>
	</div>
</template>

<script>

import { yandexMap, ymapMarker } from 'vue-yandex-maps'
import MapBalloon from '~/components/main/MapBalloon'

export default {
	name: 'Map',

	components: {
		yandexMap,
		ymapMarker,
		MapBalloon
	},

	props: {
		placemarks: {
			type: Array,
			required: true
		},
	},

	mounted() {

	},

	data: () => ({
		map: {}
	}),

	methods: {
		getDataCluster(obj) {
			const clust = this.map.geoObjects.get(0);
			this.map.setBounds(clust.getBounds());
			this.$emit('set-coords', obj.get('coords'));
			this.$emit('get-data-point', obj.get('coords').join());
		},
		getDataPoint(obj) {

		},
		initHandler(obj) {
			// this.map = obj;
		}
	}
};
</script>

<style lang="scss">
.main-map {
	height: 500px;
	width: 100%;
}
.ymap-container {
	height: 100%;
}

.cluster-icon {
	background: lime;
	color: tomato;
}
</style>

