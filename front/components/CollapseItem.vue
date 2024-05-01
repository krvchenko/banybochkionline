<template>
	<div
		itemscope=""
		itemprop="mainEntity"
		itemtype="https://schema.org/Question"
		class="collapse-item"
	>
		<div
			class="collapse-item__toggle"
			@click="toggleCollapse('target')"
		>
			<h3 itemprop="name" class="collapse-item__title">
				{{ title }}
				<slot name="title" />
			</h3>
		</div>

		<div
			itemscope=""
			itemprop="acceptedAnswer"
			itemtype="https://schema.org/Answer"
			:class="classArrs['target']"
			:style="styleObjs['target']"
			ref="target"
		>
			<div itemprop="text" class="collapse-item__body">
				<div v-html="text"></div>
				<slot name="text" />
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'CollapseItem',

	components: {},

	props: {
		title: {
			type: String,
		},
		text: {
			type: String,
		}
	},

	computed: {},

	mounted() {
		document.onreadystatechange = () => {
			if (document.readyState === 'complete') {
				this.toggleCollapse('target')
			}
		}
		// window.addEventListener('resize', () => {
		// 	setTimeout(() => {
		// 		this.toggleCollapse('target')
		// 	}, 100)
		// })
	},

	data: () => ({
		classArrs: {
			target: ['collapse']
		},
		styleObjs: {
			target: {}
		}
	}),

	methods: {
		toggleCollapse(ref) {
			let show = this.classArrs[ref].indexOf('show') > -1 ? false : 'show'
			this.classArrs[ref] = ['collapsing']
			setTimeout(() => {
				if (show) {
					let height = this.$refs[ref].firstChild.clientHeight + 'px';
					this.styleObjs[ref] = { height }
				} else {
					this.styleObjs[ref] = {}
				}
			}, 10)
			setTimeout(() => {
				this.classArrs[ref] = ['collapse', show]
			}, 340)
		}
	},
}
</script>
<style lang="scss">
	.collapse-item {
		background: #e0e0e0;
		border: 1px solid #e0e0e0;
		margin-bottom: 15px;
		// padding: 0 10px;
		border-radius: 4px;
		&__toggle {
			padding: 10px 40px 10px 20px;
			position: relative;
			cursor: pointer;
		}
		&__title {
			color: #807f1b;
			font-size: 18px;
			line-height: 24px;
			margin: 0;
			line-height: normal;
		}
		&__body {
			padding: 10px 20px;
			font-size: 16px;
			background: #fff;
			// margin: 0 -10px;
		}
	}
</style>