<template>
  <section class="wrapper">
    <header class="header flex flex-align__center flex-justify__between">
      <div @click="jumpToOther({path: '/center'})" class="avatar-box">
        <img class="avatar__img" :src="info.headPic || defaultAvatar" alt="avatar">
      </div>
      <div class="avatar-content">
        <p class="avatar__name">{{info.name}}</p>
        <p class="avatar__name avatar__phone">{{info.phone}}</p>
      </div>
      <div @click="jumpToOther({path: '/center'})" class="align-self__end">
        <img src="../assets/imgs/icon-user.png" style="width: .5rem; height: .5rem;" alt="bg_1">
      </div>
    </header>

    <van-notice-bar
      @click="jumpToOther({path: '/barrage'})"
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力"
      :left-icon="msgIcon"
      class="my-notice-bar">
    </van-notice-bar>

    <section v-if="question" class="img-box">
      <img @click="jumpToOther({path: '/answer'})" :src="question.picture || defaultBg" alt="">
    </section>

    <section class="card-list">
      <section @click="jumpToOther(item)" v-for="(item, index) in list" :key="index" class="card-item">
        <img :src="item.picture || item.url" alt="bgImg">
        <span class="card-title">{{item.label}}</span>
      </section>
    </section>

  </section>
</template>
<script>
import {mapActions} from 'vuex'
const list = [
  {
    label: '部门投票',
    url: require('../assets/imgs/bg_3.png'),
    path: '/vote',
  },
  {
    label: '议题打分',
    url: require('../assets/imgs/bg_4.png'),
    path: '/question',
  },
  {
    label: '会议资料',
    url: require('../assets/imgs/bg_5.png'),
    path: '/meettings',
  },
  {
    label: '座位安排',
    url: require('../assets/imgs/bg_6.png'),
    path: '/seating',
  }
]
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      msgIcon: require('@/assets/imgs/icon-tip-1.png'),
      list,
      info: {},
      defaultAvatar: require('@/assets/imgs/avatar.png'),
      defaultBg: require('@/assets/imgs/bg_2.png'),

      isShowQues: true, // 是否展示答题闯关
      question: {}, // 答题闯关的对象
    }
  },
  methods: {
    ...mapActions({
      'handleIndexInfo':'handleIndexInfo'
    }),
    jumpToOther(item){
      this.$router.push({path: item.path})
    }
  },
  created(){
    this.handleIndexInfo().then(res => {
      this.info = res.data.info
      let _arr = []
      this.list.map(item => {
        res.data.data.map(list => {
          if(item.label === list.name){
            _arr.push({...item, ...list})
          }else if(list.name === '闯关答题'){
            this.question = list
          }
        })
      })
      this.list = _arr
    })
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  height: 100vh;
  padding: 0.4rem;
  color: #fff;
  background-image: url('../assets/imgs/bg_1.png');
  background-size: 100% 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  header.header{
    height: 2rem;
    padding:0.3rem;
    border-radius: 4px;
    background-color: #8E7AEE;
    .avatar-box{
      width:1.4rem;
      height: 1.4rem;
      border:2px solid #fff;
      border-radius: 50%;
      overflow: hidden;
      .avatar__img{
        width: 100%;
        height: 100%;
      }
    }
    .avatar-content{
      display: flex;
      flex-flow: column nowrap;
      justify-content: space-between;
      flex:1;
      height: 90%;
      margin:0 .3rem;
      p{
        font-size: .4rem ;
      }
    }
  }

  .my-notice-bar{
    height: .8rem;
    margin: .3rem 0;
    background-color: #5846B4;
  }

  .img-box{
    width: 100%;
    height: 3.2rem;
    margin-top: .3rem;
    margin-bottom: .4rem;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }

  .card-list{
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .card-item{
      position: relative;
      width: 3.2rem;
      height: 2rem;
      margin-bottom: .3rem;
      img{
        position: relative;
        width: 100%;
        height: 100%;
      }
      .card-title{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(80%);
      }
    }
  }
}
</style>
