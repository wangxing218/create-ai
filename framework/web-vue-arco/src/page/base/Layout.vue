<template>
  <a-layout class="height-full">
    <a-layout-header>
      <a-page-header :show-back="false" title="管理系统" subtitle="v1.0">
        <template #extra>
          <a-dropdown>
            <a-avatar class="bg-blue pointer">Admin</a-avatar>
            <template #content>
              <a-doption>
                <template #icon><icon-user /></template>
                用户中心
              </a-doption>
              <a-doption>
                <template #icon><icon-check-square /></template>
                修改密码
              </a-doption>
              <a-doption @click="logout">
                <template #icon><icon-poweroff /></template>
                退出登录
              </a-doption>
            </template>
          </a-dropdown>
        </template>
      </a-page-header>
    </a-layout-header>
    <a-layout style="height: 1%">
      <a-layout-sider theme="dark">
        <a-menu theme="dark">
          <a-menu-item key="1">
            <template #icon><icon-home></icon-home></template>
            首页
          </a-menu-item>
          <a-sub-menu key="2">
            <template #icon><icon-apps></icon-apps></template>
            <template #title>新闻</template>
            <a-menu-item key="0_0">列表</a-menu-item>
            <a-menu-item key="0_1">作者</a-menu-item>
            <a-menu-item key="0_2">统计</a-menu-item>
            <a-menu-item key="0_3">评论</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="3">
            <template #icon><icon-copy /></template>
            <template #title>权限</template>
            <a-menu-item key="3_0">列表</a-menu-item>
            <a-menu-item key="3_1">作者</a-menu-item>
            <a-menu-item key="3_2">统计</a-menu-item>
            <a-menu-item key="3_3">评论</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content>
        <div class="wrap">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

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
}
.arco-page-header {
  padding: 5px 0;
}
</style>
