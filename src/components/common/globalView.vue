<template>
	<div class="globalView">
		<router-view v-slot="{ Component }" class="router flex-grow h-full fullScreen">
			<component :is="Component"></component>
		</router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'GlobalView',
	setup() {
		return {}
	},
})
</script>

<style lang="scss" scoped>
.globalView {
}
</style>
