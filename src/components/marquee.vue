<template>
  <section class="wrapper">
    <section ref="print" id="print" class="canvas-box">
      <canvas id="canvas"></canvas>
    </section>
  </section>
</template>
<script>
const  dataBarrage = [{
    value: '使用的是静态死数据',
    color: 'blue',
    range: [0, 0.5]
  }, {
    value: '随机循环播放',
    color: 'blue',
    range: [0, 0.6]
  }, {
    value: '可以控制区域和垂直分布范围',
    color: 'blue',
    range: [0, 0.5]
  }, {
    value: '字体大小和速度在方法内设置',
    color: 'black',
    range: [0.1, 1]
  }, {
    value: '适合用在一些静态页面上',
    color: 'black',
    range: [0.2, 1]
  }, {
    value: '基于canvas实现',
    color: 'black',
    range: [0.2, 0.9]
  }, {
    value: '因此IE9+浏览器才支持',
    color: 'black',
    range: [0.2, 1]
  }, {
    value: '可以设置边框颜色',
    color: 'black',
    range: [0.2, 1]
  }, {
    value: '文字颜色默认都是白色',
    color: 'black',
    range: [0.2, 0.9]
  }, {
    value: '若文字颜色不想白色',
    color: 'black',
    range: [0.2, 1]
  }, {
    value: '需要自己调整下JS',
    color: 'black',
    range: [0.6, 0.7]
  }, {
    value: '如果需要的是真实和视频交互的弹幕',
    color: 'black',
    range: [0.2, 1]
  }, {
    value: '可以回到原文',
    color: 'black',
    range: [0, 0.9]
  }, {
    value: '查看另外一个demo',
    color: 'black',
    range: [0.7, 1]
  }, {
    value: '下面就是占位弹幕了',
    color: 'black',
    range: [0.7, 0.95]
  }, {
    value: '前方高能预警！！！',
    color: 'orange',
    range: [0.5, 0.8]
  }, {
    value: '前方高能预警！！！',
    color: 'orange',
    range: [0.5, 0.9]
  }, {
    value: '前方高能预警！！！',
    color: 'orange',
    range: [0, 1]
  }, {
    value: '前方高能预警！！！',
    color: 'orange',
    range: [0, 1]
}];
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      dataBarrage,
    }
  },
  computed:{
    VirData(){
      let _arr = this.dataBarrage
      for(var i = 0 ; i< 5; i ++){
        _arr.push(...this.dataBarrage)
      }
      return _arr
    }
  },
  methods: {
    canvasBarrage(canvas, data){
      if (!canvas || !data || !data.length) {
        return;
      }
      if (typeof canvas == 'string') {
        canvas = document.querySelector(canvas);

        this.canvasBarrage(canvas, data);
        return;
      }
      var context = canvas.getContext('2d');
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      let img = new Image()
      img.src = 'http://a2.att.hudong.com/77/29/01300000291092128871291549831.jpg'

      // 存储实例
      var store = {};

      // 字号大小
      var fontSize = 20;

      // 实例方法
      var Barrage = function(obj, index) {
        // 随机x坐标也就是横坐标，对于y纵坐标，以及变化量moveX
        this.x = (1 + index * 0.1 / Math.random()) * canvas.width;
        // this.x = canvas.width
        this.y = obj.range[0] * canvas.height + (obj.range[1] - obj.range[0]) * canvas.height * Math.random() + 36;
        if (this.y < fontSize) {
          this.y = fontSize;
        } else if (this.y > canvas.height - fontSize) {
          this.y = canvas.height - fontSize;
        }
        this.moveX = 1 + Math.random() * 2;

        this.opacity = 0.8 + 0.2 * Math.random();
        this.params = obj;

        this.draw = function() {
          var params = this.params;
          // 根据此时x位置绘制文本
          context.strokeStyle = '#000';
          context.font = 'bold ' + fontSize + 'px "microsoft yahei", sans-serif';
          context.strokeText(params.value, this.x, this.y);
        };
      };

      data.map(function(obj, index) {
        store[index] = new Barrage(obj, index);
      })

      // 绘制弹幕文本
      var draw = function() {
        for (var index in store) {
          var barrage = store[index];
          // 位置变化
          barrage.x -= barrage.moveX;
          if (barrage.x < -1 * canvas.width * 1.5) {
            // 移动到画布外部时候从左侧开始继续位移
            barrage.x = (1 + index * 0.1 / Math.random()) * canvas.width;
            barrage.y = (barrage.params.range[0] + (barrage.params.range[1] - barrage.params.range[0]) * Math.random()) * canvas.height;
            if (barrage.y < fontSize) {
              barrage.y = fontSize;
            } else if (barrage.y > canvas.height - fontSize) {
              barrage.y = canvas.height - fontSize;
            }
            barrage.moveX = 1 + Math.random() * 3;
          }
          // 根据新位置绘制圆圈圈
          store[index].draw();
        }
      };

      // 画布渲染
      var render = function() {
        // 清除画布
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height)
        // 绘制画布上所有的圆圈圈
        draw();

        // 继续渲染
        let timer = requestAnimationFrame(render);
      };

      render()
    },

    /**
     * [lang description]
     * @type {String}
     */
    translateScreen(){
      let width = document.documentElement.clientWidth,
          height = document.documentElement.clientHeight,
          elem = this.$refs.print
      if(width < height){
        elem.style.width = height + 'px'
        elem.style.height = width + 'px'
        elem.style.top = ((height - width ) / 2) + 'px'
        elem.style.left = (0 - (height - width) / 2) + 'px'
      }
      var evt = "onorientationchange" in window ? "orientationchange" : "resize"
      window.addEventListener(evt, function(){
        setTimeout(() =>{
          let width = document.documentElement.clientWidth,
              height = document.documentElement.clientHeight,
              elem = this.$refs.print
              this.$toast(width, height)
          if(width > height){
            elem.style.width = height + 'px'
            elem.style.height = width + 'px'
            elem.style.top = '0'
            elem.style.left = '0'
            elem.style.transform = 'none'
            elem.style.transformOrigin = '50%'
          }else {
            elem.style.width = height + 'px'
            elem.style.height = width + 'px'
            elem.style.top = ((height - width ) / 2) + 'px'
            elem.style.left = (0 - (height - width) / 2) + 'px'
            elem.style.transform = 'rotate(90deg)'
            elem.style.transformOrigin = '50%'
          }
        }, 300)
      }, true)
    }
  },
  created(){
    setTimeout(() => {
      this.canvasBarrage('#canvas', this.VirData)
    }, 1000)
  },
  mounted(){
    setTimeout(() => {
      this.translateScreen()
    }, 1000)
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  width: inherit;
  height: inherit;
  box-sizing: border-box;
  .canvas-box{
    width: inherit;
    height: inherit;
    canvas{
      width: inherit;
      height: inherit;
    }
  }
}
@media screen and (orientation: portrait){ // 竖屏
  body{
    background-color: red;
    #print{
      position: absolute;
      top: 0;
      left: 0;
      -webkit-transform: rotate(90deg);
      -moz-transform: rotate(90deg);
      -ms-transform: rotate(90deg);
      transform: rotate(90deg);
      width: 100vh;
      height: 100vh;
      overflow: hidden;
      // transform-origin: 50vw 28vh;
    }
  }
}
@media screen and (orientation: landscape){ // 横屏
  body{
    background-color: blue;
    #print{
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
  }
}
</style>
