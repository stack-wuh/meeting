<template>
  <section v-show="visibleDialog" class="wrapper">
    <van-dialog
      v-model="visibleDialog"
      :title= 'title'
      :message= 'message'
      @confirm = 'handleConfirm'
      @cancel = 'handleCancel'
      :before-close="beforClose"
      :show-confirm-button= "canShowConfirmButton"
      :show-cancel-button= "canShowCancelButton"
      :confirm-button-text = 'confirmButtonText'
      :cancel-button-text = 'cancelButtonText'
    >
    <section class="content">
      <slot name="form-area"></slot>
      <slot name="text"></slot>
    </section>
    </van-dialog>
  </section>
</template>
<script>
export default {
  props: {
    visibleDialog: {
      type: [String, Boolean],
      default: false,
      required: true,
    },
    title: {
      type: String,
      default: '提示'
    },
    message: {
      type: String,
      default: ''
    },
    canShowConfirmButton:{
      type: [String, Boolean],
      default: true
    },
    canShowCancelButton: {
      type: [String, Boolean],
      default: true
    },
    confirmButtonText: {
      type: String,
      default: '确认'
    },
    cancelButtonText: {
      type: String,
      default: '取消'
    }
  },
  name: '',
  components: {},
  data(){
    return {}
  },
  methods: {
    handleConfirm(){},
    handleCancel(){},
    beforClose(action, done){
      this.$emit('hanleCloseDialog')
      done(false)
    }
  },
  created(){}
}
</script>
<style lang="scss" scoped>
.wrapper{
  position: fixed;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000 !important;

  .content{
    min-height: 2rem;
    padding: .3rem;
  }
}
</style>
