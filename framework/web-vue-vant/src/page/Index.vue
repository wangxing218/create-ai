<template>
  <div class="height-full flex-column">
    <div class="font-hg mgb-lg">{{ user.userName }}</div>
    <div
      @drop.prevent="drop"
      @dragend.prevent
      @dragover.prevent
      style="border: 10px solid #ccc; padding: 10px"
    ></div>
    <input type="file" webkitdirectory @change="fileChange" />
    <van-button type="primary" @click="getInfo">
      <div slot="icon"><Icon name="plus"></Icon></div>
    </van-button>
    <component :is="Tabs" v-model:active="state.total" v-bind="itemProps" v-on="itemEvent">
      <component :is="Tab" title="标签一" :name="0">这个怎么样</component>
      <component :is="Tab" title="标签二" :name="1">tab2</component>
    </component>
    <ul>
      <li v-for="item in state.userList" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { getUserList, getUserInfo } from '@/service/user'
import { useUseStore } from '@/store'
import { getCurrentInstance, onMounted, reactive } from 'vue'
import { Tab, Tabs, Icon } from 'vant'

// data
const state = reactive({
  userList: [] as ListItem[],
  pageIndex: 1,
  pageSize: 10,
  total: 0,
})
const user = useUseStore()
const itemProps = reactive({
  type: 'card',
  round: true,
  class: state.total,
})
const itemEvent = {
  change(val: number, title: string, $event: any) {
    console.log(val, title, $event)
    itemProps.type = itemProps.type === 'line' ? 'card' : 'line'
  },
  mousemove: (e: any) => {
    console.log('e :>> ', e)
  },
}

const app = getCurrentInstance()

// init
onMounted(() => {
  renderList()
})

const drop = (e: DragEvent) => {
  console.log('types :>> ', e?.dataTransfer?.types)
  console.log('items :>> ', e?.dataTransfer?.items)
  console.log('files :>> ', e?.dataTransfer?.files)

  for (let file of e?.dataTransfer?.files as any) {
    console.log('file :>> ', file)
  }
  for (let key of e?.dataTransfer?.items as any) {
    console.log('key :>> ', key)
  }
}

function fileChange(e: any) {
  console.log('e :>> ', e.target.files)
}

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
