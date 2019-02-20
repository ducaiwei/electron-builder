<template>
  <div class="edit-box fadeIn" ref="updates">
    <div class="mask" @click="hide" ref="mask"></div>
    <div class="edit-wrap">
      <div class="edit-title">修改</div>
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
          <div class="form-item">
            <label for="content">内容</label>
            <code-mirror name="content" class="text-code"
            v-model="conText"
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
  props: {
    content: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        mode: this.content.type,
        theme: 'blackboard'
      },
      conText: this.content.content,
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
      type: this.content.type,
      title: this.content.title
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   this.$refs.updates.addEventListener('keydown', (e) => {
    //     let theEvent = e || window.event
    //     let code = theEvent.keyCode || theEvent.which || theEvent.charCode
    //     if (code === 13) {
    //       this.saveContent()
    //     }
    //   })
    // })
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
      this.conText = value
    },
    saveContent () {
      if (!this.title) {
        this.$refs.titleInput.focus()
        return
      }
      if (this.content && this.title) {
        let obj = {
          id: this.content.id,
          title: this.title,
          content: this.conText,
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
