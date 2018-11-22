<template>
  <section class="wrapper">
    <header class="header flex flex-justify__center">
      <strong>5/12</strong>
    </header>

    <section class="list-box">
      <section class="head flex flex-justify__end">
          <img class="head__star" src="../assets/imgs/icon-star.png" alt="star">
          <span class="head__num flex-self__end">24人</span>
      </section>
      <section class="list">
        <h4 class="list__title">这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题这里是标题</h4>
        <ul class="list__item">
            <li class="item">A. 这里是选项A,这里是选项A,这里是选项A，这里是选项A</li>
            <li class="item">B. 这里是选项B</li>
            <li class="item">C. 这里是选项C</li>
            <li class="item">D. 这里是选项D</li>
        </ul>
      </section>
    </section>
  </section>
</template>
<script>
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {}
  },
  methods: {},
  created(){}
}
</script>
<style lang="less" scoped>
.wrapper{
  width: inherit;
  height: inherit;
  background-image: url('../assets/imgs/bg_7.png');
  overflow-y: scroll;
  header.header{
    width:inherit;
    height: 1.2rem;
    color: #F28B00;
    font-size: .5rem;
    background-image: url(../assets/imgs/sprite.png);
    background-size: 100%;
    background-position: -2.28rem .46rem;
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
        .item:after{
          position: absolute;
          top:92%;
          right: 15%;
          content: '';
          padding: 0.08rem 0.2rem;
          background-color: #fff;
        }
        .item:before{
          position: absolute;
          top:92%;
          right: 25%;
          content: '';
          padding: 0.08rem 0.1rem;
          background-color: #fff;
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
}
</style>
