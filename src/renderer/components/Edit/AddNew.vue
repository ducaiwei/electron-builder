<template>
  <div class="edit-box fadeIn" ref="adds">
    <div class="mask" @click="hide" ref="mask"></div>
    <div class="edit-wrap">
      <div class="edit-title">添加</div>
      <div class="form-box">
        <div class="form-content">
          <div class="form-item">
            <label for="title">标题</label>
            <input type="text" ref="titleInput" name="title" class="form-control" v-model="title"/>
          </div>
          <div class="form-item">
            <label for="type">类型</label>
            <select name="type" v-model="type" class="form-control">
              <option :value="m.key" v-for="(m, index) in modes" :key="index">{{m.value}}</option>
            </select>
          </div>
          <div class="form-item" ref="addCodeMirror">
            <label for="content">内容</label>
            <code-mirror name="content" class="text-code"
            v-model="content"
            :options="cmOption"
            @input="onCmCodeChange"></code-mirror>
          </div>
        </div>
        <div class="form-item btn-box">
          <button class="form-btn cacel" @click="hide">取消</button>
          <button class="form-btn sure" @click="saveContent">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CodeMirror from '../CodeMirror/CodeMirror'
export default {
  data () {
    return {
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: 'text/plain',
        theme: 'blackboard'
      },
      content: '',
      modes: [
        {key: 'text/plain', value: 'Text'},
        {key: 'text/vue', value: 'Vue'},
        {key: 'text/javascript', value: 'Javascript'},
        {key: 'text/css', value: 'Css'},
        {key: 'text/html', value: 'Html'},
        {key: 'application/x-httpd-php', value: 'Php'},
        {key: 'text/x-python', value: 'Python'},
        {key: 'text/apl', value: 'Apl'},
        {key: 'text/swift', value: 'Swift'},
        {key: 'text/go', value: 'Go'},
        {key: 'text/lua', value: 'Lua'},
        {key: 'text/sql', value: 'Sql'},
        {key: 'text/x-sh', value: 'Shell'},
        {key: 'text/x-java', value: 'Java'},
        {key: 'text/x-c++src', value: 'C++'},
        {key: 'text/x-csrc', value: 'C'},
        {key: 'text/x-csharp', value: 'C#'},
        {key: 'text/x-objectivec', value: 'Object-C'},
        {key: 'text/markdown', value: 'Markdown'}
      ],
      type: 'text/plain',
      title: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.addCodeMirror.addEventListener('paste', (e) => {
        console.log(e.clipboardData)
      })
    })
  },
  watch: {
    type (v, ov) {
      this.cmOption.mode = v
    }
  },
  methods: {
    hide () {
      this.$emit('hide')
    },
    onCmCodeChange (value) {
      this.content = value
    },
    saveContent () {
      if (!this.title) {
        this.$refs.titleInput.focus()
        return
      }
      if (this.content && this.title) {
        let obj = {
          title: this.title,
          content: this.content,
          type: this.type
        }
        this.$emit('save', obj)
      }
    }
  },
  components: {
    CodeMirror
  }
}
</script>
<style lang="scss">
.edit-box {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 101;
  overflow: auto;
}
.mask {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background-color: rgba(0,0,0,.6);
  z-index: 100;
  resize: vertical;
}
.edit-wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -200px;
  width: 500px;
  height: 400px;
  background-color: #fff;
  border-radius: 2px;
  z-index: 102;
}
.edit-title {
  width: 100%;
  padding-left: 20px;
  height: 46px;
  line-height: 46px;
  font-size: 12px;
  color: #515a6e;
  border-bottom: 1px solid #dcdcdc;
  box-sizing: border-box;
}
.form-content {
  padding-bottom: 10px;
  border-bottom: 1px solid #dcdcdc;
}
.form-item {
  label {
    padding-left: 20px;
    padding-right: 10px;
    font-size: 12px;
    line-height: 36px;
  }
  &:after {
    content: "";
    clear: both;
  }
  &.btn-box {
    float: right;
  }
  &:after {
    content: "";
    display: block;
    clear: both;
  }
}
.form-item {
  margin-top: 10px;
  label {
    display: block;
    float: left;
    color: #515a6e;
  }
}
.form-control {
  display: block;
  width: 300px;
  height: 36px;
  padding-left: 10px;
  line-height: 36px;
  border: 1px solid #dcdcdc;
  border-radius: 3px;
  box-sizing: content-box;
}
.form-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 2px;
  margin-right: 20px;
  cursor: pointer;
  &.cacel {
    border: 1px solid #dcdcdc;
    background-color: #fff;
  }
  &.sure {
    background-color: #1890FF;
    border: 1px solid #1890FF;
    color: #fff;
  }
}
input:focus {
  border: 1px solid #1890FF;
  outline-color: #1890FF;
}
.text-code {
  .CodeMirror {
    width: 400px;
    height: 180px;
  }
}
</style>
