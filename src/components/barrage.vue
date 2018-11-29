<template>
  <section class="wrapper">
    <section id="print" ref="print">
      <div id="content" class="content"></div>
      <div class="content-input">
          <input id="text" type="text">
          <button id="send">发送</button>
      </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  props: {},
  name: '',
  components: {},
  data(){
    return {
      Socket: null,
      orientation: 0
    }
  },
  watch:{
    orientation(){
      this.translateScreen()
    }
  },
  methods: {
    translateScreen(){
      let width = document.documentElement.clientWidth,
          height = document.documentElement.clientHeight,
          elem = this.$refs.print
      if(width < height){
        elem.style.width = height + 'px'
        elem.style.height = width + 'px'
        elem.style.top = ((height - width ) / 2) + 'px'
        elem.style.left = (0 - (height - width) / 2) + 'px'
        elem.style.zIndex = '100'
      }
      var evt = "onorientationchange" in window ? "orientationchange" : "resize"
      window.addEventListener(evt, resize, false)
      function resize(flag) {
        if(window.orientation == 0 || window.orientation == 180){
          elem.style.width = '100vh'
          elem.style.height = '100vw'
          elem.style.top = ((height - width ) / 2) + 'px'
          elem.style.left = (0 - (height - width) / 2) + 'px'
          elem.style.transform = 'rotate(90deg)'
          elem.style.transformOrigin = '50%'
          elem.style.zIndex = '100'
        }else{
          elem.style.width = '100vw'
          elem.style.height = '100vh'
          elem.style.top = '0'
          elem.style.left = '0'
          elem.style.transform = 'none'
          elem.style.transformOrigin = 'none'
          elem.style.zIndex = '100'
        }
      }
      resize.call(this, true)
      return
      window.addEventListener(evt, function(){
        setTimeout(() =>{
          let width = document.documentElement.clientWidth,
              height = document.documentElement.clientHeight,
              elem = this.$refs.print
          if(width > height){ // 横屏
            elem.style.width = '100vh'
            elem.style.height = '100vw'
            elem.style.top = '0'
            elem.style.left = '0'
            elem.style.transform = 'none'
            elem.style.transformOrigin = 'none'
            elem.style.zIndex = '100'
            elem.style.backgroundColor = 'blue'
          }else { // 竖屏
            elem.style.width = height - 16 + 'px'
            elem.style.height = width + 'px'
            elem.style.top = ((height - width ) / 2) + 'px'
            elem.style.left = (0 - (height - width) / 2) + 'px'
            elem.style.transform = 'rotate(90deg)'
            elem.style.transformOrigin = '50%'
            elem.style.zIndex = '100'
          }
        }, 300)
      }, true)
    },
  },
  created(){
    let local = window.localStorage.getItem('userInfo')
    local = local && JSON.parse(local)
    this.Socket = new WebSocket(window.socketPath + 'meeting/websocket')
    setTimeout(() => {
      (function (that) {
          class Barrage {
              constructor(id) {
                  this.domList = [];
                  this.dom = document.querySelector('#' + id);
                  if (this.dom.style.position == '' || this.dom.style.position == 'static') {
                      this.dom.style.position = 'relative';
                  }
                  this.dom.style.overflow = 'hidden';
                  let rect = this.dom.getBoundingClientRect();
                  this.domHeight = rect.right - rect.left;
                  this.domWidth = rect.bottom - rect.top;
              }

              shoot(text) {
                  let div = document.createElement('div');
                  div.style.position = 'absolute';
                  div.style.left = this.domWidth + 'px';
                  div.style.top = (this.domHeight - 20) * + Math.random().toFixed(2) + 'px';
                  div.style.whiteSpace = 'nowrap';
                  div.style.color = '#' + Math.floor(Math.random() * 256).toString(10);
                  div.style.fontSize = '14px'
                  div.innerText = text;
                  this.dom.appendChild(div);

                  let roll = (timer) => {
                      let now = +new Date();
                      roll.last = roll.last || now;
                      roll.timer = roll.timer || timer;
                      let left = div.offsetLeft;
                      let rect = div.getBoundingClientRect();
                      if (left < (rect.left - rect.right)) {
                          this.dom.removeChild(div);
                      } else {
                          if (now - roll.last >= roll.timer) {
                              roll.last = now;
                              left -= 2.4;
                              div.style.left = left + 'px';
                          }
                          requestAnimationFrame(roll);
                      }
                  }
                  roll(50 * +Math.random().toFixed(2));
              }

          }

          let barage = new Barrage('content');

          document.querySelector('#send').onclick = () => {
              let text = document.querySelector('#text').value;
              let elem = document.querySelector('#text')
              let message = {
                message: text,
                userId: local.id
              }
              that.$toast({type: 2, msg: `${message}`})
              that.Socket.send(JSON.stringify(message))
              elem.value = ' '
          };
          let textList = ['热场弹幕', '新年快乐', '吉祥如意', '心想事成', '热场弹幕', '热场弹幕', '新年快乐', '吉祥如意', '心想事成', '热场弹幕', '新年快乐', '吉祥如意', '心想事成', ];
          that.Socket.onmessage = function (e){
            console.log(e.data)
            textList.push(e.data)
            for(var i = 0; i < textList.length; i ++){
              barage.shoot(textList[i])
              textList.shift()
              i--
            }
          }
      })(this)
    })
  },
  mounted(){
    this.translateScreen()
  },
  distoryed(){
    this.Socket.close()
  }
}
</script>
<style lang="less" scoped>
.container {
    position: relative;
    width: 700px;
    height: 500px;
    margin: auto;
    padding-right: 200px;
}

.content {
    width: 100%;
    height: 300px;
    border: 1px solid #ccc;
}

.content-input {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    border: 1px solid #ccc;
}

.content-input input {
    width: 70%;
    padding: 2px;
    border-radius: 5px;
}

.content-input button {
    padding: 3px 10px;
    border: none;
    border-radius: 5px;
    background: rgb(90, 154, 214);
}

#print{
  // border:1px solid red;
}
@media screen and (orientation: portrait){ // 竖屏
  body{
    // background-color: red;
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
      z-index: 100;
      .content-input{
        position: relative;
        top: -20%;
        left: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8rem;
        height: .6rem;
        font-size: .2rem;
        border: none;
        #text{
          width: 6rem;
          margin-right: .2rem;
          font-size: .2rem;
        }
        #send{
          font-size: .26rem;
        }
      }
    }
  }
}
@media screen and (orientation: landscape){ // 横屏
  body{
    // background-color: blue;
    #print{
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
      width: 100vw;
      height: 100vh;
      // background-color: red;
      .content-input{
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8rem;
        height: .8rem;
        margin-left: 50%;
        transform: translateX(-50%);
        font-size: .1rem;
        border: none;
        #text{
          width: 6rem;
          height: .6rem;
          margin-right: .2rem;
          font-size: .3rem;
        }
        #send{
          font-size: .26rem;
        }
      }
    }
  }
}

</style>
