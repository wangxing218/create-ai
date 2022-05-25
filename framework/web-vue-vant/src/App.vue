<template>
  <ConfigProvider :theme-vars="themeVars">
    <div class="height-full flex-column">
      <div class="flex width-full pd-md">
        <router-link to="/">首页</router-link>
        <router-link to="/info">详情</router-link>
        <router-link to="/msg">信息</router-link>
      </div>
      <div class="flex-1">
        <router-view />
      </div>
    </div>
  </ConfigProvider>
</template>
<script lang="ts" setup>
import { ConfigProvider } from 'vant'

// 主题定制
const themeVars = {
  rateIconFullColor: '#07c160',
  sliderBarHeight: '4px',
  sliderButtonWidth: '20px',
  sliderButtonHeight: '20px',
  sliderActiveBackgroundColor: '#07c160',
  buttonPrimaryBorderColor: '#0080ff',
  buttonPrimaryBackgroundColor: '#0080ff',
}
</script>
