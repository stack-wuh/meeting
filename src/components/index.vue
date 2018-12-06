<template>
  <section class="wrapper">
    <header ref="headBox" class="header-wrapper">
      <div @click="jumpToOther({path: '/center'})" class="avatar-box">
        <img :src="info.headPic || defaultAvatar" alt="avatar">
      </div>
    </header>

    <van-notice-bar
      @click="jumpToOther({path: '/barrage'})"
      text="足协杯战线连续第2年上演广州德比战，上赛季半决赛上恒大以两回合5-3的总比分淘汰富力"
      :left-icon="msgIcon"
      class="my-notice-bar">
    </van-notice-bar>


    <section class="card-list">
      <section v-if="!item.status" @click="jumpToOther(item)" v-for="(item, index) in list" :key="index" class="card-item">
        <img :src="item.picture || item.url" alt="bgImg">
        <span class="card-title">{{item.label || item.name}}</span>
      </section>
    </section>

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
      msgIcon: require('@/assets/imgs/icon-tip-1.png'),
      list: [],
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
      this.$router.push({path: item.path, query: {tag: item.name, ename: item.ename, id: item.id}})
    }
  },
  created(){
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
      this.$refs.headBox.style.backgroundImage = `url(${res.comStr})`
      this.list = res.data.data.map(item => {
        return  {...item, path: map.get(item.id)}
      })
    })
  },
  mounted(){
    let elems =  document.querySelectorAll('img')
  }
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
