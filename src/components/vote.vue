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
              <van-checkbox :disabled="canVote" :name="item" ref="checkboxs" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </section>
    <section class="btn-area">
      <button @click="handleSubmit" :class="[canVote == false ? 'btn__submit' : 'btn__submit btn__disabled' ]" type="button" name="button">投票</button>
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
      canVote: LocalStorage.getItem('canVote') || false,
      remind: '请选择三个部门后投票'
    }
  },
  methods: {
    ...mapActions({
      'getVoteInfo': 'getVoteInfo',
      'postVoteList': 'postVoteList'
    }),
    handleSubmit(){
      let ids = this.result && this.result.map(item => item.id)
      let data = {
        message: ids
      }
      let bg_1 = require('@/assets/imgs/icon-support.png')

      const canVoteing = () => {
        this.$dialog.confirm({
          title: '提示',
          message: `<img src="${bg_1}" alt="logo" style="width: 100%; height: 100%; margin: 0 auto;" />`
        })
        .then(() => {
          this.Socket.send(JSON.stringify(data))
          LocalStorage.setItem('canVote', true)
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
      const unCanVoteing = () => {
        this.$dialog.confirm({
          title: '提示',
          message: '请勿重复投票',
          showConfirmButton: false,
        }).catch(() => {
          this.handleCloseDialog()
        })
      }
      let actions = new Map([
        [{canVote: false, result: 3}, canVoteing],
        [{canVote: true, result: 0}, unCanVoteing]
      ])
      let action = [...actions].filter(([key, value]) => (key.canVote === this.canVote && key.result === ids.length))
      action.forEach(([key, value]) => {
        value.call(this)
      })
    }
  },
  created(){
    this.Socket = new WebSocket('ws://192.168.10.122:8082/meeting/voteWebsocket/2')
    this.getVoteInfo().then(res => {
      this.list = res.data
    })
  },
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
