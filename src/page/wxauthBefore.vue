<template>
	<div class="wxauthBefore"></div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { defineComponent } from 'vue'

const store = useStore()
store.commit('user/userinfo', {} as any)
</script>
