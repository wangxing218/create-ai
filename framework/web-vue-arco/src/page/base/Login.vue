<template>
  <div class="login-wrap">
    <div class="login-layout">
      <a-card class="home-login">
        <a-form :model="state.info" :rules="state.rules" ref="form" size="large">
          <a-form-item class="mgb-md" hide-label>
            <h2 class="login-title">管理系统</h2>
          </a-form-item>
          <a-form-item field="phone" hide-label>
            <a-input
              v-model="state.info.phone"
              maxlength="11"
              placeholder="手机"
              prefix-icon="a-icon-mobile-phone"
            >
              <template #prefix>
                <icon-mobile />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="password" hide-label>
            <a-input
              type="password"
              v-model="state.info.password"
              placeholder="密码"
              maxlength="16"
              prefix-icon="a-icon-lock"
            >
              <template #prefix>
                <icon-eye-invisible />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item field="verify" hide-label>
            <a-row :gutter="12">
              <a-col :span="14">
                <a-input
                  v-model="state.info.verify"
                  maxlength="4"
                  placeholder="验证码"
                  prefix-icon="a-icon-edit"
                >
                  <template #prefix>
                    <icon-check-circle />
                  </template>
                </a-input>
              </a-col>
              <a-col :span="10">
                <img class="code-img" title="点击切换" :src="verifyImg" @click="changeVerify" />
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item content-class="flex justify-between" hide-label>
            <a-checkbox v-model="state.info.remember">记住登录</a-checkbox>
            <a-link>忘记密码</a-link>
          </a-form-item>
          <a-form-item hide-label>
            <a-button :loading="state.loading" long type="primary" @click="submit">登录</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { IconCheckCircle, IconEyeInvisible, IconMobile } from '@arco-design/web-vue/es/icon'
import { loginUser } from '@/service/user'
import { useUserStore } from '@/store'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const store = useUserStore()
const router = useRouter()
// data
const state = reactive({
  loading: false,
  random: 0,
  info: {
    phone: '',
    password: '',
    verify: '',
    remember: true,
  },
  rules: {
    phone: [
      { match: /^1[3-9]\d{9}$/, message: '手机号格式有误' },
      { required: true, message: '请输入手机' },
    ],
    password: [
      { required: true, message: '请输入密码' },
      { minLength: 4, message: '密码长度为6到16位' },
    ],
    verify: [
      { required: true, message: '请输入验证码' },
      { length: 4, message: '验证码长度为4位' },
    ],
  },
})
const form = ref(null)
const verifyImg = computed(() => import.meta.env.VITE_BASE_API + '/verify?' + state.random)

// 改变验证码
const changeVerify = () => {
  state.random = Math.random()
}
// 登录提交
const submit = async (pass: boolean | Event) => {
  if (pass !== true) {
    ;(form.value as any).validate((errors: boolean) => {
      if (errors) return
      submit(true)
    })
    return
  }
  state.loading = true
  const res = await loginUser({
    phone: state.info.phone,
    password: state.info.password,
    verify: state.info.verify,
    remember: state.info.remember,
  })
  if (res.code) return changeVerify()
  store.setUser(res.result)
  router.push({ name: 'BaseHome' })
}
</script>

<style lang="scss" scoped>
.login-wrap {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right bottom, #0080ff, #f009ef);
  overflow: auto;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-login {
  width: 420px;
  margin: 0 auto;
  padding: 15px 30px 15px;
  position: relative;
  z-index: 2;
}

.login-title {
  font-size: 24px;
  color: $color-text-2;
  text-align: center;
  font-weight: normal;
  padding-bottom: 15px;
}
.code-img {
  display: block;
  cursor: pointer;
  width: 100%;
  height: 36px;
  background-color: #f2f6fc;
}
</style>
