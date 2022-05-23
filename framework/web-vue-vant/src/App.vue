<template>
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
</template>
