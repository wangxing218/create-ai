<template>
  <div class="pd-md height-full">
    <div class="flex-column align-stretch height-full">
      <div class="bg-white flex pd-md pdb-xs mgb-md">
        <div class="flex-1">
          <a-form :model="{}" layout="inline">
            <a-form-item label="姓名">
              <a-input placeholder="搜索姓名"></a-input>
            </a-form-item>
            <a-form-item label="创建时间">
              <a-range-picker />
            </a-form-item>
          </a-form>
        </div>
        <a-button type="primary" @click="getDataList(true)">搜索</a-button>
      </div>
      <div class="flex-1 bg-white height-10p pdb-sm">
        <a-table
          :columns="state.columns"
          :data="state.dataList"
          :loading="state.loading"
          :scroll="{ y: '100%' }"
          :pagination="false"
          column-resizable
          stripe
        ></a-table>
      </div>
      <div class="pd-sm bg-white text-right flex justify-end">
        <a-pagination
          size="small"
          :total="state.total"
          v-model:cruuent="state.pageIndex"
          @page-change="getDataList"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getUserList } from '@/service/user'
import { TableColumnData } from '@arco-design/web-vue'
import { onMounted, reactive } from 'vue'

// data
const state = reactive({
  columns: [] as TableColumnData[],
  dataList: [] as ListItem[],
  pageIndex: 1,
  pageSize: 20,
  total: 0,
  loading: true,
})

// init
onMounted(() => {
  state.columns = [
    { dataIndex: 'id', title: 'ID', width: 200 },
    { dataIndex: 'name', title: '姓名' },
    { dataIndex: 'createTime', title: '创建时间' },
  ]
  getDataList()
})

// getList
const getDataList = async (reset: any = true) => {
  if (reset === true) {
    state.pageIndex = 1
  }
  state.loading = true
  try {
    const res = await getUserList({ pageIndex: state.pageIndex })
    state.dataList = res.result.data
    state.total = res.result.total
  } finally {
    state.loading = false
  }
}
</script>
