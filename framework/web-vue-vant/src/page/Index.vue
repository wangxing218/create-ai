<template>
  <div class="height-full flex-column">
    <div class="font-hg mgb-lg">{{ user.userName }}</div>
    <van-button type="primary" @click="getInfo">请求</van-button>
    <ul>
      <li v-for="item in state.userList" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getUserList, getUserInfo } from '@/service/user'
import { useUseStore } from '@/store'
import { onMounted, reactive } from 'vue'

// data
const state = reactive({
  userList: [] as ListItem[],
  pageIndex: 1,
  pageSize: 10,
  total: 0,
})
const user = useUseStore()

// init
onMounted(() => {
  renderList()
})

// method
const getInfo = async () => {
  const res = await getUserInfo(1)
  user.setUser({
    userId: res.result.id,
    userName: res.result.name,
  })
}

// getList
const renderList = async () => {
  const res = await getUserList({
    pageIndex: state.pageIndex,
    pageSize: state.pageSize,
  })
  state.userList = res.result.data
  state.total = res.result.total
}
</script>
