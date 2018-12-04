<template>
  <div ref = "app" id="app">
    <transition
      :name = "path === '/index' ? 'slide-fade' : 'bounce'"
    >
      <router-view/>
    </transition>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {}
    },
    computed: {
      path(){
        return this.$route.path
      }
    },
    methods:{
      resize(){
        let elem = this.$refs.app
        setTimeout(() => {
          elem.style.width = '100vw'
          elem.style.height = '100vh'
        }, 300)
      },
    },
    mounted(){
      window.addEventListener('resize', this.resize(), false)
    }
  }
</script>

<style scoped lang="less">
  .bouce-enter-active{
    animation: bounce-in 1s ease;
  }
  .bounce-leave-active{
    animation: bounce-in 1s ease reverse;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(100%);
    opacity: 0;
  }
  @keyframes bounce-in{
    0%{
      transform: translateX(-100%);
    }
    50%{
      transform: scale(.8)
    }
    100%{
      transform: scale(1);
    }
  }



</style>
