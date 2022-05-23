<template>
  <div class="height-full flex-column">
    <div class="font-hg mgb-lg">{{ user.userName }}</div>
    <van-button type="primary" @click="getInfo">请求</van-button>
  </div>
</template>

<script lang="ts" setup>
import { post } from '@/service/ajax'
import { useUseStore } from '@/store'

const user = useUseStore()

const getInfo = async () => {
  const info = await post('/data', { id: 12, name: '张三', body: [1, 'wef'] })
  user.setUser({
    userId: info.result.id,
    userName: info.result.name,
  })
}
</script>
