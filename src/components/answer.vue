<template>
  <section class="wrapper">
    <section v-if="isShowPanel" class="wrapper">
        <header class="header flex flex-justify__center">
          <strong>{{info.sequenceNum || 0}}/{{info.total || 0}}</strong>
        </header>
        <section class="list-box">
          <section class="head flex flex-justify__between">
              <span class="head__timer">{{count}}s</span>
              <img class="head__star" src="../assets/imgs/icon-star.png" alt="star">
              <span class="head__num flex-self__end">{{info.count || 0}}人</span>
          </section>
          <section v-if="info.status === 0" class="list">
            <h4 class="list__title">{{info.content || '标题'}}</h4>
            <ul class="list__item">
                <li @click="handleSubmit(info.optionA, 0)" :class="[isChecked == 0 ? 'item item__active' : 'item', isSuccess == 0 ? 'item item__success' : 'item']">A. {{info.optionA}}</li>
                <li @click="handleSubmit(info.optionB, 1)" :class="[isChecked == 1 ? 'item item__active' : 'item', isSuccess == 1 ? 'item item__success' : 'item']">B. {{info.optionB}}</li>
                <li @click="handleSubmit(info.optionC, 2)" :class="[isChecked == 2 ? 'item item__active' : 'item', isSuccess == 2 ? 'item item__success' : 'item']">C. {{info.optionC}}</li>
                <li @click="handleSubmit(info.optionD, 3)" :class="[isChecked == 3 ? 'item item__active' : 'item', isSuccess == 3 ? 'item item__success' : 'item']">D. {{info.optionD}}</li>
            </ul>
          </section>
          <section v-if="info.status === 1" class="list">
            <h4 class="list__title">{{info.content || '标题'}}</h4>
            <ul class="list__item">
                <li :class="[isSuccess == 0 ? 'item item__success' : 'item']">A. {{info.optionA}}</li>
                <li :class="[isSuccess == 1 ? 'item item__success' : 'item']">B. {{info.optionB}}</li>
                <li :class="[isSuccess == 2 ? 'item item__success' : 'item']">C. {{info.optionC}}</li>
                <li :class="[isSuccess == 3 ? 'item item__success' : 'item']">D. {{info.optionD}}</li>
            </ul>
          </section>
        </section>

        <my-dialog
          :visibleDialog="visibleDialog"
          title=""
          :canShowConfirmButton="false"
          :canShowCancelButton="false"
          confirmButtonText="继续闯关"
        >
          <div class="my-dialog-wrapper" slot="text">
            <div class="my-dialog-img">
              <img :src="canGo ? successImg : errorImg" alt="logo" style="width: 100%; height: 100%;">
            </div>
            <p class="dialog__sub">{{canGo ? '恭喜你' : '很遗憾'}}</p>
            <!-- <p v-if="info.sequenceNum !== info.total" class="dialog__title">{{canGo ? '回答正确' : '闯关失败'}}</p> -->
            <!-- <p v-if="info.sequenceNum == info.total" class="dialog__title">{{canGo ? '闯关成功' : '闯关失败'}}</p> -->
            <p v-if="info.sequenceNum == info.total && canGo" class="dialog__title">闯关成功</p>
            <van-button v-if="info.sequenceNum == info.total" @click="jump2Other" type="primary" class="btn__submit">回到首页</van-button>
            <van-button v-if="info.sequenceNum !== info.total" @click="visibleDialog = false" type="primary" class="btn__submit">{{canGo ? '继续闯关' : '继续观战'}}</van-button>
          </div>
        </my-dialog>


    </section>

    <section v-if="!isShowPanel" class="un-wrapper">
      <div class="tips-text">
        等待答题
      </div>
    </section>

  </section>

</template>
<script>
import {mapActions} from 'vuex'
import MyDialog from '@/components/common/dialog'
export default {
  props: {},
  name: '',
  components: {
    MyDialog
  },
  data(){
    return {
      visibleDialog: false, // 是否展示 dialog对话框
      Socket: null, // Socket

      successImg: require('@/assets/imgs/w.jpg'),
      errorImg: require('@/assets/imgs/32.jpg'),
      info: {},

      isChecked: -1, // 选中选项时候的状态
      isSuccess: -1, //正确答案的状态
      canGo: false, // 是否答题成功

      count: 30, //答题倒计时 -- 默认30
      isShowPanel: false , // 是否展示答题面板
      timer: null , // 倒计时的定时器ID
      isClick: true, // 允许
    }
  },
  watch:{
    count(){
      if(this.info.status == 0 && this.count <=0 && this.isChecked < 0){
        this.$toast({
          type: 3,
          msg: '操作超时,只能观战!'
        })
        this.Socket.send('wrong')
      }
      if(this.info.total <= this.info.sequenceNum && this.count <= 0){
        this.visibleDialog = true
      }
    }
  },
  methods: {
    ...mapActions({
      'addSuccess': 'addSuccess'
    }),
    clockNow(){
      let successIndex = this.info.options.indexOf(this.info.rightAnswer)
      if(this.timer) clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.count --
        if(this.count <= 0){
          this.count = 0
          this.isSuccess = successIndex
          clearInterval(this.timer)
        }
      }, 1000)
    },
    handleSubmit(option, index){
      if(this.isClick){
        this.isChecked = index
        let successIndex = this.info.options.indexOf(this.info.rightAnswer)
        let local = window.localStorage.getItem('userInfo')
        local = local && JSON.parse(local)
        let data = {
          userId: local.id,
          meetingId: this.info.meetingId
        }
        this.canGo = successIndex === index ? true : false
        if(index !== successIndex && this.isClick){
          this.visibleDialog = true
          this.Socket.send('wrong')
        }
        if(this.info.status == 0 && this.info.sequenceNum >= this.info.total){
          this.addSuccess(data)
        }
      }
      this.isClick = false
    },
    jump2Other(){
      setTimeout(() => {
        this.$router.push({path: '/index'})
      }, 1000)
    }
  },
  created(){
    let that = this
    let local = window.localStorage.getItem('userInfo')
    local = local && JSON.parse(local)
    this.Socket = new WebSocket(window.socketPath + `meeting/passWebsocket/${local.id}/0`)
    this.Socket.onmessage = e => {
      console.log(e)
      let data = e.data === 'pass' ? {} : JSON.parse(e.data)
      console.log(data)
      if(e.data != 'pass'){
        let options = data && [data.optionA, data.optionB, data.optionC, data.optionD]
        that.info = {...data, options}
        this.count = data.time || 30
        this['clockNow'].call(this)
        this.isShowPanel = true // 展示答题区域
        this.isChecked = -1 // 清除选择答案
        this.isSuccess = -1 // 清除正确答案
        this.isClick = true // 允许再次点击
        this.visibleDialog = false  // 关掉dialog
      }else {
        this.Socket.close()
      }
    }
  },
  distoryed(){
    this.Socket.close()
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  width: inherit;
  height: inherit;
  background-image: url('../assets/imgs/bg_red.png');
  overflow-y: scroll;
  header.header{
    width:inherit;
    height: 1.2rem;
    color: #F28B00;
    font-size: .5rem;
    background-image: url(../assets/imgs/icon-tips-2.png);
    background-size: 80%;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .list-box{
    width: calc(100% - 1.6rem);
    height: calc(100% - 1.24rem);
    margin-top: 1.3rem;
    margin-left: .8rem;
    background-color: #fff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    .head{
      position: relative;
      height: .8rem;
      background-color: #eee;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;

      .head__timer{
        margin-left: .3rem;
        font-size: .24rem;
      }
      .head__timer:before{
          content: '';
          padding: .2rem;
          background-image: url(../assets/imgs/icon-timer.png);
          background-size: 70%;
          background-repeat: no-repeat;
          background-position: center center;
      }

      .head__num{
        margin-right: .3rem;
        font-size: .24rem;
      }
      .head__num:before{
        content: '';
        padding: .2rem;
        background-image: url(../assets/imgs/icon-edit.png);
        background-size: 70%;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }

    .list{
      padding: .3rem;
      h4.list__title{
        margin-top: .3rem;
        margin-bottom: .5rem;
        font-size: .3rem;
        font-weight: normal;
        color: #000;
      }
      .list__item{
        .item{
          position: relative;
          min-height: 1.08rem;
          padding:.2rem;
          margin-bottom: .4rem;
          border-radius: 1rem;
          border:2px solid #F28B00;
          font-size: .3rem;
          box-sizing: border-box;
          box-shadow: 0 0.08rem 0.02rem black;
        }
        // .item:after{
        //   position: absolute;
        //   top:92%;
        //   right: 15%;
        //   content: '';
        //   padding: 0.08rem 0.2rem;
        //   background-color: #fff;
        // }
        // .item:before{
        //   position: absolute;
        //   top:92%;
        //   right: 25%;
        //   content: '';
        //   padding: 0.08rem 0.1rem;
        //   background-color: #fff;
        // }
        .item__active{
          background-color: rgb(112, 189, 70);
          color: #fff;
        }
        .item__success{
          background-color: red;
          color: #fff
        }
      }
    }
  }

  img.head__star{
    position: absolute;
    top: -282%;
    left:28%;
    transform: scale3d(.55, .55, .6) translateX(-50%) ;
  }
  .my-dialog-wrapper{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    .dialog__sub{
      margin-bottom: .3rem;
      font-size: .35rem;
    }
    .dialog__title{
      margin-bottom: .4rem;
      font-size: .5rem;
      font-weight: bold;
    }
    .btn__submit{
      width: 4rem;
      height: .8rem;
      margin: .4rem 0;
      line-height: .8rem;
      border-radius: .4rem;
      background-color: #0669FF;
    }
  }

  .clock-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 20vh;
    font-size: 1rem;
    text-align: center;
    line-height: 20vh;
    color: #fff;
    background-color: rgba(0, 0, 0, .5);
  }
  .clock-wrapper__active{
    animation: 1s active linear infinite ;
  }
  .clock-wrapper__undo{
    display: none;
  }
  .clock-wrapper__danger-text{
    color: red;
  }
  .clock-wrapper__info-text{
    color: #fff;
  }
  @keyframes active{
    0%{
      font-size: 0;
    }
    50%{
      font-size: .5rem;
    }
    100%{
      font-size: 1rem;
    }
  }
}

.un-wrapper{
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/imgs/bg_loading.jpg');
  background-size: 100vw 100vh;
  background-repeat: no-repeat;
  background-position: center;

  .tips-text{
    position: fixed;
    left: 50%;
    bottom: 20%;
    transform: translateX(-50%);
    width: 60vw;
    height: 7vh;
    margin: 0 auto;
    color: red;
    text-align: center;
    line-height: 7vh;
    border-radius: 4rem;
    background-color: #fff;
  }
}
</style>
