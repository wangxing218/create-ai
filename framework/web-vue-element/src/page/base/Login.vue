<template>
  <div class="login-wrap">
    <div class="login-layout">
      <el-card class="home-login">
        <el-form :model="state.info" :rules="rules" ref="formEl" size="large">
          <el-form-item class="mgb-md">
            <h2 class="login-title">管理系统</h2>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input
              v-model="state.info.phone"
              maxlength="11"
              placeholder="手机"
              :prefix-icon="Phone"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="state.info.password"
              placeholder="密码"
              maxlength="16"
              :prefix-icon="View"
            ></el-input>
          </el-form-item>
          <el-form-item prop="verify">
            <el-row :gutter="12">
              <el-col :span="14">
                <el-input
                  v-model="state.info.verify"
                  maxlength="4"
                  placeholder="验证码"
                  :prefix-icon="SetUp"
                ></el-input>
              </el-col>
              <el-col :span="10">
                <img class="code-img" title="点击切换" :src="verifyImg" @click="changeVerify" />
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item content-class="flex justify-between">
            <div class="flex width-full">
              <el-checkbox v-model="state.info.remember">记住登录</el-checkbox>
              <el-link>忘记密码</el-link>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="state.loading"
              class="width-full"
              type="primary"
              @click="submit(formEl)"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Phone, SetUp, View } from '@element-plus/icons-vue'
import {
  ElCard,
  ElForm,
  ElButton,
  ElFormItem,
  ElCheckbox,
  ElLink,
  ElRow,
  ElCol,
  ElInput,
  FormInstance,
  FormRules,
} from 'element-plus'
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
})
const formEl = ref<FormInstance>()
const rules = reactive<FormRules>({
  phone: [
    { pattern: /^1[3-9]\d{9}$/, message: '手机号格式有误' },
    { required: true, message: '请输入手机' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码长度为6到16位' },
  ],
  verify: [
    { required: true, message: '请输入验证码' },
    { min: 4, message: '验证码长度为4位' },
  ],
})
const verifyImg = computed(() => import.meta.env.VITE_BASE_API + '/verify?' + state.random)

// 改变验证码
const changeVerify = () => {
  state.random = Math.random()
}
// 登录提交
const submit = async (form: FormInstance | undefined) => {
  if (!form) return
  const pass = await form.validate()
  if (!pass) return
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
  background-image: linear-gradient(to right bottom, #86b2de, #966396);
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
  height: 40px;
  background-color: #f2f6fc;
}
</style>
