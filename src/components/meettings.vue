<template>
  <section class="wrapper">
      <header class="header flex flex-flow__col flex-align__center flex-justify__center">
        <h2>{{path === '/meettings' ? '会议资料' : '座位安排'}}</h2>
        <p>{{path === '/meettings' ? 'CONEERENCE INFORMATION' : 'SEATING PLAN' }}</p>
      </header>
      <section class="content flex flex-flow__col">
        <h3 class="content__title">2018年东风LEAR年会</h3>
        <article v-if="path === '/meettings'" class="content__info">this is content for test one 111__,
          this is content for test one 111__,
          this is content for test one 111__,
          this is content for test one 111__,
          this is content for test one 111__,
            this is content for test one 111__,
            this is content for test one 111__,
            this is content for test one 111__,
            this is content for test one 111__,
              this is content for test one 111__,
              this is content for test one 111__,
              this is content for test one 111__,
              this is content for test one 111__,
                this is content for test one 111__,
                this is content for test one 111__,
                this is content for test one 111__,
                this is content for test one 111__,
                  this is content for test one 111__,
                  this is content for test one 111__,
                  this is content for test one 111__,
                  this is content for test one 111__,
                    this is content for test one 111__,
                    this is content for test one 111__,
                    this is content for test one 111__,
                    this is content for test one 111__,
                      this is content for test one 111__,
                      this is content for test one 111__,
                      this is content for test one 111__,
                      this is content for test one 111__,
                        this is content for test one 111__,
                        this is content for test one 111__,
                        this is content for test one 111__,
                        this is content for test one 111__,
                          this is content for test one 111__,
                          this is content for test one 111__,
                          this is content for test one 111__,
                          this is content for test one 111__,
                            this is content for test one 111__,
                            this is content for test one 111__,
                            this is content for test one 111__,</article>
        <my-button :disabled="true" @handleClickBtn="handleDownLoad" v-if="path === '/meettings'" text="下载会议资料" type="danger"></my-button>
      </section>
  </section>
</template>
<script>
import MyButton from '@/components/common/button'
export default {
  props: {},
  name: '',
  components: {
    MyButton,
  },
  data(){
    return {
      isDisabled: true,
      count: 0
    }
  },
  computed: {
    path(){
      return this.$route.path
    }
  },
  methods: {
    handleDownLoad(){
      this.count ++
      console.log(this.count)
    }
  },
  created(){

  }
}
</script>
<style lang="less" scoped>
 .wrapper{
   height: inherit;
   width: inherit;
   background-color: #eee;
   background-image: url(../assets/imgs/bg_meetting.png);
   background-position: 0 0;
   background-repeat: no-repeat;
   background-size: 100% 4rem;
   overflow-y: scroll;

   header.header{
     height: 1.8rem;
     width: inherit;
     color:  #fff;
     line-height: 2;
   }

   .content{
     height: inherit;
     width: calc(100% - .6rem);
     margin-left: .3rem;
     background-color: #fff;
     border-top-left-radius: 4px;
     border-top-right-radius: 4px;

     .content__title{
       padding: .4rem;
       color: #FF0000;
     }
     .content__info{
       padding:0 .2rem;
       box-sizing: border-box;
       background-color: #fff;
     }
   }
 }
</style>
