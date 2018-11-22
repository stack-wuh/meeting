<template>
  <section class="btn-wrapper">
    <section class="btn-area">
      <button :disabled="disabled" :class="['my-button', klass]" @click="handleClick" type="button" name="button">{{text}}</button>
    </section>
  </section>
</template>
<script>

export default {
  props: {
    text: {
      type: String,
      default: '确认'
    },
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: [String, Boolean],
      default: false
    }
  },
  name: '',
  components: {},
  computed: {
    classType() {
      return this.disabled ? 'disabled' : this.type
    }
  },
  data(){
    return {
      types:[],
      klass: '',
    }
  },
  methods: {
    handleClick(){
      this.$emit('handleClickBtn')
    }
  },
  created(){
    this.types = new Map([
      ['danger', 'type-danger'],
      ['default', ''],
      ['disabled', 'type-disabled']
    ])
    this.klass = this.types.get(this.classType)
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/style/color.less';
.btn-wrapper{
  width: 100%;
  height: auto;
  max-height: 2rem;
  text-align: center;
  background-color: #fff;
  button.my-button{
    width: 80%;
    height: 1rem;
    margin:.3rem 0;
    border: none;
    background-color: #fff;
    color: #333;
    border:1px solid #eee;
    border-radius: 4px;
  }

  .type-danger{
    background-color:@base-danger-background-color !important;
    color: @base-danger-text-color !important;
  }
  .type-disabled{
    background-color: @base-disabled-background-color !important;
    color: @base-disabled-text-color !important;
  }
}
</style>
