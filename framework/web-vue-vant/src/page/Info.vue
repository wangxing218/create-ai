<template>
  <div class="text-center pd-lg">{{ msg }}</div>
  <h3>StoreInfo: {{ user.userName }}</h3>
</template>

<script lang="ts" setup>
import { useUseStore } from '@/store'
import { ref } from 'vue'

const msg = ref('msg')
const user = useUseStore()
</script>
