<template>
  <div class="hello">
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="form.password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from "vue";
import { Form as VanForm, Field as VanField, Button as VanButton } from "vant";

Vue.use(VanForm);
Vue.use(VanField);
Vue.use(VanButton)

export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(values) {
      this.$log.debug(values, '--')
      this.$store.dispatch('login', this.form).then(() => {
        this.$router.push({ path: 'dashBoard' })
      })
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
