<template>
  <div>{{ msg }}</div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const state = reactive({
      msg: 'info',
    })
    return {
      ...toRefs(state),
    }
  },
}
</script>
