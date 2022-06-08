<template>
  <el-container class="height-full">
    <el-header class="flex header">
      <h3>管理系统</h3>
      <el-dropdown>
        <el-avatar class="bg-blue pointer">Admin</el-avatar>
        <template #dropdown>
          <el-dropdown-item>
            <el-icon>
              <Avatar />
            </el-icon>
            用户中心
          </el-dropdown-item>
          <el-dropdown-item>
            <el-icon>
              <CircleCheck />
            </el-icon>
            修改密码
          </el-dropdown-item>
          <el-dropdown-item @click="logout">
            <el-icon>
              <WindPower />
            </el-icon>
            退出登录
          </el-dropdown-item>
        </template>
      </el-dropdown>
    </el-header>
    <el-container class="height-10p">
      <el-aside class="side" width="200px">
        <el-menu background-color="#333" text-color="#fff">
          <el-menu-item index="1">
            <el-icon>
              <HomeFilled />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon>
                <Box />
              </el-icon>
              <span>新闻</span>
            </template>
            <el-menu-item index="0_0">列表</el-menu-item>
            <el-menu-item index="0_1">作者</el-menu-item>
            <el-menu-item index="0_2">统计</el-menu-item>
            <el-menu-item index="0_3">评论</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon>
                <Apple />
              </el-icon>
              <span>权限</span>
            </template>
            <el-menu-item index="3_0">列表</el-menu-item>
            <el-menu-item index="3_1">作者</el-menu-item>
            <el-menu-item index="3_2">统计</el-menu-item>
            <el-menu-item index="3_3">评论</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main class="wrap">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import { HomeFilled, Apple, Avatar, Box, WindPower, CircleCheck } from '@element-plus/icons-vue'
import {
  ElContainer,
  ElHeader,
  ElAside,
  ElMenu,
  ElSubMenu,
  ElMenuItem,
  ElMain,
  ElDropdown,
  ElDropdownItem,
  ElAvatar,
  ElIcon,
} from 'element-plus'

import { useRouter, RouterView } from 'vue-router'

const router = useRouter()

const logout = () => {
  router.push({ name: 'BaseLogin' })
}
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  background-color: $color-light;
  overflow: auto;
  position: relative;
  padding: 15px;
}
.header {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 90;
}
.side {
  background-color: #333;
  > .el-menu {
    border-right: none;
  }
}
</style>
