<template>
  <div class="flex-column align-stretch height-full">
    <div class="bg-white flex pd-md pdb-xs mgb-md">
      <div class="flex-1">
        <el-form :model="state.search" inline>
          <el-form-item label="姓名">
            <el-input placeholder="搜索姓名" v-model="state.search.name"></el-input>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              placeholder="请选择时间"
              range-separator="-"
              v-model="state.search.time"
            />
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="getDataList(true)">搜索</el-button>
    </div>
    <div class="flex-1 bg-white height-10p pdb-sm">
      <el-table
        :data="state.dataList"
        height="100%"
        v-loading="state.loading"
        :border="true"
        stripe
      >
        <el-table-column label="ID" prop="id" width="200"></el-table-column>
        <el-table-column label="姓名" prop="name"></el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
      </el-table>
    </div>
    <div class="pd-sm bg-white text-right flex justify-end">
      <el-pagination
        layout="slot,prev,pager,next"
        :total="state.total"
        v-model:current-page="state.pageIndex"
        @current-change="getDataList"
      >
        <span class="font-sm">共{{ state.total }}条</span>
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
  ElForm,
  ElFormItem,
  ElInput,
  ElDatePicker,
} from 'element-plus'
import { getUserList } from '@/service/user'
import { onMounted, reactive } from 'vue'

// data
const state = reactive({
  search: {
    name: '',
    time: '',
  },
  dataList: [] as ListItem[],
  pageIndex: 1,
  pageSize: 20,
  total: 0,
  loading: true,
})

// init
onMounted(() => {
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
