<template>
  <div>
    <van-row>
      <van-col span="12">
        <van-image fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      </van-col>

      <van-col v-if="!loginType" span="12">
        <br />
        <van-form @submit="onSubmit">
          <van-field
            v-model="form.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <br />
          <van-field
            v-model="form.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <br />
          <div style="margin: 16px;">
            <van-button
              round
              block
              :loading="loading"
              type="info"
              loading-text="加载中..."
              native-type="submit"
            >提交</van-button>
          </div>
        </van-form>
      </van-col>
      <van-col v-else span="12">
        <br>
        <van-field v-model="tel" type="tel" label="手机号" />
        <br>
        <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button size="small" type="primary" :loading="verLoading" @click="sendVerCode" :loading-text="`${verText}秒后重试`">发送验证码</van-button>
          </template>
        </van-field>

        <div style="margin: 16px;">
            <van-button
              round
              block
              :loading="loading"
              type="info"
              loading-text="加载中..."
              native-type="submit"
              @click="smsLogin"
            >提交</van-button>
          </div>
      </van-col>
      <span @click="loginType = !loginType" class="Login_Font">换个方式登录？</span>
    </van-row>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Form as VanForm,
  Field as VanField,
  Button as VanButton,
  Col,
  Image as VanImage,
  Notify,
  Row
} from "vant";
import { getHash } from '@/utils/crypto.js' 
import { sendMns } from '@/api/login.js'

Vue.use(VanImage);
Vue.use(VanForm);
Vue.use(VanField);
Vue.use(VanButton);
Vue.use(Col);
Vue.use(Row);

export default {
  name: "Login",
  props: {
    msg: String
  },
  data() {
    return {
      tel: '',
      ver_code: '',
      form: {
        username: "",
        password: ""
      },
      loading: false,
      verLoading: false,
      verText: 30,
      sms: '',
      loginType: false
    };
  },
  watch: {
    loginType(type) {
      if (!type) {
        this.sms = ''
      }
    }
  },
  methods: {
    smsLogin() {
      // type:1 账号密码登录 type:2 手机号登录
      if (!this.sms) {
        if (this.ver_code === this.sms) {
          this.$router.push({ path: "dashBoard" });
          this.sms = ''
        }
      }
    },
    sendVerCode() {
      if (!this.verLoading) {
        this.verLoading = true
        sendMns(this.tel).then((res) => {
          if (res.data.code === 1) {
            Notify({ type: 'error', message: '短信发送失败'})
          } else {
            this.ver_code = res.data.ver_code
            this.sms = res.data.ver_code
            Notify({ type: 'success', message: '短信发送成功!' });
          }
        }).catch(e => {
          Notify({ type: 'error', message: e });
        })
        setInterval(() => {
          this.verText -= 1
          if (this.verText === 0) {
            this.verLoading = false
            clearInterval()
            this.verText = 30
          }
        }, 1000);
      }
    },
    onSubmit() {
      const { username, password } = this.form
      this.loading = true;
      const encryption = getHash(password)
      this.$store.dispatch("login", { username, password: encryption, num: parseInt(Math.random() * 10), type: 1 }).then(() => {
        this.$router.push({ path: "dashBoard" });
        this.loading = false;
      }).catch(() => {
        this.loading = false
      })
    }
  }
};
</script>

<style scoped>
.Login_Font {
  color: green;
}
</style>
