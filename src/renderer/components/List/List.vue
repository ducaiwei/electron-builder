<template>
    <ul v-if="contents.length > 0" class="title-box">
        <li v-for="(c, index) in contents" :key="index" :title="c.title"
        :class="selectContent && c.id === selectContent.id  ? 'active': ''"
        @click="selectItem(c)">
            <i class="iconfont icon-file"></i>
            <span class="span-title">{{c.title}}</span>
            <span class="right-icon" v-if="selectContent && c.id === selectContent.id">
            <i class="iconfont item-icon icon-edit"
            @click="update(c)"></i>
            <i class="iconfont item-icon icon-copy"
            @click="copyContent(c)"></i>
            <i class="iconfont item-icon icon-delete" @click="deleteContent(c)"></i>
            </span>
        </li>
    </ul>
</template>
<script>
export default {
  props: {
    contents: {
      type: Array,
      default: () => []
    },
    selectContent: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    update (c) {
      this.$emit('update', c)
    },
    deleteContent (c) {
      this.$emit('deleteContent', c)
    },
    selectItem (c) {
      this.$emit('select', c)
    },
    copyContent (c) {
      this.$emit('copy', c.content)
    }
  }
}
</script>
<style lang="scss">
.title-box {
    width: 100%;
    margin-bottom: 40px;
    li {
      position: relative;
      display: block;
      padding: 10px;
      font-size: 12px;
      color: #979da7;
      cursor: pointer;
      span {
        display: inline-block;
        vertical-align: middle;
        &.span-title {
          max-width: 75%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      &.active {
        background-color: #2d3138;
        color: #fff;
      }
      i {
        font-size: 10px;
      }
      .right-icon {
        position: absolute;
        right: 10px;
      }
    }
  }
  .item-icon {
    margin-right: 2px;
  }
</style>
