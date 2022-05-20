<template>
  <div>{{ state.msg }}</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
const state = reactive({
  msg: 'msg',
})
</script>
