<template>
  <div class="height-full flex-column">
    <div class="font-hg mgb-lg">{{ appName }}</div>
    <van-button type="primary" @click="getInfo">请求</van-button>
  </div>
</template>

<script lang="ts" setup>
import { get, post, postForm } from '@/service/ajax'
import { ref } from 'vue'

const appName = ref('Vue App')

const getInfo = async () => {
  const info = await post('/data', { id: 12, name: '张三', body: [1, 'wef'] })
  appName.value = info.result.name
}
</script>
