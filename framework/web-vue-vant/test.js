const { parse, compileTemplate, compileScript, compileStyle } = require('@vue/compiler-sfc')
const { defineComponent } = require('vue')

const code = `

<template>
  <div class="msg">{{ state.msg }}</div>
</template>

<script lang="ts" setup name="code-test">
import { reactive } from 'vue'
const props = defineProps({
  name: '123'
})
const state = reactive({
  msg: 'msg',
})
</script>


<style scoped>
.msg {
  color: #ccc;
}
</style>


`

const res = parse(code)

console.log(res.descriptor)

console.log(
  'temp :>> ',
  compileTemplate({
    source: res.descriptor.template.content,
    filename: res.filename,
    scoped: true,
    id: 'scoped',
  }),
)

console.log(
  'style :>> ',
  compileStyle({
    source: res.descriptor.styles[0].content,
    filename: res.filename,
    scoped: true,
    id: 'scoped',
  }),
)

console.log(
  'scripts :>> ',
  compileScript(
    {
      source: `${res.descriptor.scriptSetup.content}`,
      filename: res.filename,
      script: '',
    },
    {
      id: 'scoped',
    },
  ),
)
