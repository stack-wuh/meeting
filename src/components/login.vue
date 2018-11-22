<template>
  <section class="wrapper">
    <header class="header flex flex-justify__center">
      <img class="img-logo" src="../assets/imgs/logo.png" alt="logo">
    </header>
    <section class="form-area">
        <van-cell-group class="my-form__item">
            <van-field label="用户名"></van-field>
        </van-cell-group>
        <van-cell-group class="my-form__item">
            <van-field center label="验证码">
              <van-button slot="button" size="small" type="primary" >发送验证码</van-button>
            </van-field>
        </van-cell-group>
    </section>
    <mark class="form-msg">绑定手机号体验优质服务, 并提升信息安全性</mark>
    <section class="btn-area">
      <van-button @click="handleSubmit" size="large" type="danger" style="height: .8rem;line-height: .8rem;">登录</van-button>
    </section>
  </section>
</template>
<script>
import logo from '@/assets/imgs/logo.png'
export default{
  props: {},
  name: '',
  components: {},
  data(){
    return {

    }
  },
  methods: {
    handleSubmit(){
      this.$toast({
        type: 2,
        msg: 'is ok'
      })
      setTimeout(() => {
        this.$router.replace('/center')
      }, 1000)
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
