<template>
  <section class="wrapper flex flex-flow__col">
    <section class="list-content">
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
    <section v-if="canShowQues == true" class="btn-area">
      <button  @click="submit" class="btn-submit" type="button" name="button">提交</button>
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
      canShowQues: localStorage.getItem('canShowQues') || true
    }
  },
  methods: {
    ...mapActions({
      'getGradeInfo': 'getGradeInfo'
    }),
    handleClickSubmit(item, index){
      this.visibleDialog = true
      this.temp__index = index
      this.score = item.score
      // console.log(item, index)
    },
    saveOneInfo(){
      // console.log(this.temp__index, this.score, 'is ok')
      this.$set(this.list[this.temp__index], 'score', this.score )
      this.score = ''
    },
    cancelOneInfo(){
      this.score = ''
    },
    submit(){
      let data = this.list.map(item => {
        return {explainer: item.userId, topicId: item.id, score: item.score}
      })
      this.Socket.send(JSON.stringify(data))
      this.Socket.close()
      let storage = localStorage.setItem('canShowQues', false)
      setTimeout(() => {
        this.$router.go(-1)
      }, 1000)
    }
  },
  created(){
    this.Socket = new WebSocket('ws://192.168.10.122:8082/meeting/topicWebsocket/1/2')
    setTimeout(() => {
      this.canShowQues == 'false' &&
      this.$toast({
        type: 2,
        msg: '您已经参与过本次投票了!'
      })
    }, 1000)
    this.getGradeInfo().then(res =>{
      this.list = res.data
    })
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
