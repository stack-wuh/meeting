<template>
  <section class="wrapper flex flex-flow__col">
    <section class="list">
      <van-checkbox-group v-model="result" :max="3">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in list"
            :key="index"
            :title="`${item.name}`"
            clickable
            >
              <van-checkbox  :name="item" ref="checkboxs" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </section>
    <section  class="btn-area">
      <button @click="handleSubmit" :class="[canVote == true ? 'btn__submit' : 'btn__submit btn__disabled' ]" type="button" name="button">投票</button>
    </section>
  </section>
</template>
<script>
import MyDialog from '@/components/common/dialog'
import {mapActions} from 'vuex'

const LocalStorage = window.localStorage
export default {
  props: {},
  name: '',
  components: {
    MyDialog
  },
  data(){
    return {
      result: [],
      isShowDialog: false,

      list: [],
      Socket: null,
      canVote: true,
      remind: '请选择三个部门后投票'
    }
  },
  methods: {
    ...mapActions({
      'getVoteInfo': 'getVoteInfo',
      'postVoteList': 'postVoteList',
      'handleCheckVote': 'handleCheckVote'
    }),
    handleSubmit(){
      let local = localStorage.getItem('userInfo')
      local = local && JSON.parse(local)
      let ids = this.result && this.result.map(item => item.id)
      let that = this
      let message = {
        depId: ids,
        voterId: local.id
      }
      let bg_1 = require('@/assets/imgs/icon-support.png')

      const canVoteing = () => {
        this.$dialog.confirm({
          title: '提示',
          message: `<img src="${bg_1}" alt="logo" style="width: 100%; height: 100%; margin: 0 auto;" />`
        })
        .then(() => {
          this.Socket.send(JSON.stringify(message))
          localStorage.setItem('canVote', false)
          this.result = []
          setTimeout(() => {
            this.Socket.close()
            this.$router.go(-1)
          }, 1000)
        })
        .catch(() => {
          this.result = []
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
      }
      const voteing = () => {
        this.$dialog.confirm({
          title: '提示',
          message: '请选择一个部门后提交',
          showCancelButton: false
        }).then(() => {
          that.handleCloseDialog()
        })
      }
      let actions = new Map([
        [{canVote: true, result: /1/}, canVoteing],
        [{canVote: true, result: /0/}, voteing],
        [{canVote: true, result: /[2-]/}, voteing]
      ])
      let action = [...actions].filter(([key, value]) => (key.canVote === this.canVote && key.result.test(ids)))
      action.forEach(([key, value]) => {
        value.call(this)
      })
    }
  },
  created(){
    let local = localStorage.getItem('userInfo')
    local = local && JSON.parse(local)
    this.Socket = new WebSocket(window.socketPath + `meeting/voteWebsocket/${local.id}/${local.orginalJob || 0}`)
    this.getVoteInfo().then(res => {
      this.list = res.data
    })
    this.handleCheckVote({userId: local.id}).then(res => {
      this.canVote = res.status === 0 ? true : false
    })
  },
  distoryed(){
    this.Socket.close()
  }
}
</script>
<style lang="less" scoped>
@import '../assets/style/color.less';
  .wrapper{
    width: inherit;
    height: inherit;
    overflow-y: auto;
    background-color: #F2F6F9;
    z-index: 1000 !important;
    .list{
      width: inherit;
    }
    .btn-area{
      min-height: 2rem;
      width: inherit;
      text-align: center;
      .btn__submit{
        width: 6.4rem;
        height: 1rem;
        margin-top: .5rem;
        background-color: @base-blue;
        color: #fff;
        border: none;
      }
      .btn__disabled{
        background-color: #eee;
        color: #999;
      }
    }
  }
</style>
