<template>
	<!-- <div v-show="!ready" class="offline">您的设备已离线, 请检查网络连接!</div> -->
	<div ref="div" class="app-page flex h-full w-full bg-font-gray">
		<router-view v-slot="{ Component }" class="router flex-grow h-full">
			<!-- <keep-alive> -->
			<component :is="Component"></component>
			<!-- </keep-alive> -->
		</router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'AppPage',
	components: {},
})
</script>

<style lang="scss" scoped>
$menuWidth: 60px;
.offline {
	position: relative;
	color: var(--yellow);
	padding: 4px 10px;

	&::before {
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
		background-color: var(--yellow);
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0.2;
	}
}
.app-page {
	.leftMenuPosition {
		width: $menuWidth;
		flex-shrink: 0;
	}
	> ::v-deep(.router) {
		flex-grow: 1;
		width: 100%;
		//background-color: var(--bgColor);
	}
}
</style>
