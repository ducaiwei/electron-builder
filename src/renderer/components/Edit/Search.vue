<template>
  <div class="search-box fadeIn">
    <input type="text" v-model="searchValue" class="search-input"
    ref="searchInput" @input="changeInput">
    <i class="iconfont icon-search search-icon"></i>
    <i class="iconfont icon-close close" @click="hideBox"></i>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.searchInput.focus()
    })
  },
  methods: {
    hideBox () {
      this.$emit('hide')
    },
    changeInput () {
      this.$emit('search', this.searchValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.search-box {
    position: absolute;
    bottom: 0;
    left: 0px;
    width: 100%;
    height: 46px;
    background-color: #fff;
    border-top: 1px solid #d8d8d8;
    z-index: 100;
}
.search-input {
    display: block;
    margin-top: 8px;
    margin-left: 10px;
    width: 300px;
    padding-left: 18px;
    height: 30px;
    border: 1px solid #d8d8d8;
    border-radius: 2px;
}
.search-icon {
    display: block;
    font-size: 12px;
    position: absolute;
    left: 15px;
    top: 17px;
}
.close {
    display: block;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 14px;
    color: #bbb;
    cursor: pointer;
}
</style>

