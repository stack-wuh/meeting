<template>
  <section class="wrapper">
    <header ref="headBox" class="header-wrapper">
      <div @click="jumpToOther({path: '/center'})" class="avatar-box">
        <img :src="info.headPic || defaultAvatar" alt="avatar">
      </div>
    </header>

    <van-notice-bar
      @click="jumpToOther({path: '/barrage'})"
      text="温馨提示: 点击头像可以获取您的个人信息"
      :left-icon="msgIcon"
      class="my-notice-bar">
    </van-notice-bar>


    <section class="card-list">
      <section v-if="item.status == 0" @click="jumpToOther(item)" v-for="(item, index) in list" :key="index" class="card-item">
        <img :src="item.picture || item.url" alt="bgImg">
        <span class="card-title">{{item.name}}</span>
      </section>
    </section>

  </section>
</template>
<script>
import {mapActions} from 'vuex'
import axios from 'axios'
import qs from 'qs'
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      msgIcon: require('@/assets/imgs/icon-tip-1.png'),
      list: [],
      info: {},
      defaultAvatar: require('@/assets/imgs/avatar.png'),
      defaultBg: require('@/assets/imgs/bg_2.png'),

      isShowQues: true, // 是否展示答题闯关
      question: {}, // 答题闯关的对象

      isCanShowVote: false, // 能否点击议题打分
      showVoteToastMsg: '', //对话框弹出的内容
      isCanShowQues: false,
      showQuesToastMsg: '',

    }
  },
  methods: {
    ...mapActions({
      'handleIndexInfo':'handleIndexInfo',
      'handleCheckVote': 'handleCheckVote',
      'handleVildaGrade' : 'handleVildaGrade'
    }),
    handleVoteCheck(userId){
      let _data = {
        userId
      }
      axios({
        method: 'post',
        url: window.rootPath + '/vote/checkVote.do',
        data: qs.stringify(_data)
      }).then(res => {
        this.isCanShowVote = res.data.status
        this.showVoteToastMsg = res.data.msg
      })
    },
    handleQuesCheck(userId){
      let _data = {
        userId
      }
      axios({
        method: 'post',
        url: window.rootPath + '/grade/checkTopicGread.do',
        data: qs.stringify(_data)
      }).then(res => {
        this.isCanShowQues = res.data.status
        this.showQuesToastMsg = res.data.msg
      })
    },

    jumpToOther(item){
      if(item.id === 1){
        if(this.isCanShowVote !== 0){
          this.$toast({
            type: 3,
            msg: this.showVoteToastMsg
          })
        }else {
          this.$router.push({path: item.path, query: {tag: item.name, ename: item.ename, id: item.id}})
        }
      }else if(item.id === 2){
        if(this.isCanShowQues !== 0){
          this.$toast({
            type: 3,
            msg: this.showQuesToastMsg
          })
        }else {
          this.$router.push({path: item.path, query: {tag: item.name, ename: item.ename, id: item.id}})
        }
      }else{
        this.$router.push({path: item.path, query: {tag: item.name, ename: item.ename, id: item.id}})
      }
    }
  },
  created(){
    let userInfo = window.localStorage.getItem('userInfo')
    userInfo = userInfo && JSON.parse(userInfo)
    this.handleVoteCheck(userInfo.id)
    this.handleQuesCheck(userInfo.id)
    let map = new Map([
      [1, 'vote'],
      [2, 'question'],
      [3, 'meettings'],
      [4, 'seating'],
      [5, 'location'],
      [6, 'detail'],
      [7, 'order'],
      [8, 'answer']
    ])
    this.handleIndexInfo().then(res => {
      this.info = res.data.info
      this.$refs.headBox.style.backgroundImage = res.comStr && `url(${res.comStr})`
      this.list = res.data.data.map(item => {
        return  {...item, name: item.name , path: map.get(item.id)}
      })
    })
  },
}
</script>
<style lang="less" scoped>
.wrapper{
  height: 100vh;
  padding: 0.4rem;
  color: #fff;
  background-image: url('../assets/imgs/bg_red.png');
  background-size: 100% 100%;
  box-sizing: border-box;
  overflow-y: scroll;
  header.header-wrapper{
    position: relative;
    width: 6.8rem;
    height: 3rem;
    margin-top: .6rem;
    margin-bottom: .2rem;
    background-image: url(../assets/imgs/img_1.png);
    background-size: 100%;
    background-position: center;
    border-radius: 4px;

    .avatar-box{
      position: absolute;
      left: 50%;
      top: -50%;
      transform: translateX(-50%) translateY(50%);
      width: 1.5rem;
      height: 1.5rem;
      border: 2px solid #fff;
      border-radius: 50%;
      background-color: #fff;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
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
    background-color: #9A261C;
    color: #fff;
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
