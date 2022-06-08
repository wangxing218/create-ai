<template>
  <div>这是组件: {{ title }}</div>
</template>

<script lang="ts">
export default {
  name: 'hello-world',
}
</script>
<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>
