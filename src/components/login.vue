<template>
  <section class="wrapper">
    <header class="header flex flex-justify__center">
      <img class="img-logo" src="../assets/imgs/logo.png" alt="logo">
    </header>
    <section class="form-area">
        <van-cell-group class="my-form__item">
            <van-field v-model="phone" label="手机号"></van-field>
        </van-cell-group>
        <van-cell-group class="my-form__item">
            <van-field v-model="identify" center label="验证码">
              <van-button :disabled="isReload" @click="handleClickSconed" slot="button" size="small" type="primary" >{{remind}}</van-button>
            </van-field>
        </van-cell-group>
    </section>
    <mark class="form-msg">绑定手机号体验优质服务, 并提升信息安全性</mark>
    <section class="btn-area">
      <van-button @click="handleSignIn({phone, identify})" size="large" type="danger" style="height: .8rem;line-height: .8rem;">登录</van-button>
    </section>
  </section>
</template>
<script>
import logo from '@/assets/imgs/logo.png'
import {mapActions} from 'vuex'
import {validPhone} from '@/utils/vaild'
export default{
  props: {},
  name: '',
  components: {},
  data(){
    return {
      phone: '',
      identify: '',
      sessionId: '',

      remind: '发送验证码',
      isReload: false
    }
  },
  methods: {
    ...mapActions({
      'handleIdentifyCode': 'handleIdentifyCode',
      'handleSignIn': 'handleSignIn'
    }),
    handleClickSconed(){
     let count = 60, timer = null
     clearInterval(timer)
     if(!validPhone(this.phone)) return
     timer = setInterval(() => {
       count --
       if(count <= 0){
         clearInterval(timer)
         this.remind = '发送验证码'
       }else{
         this.remind = `${count}s后再次发送`
         this.isReload = true
       }
      }, 1000)
      this.isReload = false
      this.handleIdentifyCode({phone: this.phone})
    }
  },
  created(){

  }
}
</script>
<style lang="less" scoped>
.wrapper{
  height: 100%;
  padding: .2rem;
  box-sizing: border-box;
  header.header{
    height: 4.4rem;
    img.img-logo{
      width: 5.3rem;
      height: 1.3rem;
    }
  }
  .form-area{
    height:3rem;
  }
  .btn-area{
    height: 4rem;
    margin-top:.8rem;
  }
}
</style>
