<template>
  <section class="wrapper flex flex-flow__col">
    <section v-if="isRefresh" class="list-content">
        <ul class="list">
          <li @click="handleClickSubmit(item, index)" v-for="(item, index) in list" :key="index" class="list-item flex flex-flow__col">
            <section class="list-item__name flex flex-justify__between">
              <strong>{{item.explainer || '姓名'}}</strong>
              <strong>{{item.score || '分数'}}</strong>
            </section>
            <section class="list-item__desc flex flex-align__start">
              <span class="item-desc__title">议题: </span>
              <article class="item-desc__info">
                {{item.topic || '议题内容'}}
              </article>
            </section>
          </li>
        </ul>
    </section>
    <van-dialog
      v-model = 'visibleDialog'
      show-cancel-button
      @confirm= "saveOneInfo"
      @cancel="cancelOneInfo"
      v-if="canShowQues == true"
    >
    <section class="flex" style="height: 3.42rem; background-color: #eee;" >
      <van-field
        v-model = "score"
        label = "分数: "
        placeholder= "请编辑分数"
        style="width: 80%; margin: 0 auto;"
      ></van-field>
    </section>
    </van-dialog>
  </section>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      visibleDialog : false,
      score: '',

      list: [], // 保存打分列表
      temp__index: -1, // 临时保存单击议题的数组下标

      Socket: null,
      canShowQues: true,
      isRefresh: true
    }
  },
  methods: {
    ...mapActions({
      'getGradeInfo': 'getGradeInfo',
      'handleVildaGrade': 'handleVildaGrade'
    }),
    handleClickSubmit(item, index){
      if(item.explainer && !item.score){
        this.visibleDialog = true
        this.temp__index = index
        this.score = item.score
       }
    },
    saveOneInfo(){
      let local = window.localStorage.getItem('userInfo')
      local = local && JSON.parse(local)
      let data = {explainer: local.id, topicId: this.list[this.temp__index].topicId, score: this.score}
      let reg =  /^(?:0|[1-9][0-9]?|100)$/
      if(reg.test(data.score)){
        this.$set(this.list[this.temp__index], 'score', this.score )
        this.Socket.send(JSON.stringify(data))
        setTimeout( () => {
          this.score = ''
          this.visibleDialog = false
        }, 1000)
      }else{
        this.$toast({
          type: 3,
          msg: '请编辑正确的分数'
        })
      }

    },
    cancelOneInfo(){
      this.score = ''
    },

    fetchData(){
      let local = window.localStorage.getItem('userInfo')
      local = local && JSON.parse(local)
      this.list = []
      this.isRefresh = false
      this.handleVildaGrade({userId: local.id}).then(res => {
        this.canShowQues = res.status === 0 ? true : false
      })
      this.getGradeInfo().then(res =>{
        this.list = res.data
        this.isRefresh = true
      })
    }
  },
  created(){
    this.fetchData()
    let local = window.localStorage.getItem('userInfo')
    local = local && JSON.parse(local)
    let that = this
    this.Socket = new WebSocket(window.socketPath + `meeting/topicWebsocket/${local.id}/${local.orginalJob || 0}`)
    this.Socket.onmessage = function(e) {
      if(e.data === 'display'){
        that.fetchData()
      }
    }
    this.handleVildaGrade({userId: local.id}).then(res => {
      this.canShowQues = res.status === 0 ? true : false
      if(res.status === 3){
        setTimeout(() => {
          this.$router.push({path: '/index'})
        }, 1000)
      }
    })
  },
  distoryed(){
    this.Socket.close()
  }
}
</script>
<style lang="less" scoped>
  .wrapper{
    height: 100%;
    overflow-y: scroll;
    background-color: #F2F6F9;
    .list-content{
      width: 100%;
      .list{
        width: inherit;
        .list-item{
          width: inherit;
          min-height: 2rem;
          margin-bottom: .2rem;
          justify-content: space-between;
          background-color: #fff;
        }
        .list-item__name, .list-item__desc{
          flex:1;
          width: inherit;
          padding: 0 .4rem;
        }
        .list-item__name{
          height: 1rem;
          max-height: 1rem;
          font-size: .32rem;
          border-bottom: 1px solid #eee;
        }
        .list-item__desc{
          padding-top:.3rem;
          padding-bottom: .3rem;
          color: #6B6B6B;
          font-size: .3rem;
          .item-desc__title{
            max-width: 1.2rem;
            margin-right: .3rem;
          }
          .item-desc__info{
            flex:1;
          }
        }
      }
    }

    .btn-area{
      min-height: 1.6rem;
      width: 100%;
      margin-top: -0.2rem;
      text-align: center;
      .btn-submit{
        width:4.5rem;
        height: 0.8rem;
        margin-top: .4rem;
        background-color: #eee;
        color: #7A7A7A;
        font-size: .35rem;
        text-align: center;
        line-height: .8rem;
        border: none;
      }
    }
  }
</style>
