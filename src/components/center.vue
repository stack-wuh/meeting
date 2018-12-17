<template>
  <section class="wrapper">
    <section class="list-box">
      <ul class="list">
        <li class="list-item flex flex-align__center flex-justify__between"
          v-for="(item, index) in list" :key="index">
          <div class="list__label">
            <span class="list__text">{{item.label}}</span>
          </div>
          <div class="list__value">
            <div v-if="item.type === 'img'" class="list__avatar-box">
              <img class="list__avatar" v-if="item.type === 'img'" :src="info[item.field] || item.value" alt="avatar">
            </div>
            <div v-else-if="item.type === 'button'" class="">
              <span @click="handleSignCheck" class="my-button__sub1" :class="[signState == 0 ? '' : 'my-button__sub_active']">签到</span>
            </div>
            <span v-else class="list__text">{{info[item.field] || item.value}}</span>
          </div>
        </li>
      </ul>
    </section>
    <section class="btn-area">
        <van-button @click="handleSignOut" class="my-btn__submit" size="large" type="danger">
          <span class="my-btn__text">退出登录</span>
        </van-button>
    </section>
  </section>
</template>
<script>
import {mapActions} from 'vuex'
const list = [
    {
      label: '头像',
      field: 'headPic',
      value: require('@/assets/imgs/avatar.png'),
      type: 'img'
    },
    {
      label: '姓名',
      field: 'name',
      value: 'shadow',
    },
    {
      label: '手机号',
      field: 'phone',
      value: '18827132213',
    },
    {
      label: '部门',
      field: 'deptName',
      value: '开发部',
    },
    {
      label: '桌号',
      field: 'tableNum',
      value: '暂无',
    },
    {
      label: '签到',
      type: 'button'
    }
]

export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      list,
      info: {},
      signState: 0,
    }
  },
  methods: {
    ...mapActions({
      'handleIndexInfo': 'handleIndexInfo',
      'GetChecked': 'GetChecked',
      'HandleCheck': 'HandleCheck'
    }),
    handleSignOut(){
      window.localStorage.setItem('userInfo', JSON.stringify({}))
      setTimeout(() => {
        this.$router.push({path: '/login'})
      }, 1000)
    },
    handleSignCheck(){
      if(this.signState === 1){
        this.$toast({
          type: 3,
          msg: '请勿重复签到 '
        })
        return
      }
      this.HandleCheck().then(res =>{
        if(res.status === 0){
          this.signState = 1
        }
      })
    }
  },
  created(){
    this.handleIndexInfo().then(res => {
      this.info = res.data.info
      this.signState = res.data.signState
    })
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
  background-color: #F2F6F9;
  .list-box{
    background-color: #fff;
  }
  .list{
    .list-item{
      height: 1.2rem;
      padding: 0 0.2rem;
      border-bottom: 1px solid #eee;
    }
    :last-of-type{
      border-bottom: none;
    }
    .list__avatar-box{
      width:.8rem;
      height: .8rem;
      overflow: hidden;
      border-radius: 50%;
      .list__avatar{
        width: 100%;
        height:100%;
      }
    }
  }

  .btn-area{
    padding: 0.2rem;
    margin-bottom: 1.1rem;
    .my-btn__submit{
      height: 1.3rem;
      line-height: 1.3rem;
      font-size: .4rem;
    }
    .my-btn__text{
      font-size: .4rem;
    }
  }
  .my-button__sub1{
    padding: .1rem .2rem;
    background-color: #f44;
    color: #fff;
    border-radius: .08rem;
  }
  .my-button__sub_active{
    color: #999;
    background-color: #ccc;
  }
}
</style>
