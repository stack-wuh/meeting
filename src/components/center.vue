<template>
  <section class="wrapper">
    <section class="list-box">
      <ul class="list">
        <li class="list-item flex flex-align__center flex-justify__between" v-for="(item, index) in list" :key="index">
          <div class="list__label">
            <span class="list__text">{{item.label}}</span>
          </div>
          <div class="list__value">
            <div v-if="item.type === 'img'" class="list__avatar-box">
              <img class="list__avatar" v-if="item.type === 'img'" :src="item.value" alt="avatar">
            </div>
            <span v-else class="list__text">{{item.value}}</span>
          </div>
        </li>
      </ul>
    </section>
    <section class="btn-area">
        <van-button class="my-btn__submit" size="large" type="danger">
          <span class="my-btn__text">退出登录</span>
        </van-button>
    </section>
  </section>
</template>
<script>
const list = [
    {
      label: '头像',
      field: '',
      value: require('@/assets/imgs/logo.png'),
      type: 'img'
    },
    {
      label: '姓名',
      field: '',
      value: 'shadow',
    },
    {
      label: '手机号',
      field: '',
      value: '18827132213',
    },
    {
      label: '部门',
      field: '',
      value: '开发部',
    },
    {
      label: '桌号',
      field: '',
      value: '6号桌',
    }
]

export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      list,
    }
  },
  methods: {},
  created(){}
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
}
</style>
