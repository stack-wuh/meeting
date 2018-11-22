<template>
  <section class="wrapper flex flex-flow__col">
    <section class="list">
      <van-checkbox-group v-model="result" :max="3">
        <van-cell-group>
          <van-cell
            v-for="(item, index) in 20"
            :key="index"
            :title="`复选框${item}`"
            clickable
            @click="toggle(index)"
            >
              <van-checkbox :name="item" ref="checkboxs" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
    </section>

    <section class="btn-area">
      <button @click="handleSubmit" class="btn__submit" type="button" name="button">投票</button>
    </section>

    <my-dialog  @hanleCloseDialog="hanleCloseDialog" :visibleDialog="isShowDialog" title="提示">
      <section v-if="result.length < 3" class="flex flex-align__center flex-justify__center" slot="text">请选择三个部门</section>
      <section v-if="result.length === 3" class="imgs-box" slot="text">
        <img src="../assets/imgs/icon-support.png" alt="logo" style="width: 100%; height: 100%; margin: 0 auto;">
      </section>
    </my-dialog>
  </section>
</template>
<script>
import MyDialog from '@/components/common/dialog'
export default {
  props: {},
  name: '',
  components: {
    MyDialog
  },
  data(){
    return {
      result: [],
      isShowDialog: false
    }
  },
  methods: {
    toggle(index){
      console.log(index, this.result)
    },
    hanleCloseDialog(){
      this.isShowDialog = false
    },
    handleSubmit(){
      this.isShowDialog = true
    }
  },
  created(){}
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
    }
  }
</style>
