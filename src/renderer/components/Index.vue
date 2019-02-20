<template>
  <div id="wrapper">
    <div class="left-title" ref="titleBox">
      <list :contents="contents" :selectContent="selectContent"
      @select="selectItem"
      @update="showUpdateContent"
      @copy="copyContent"
      @deleteContent="delContenConfirm"></list>
      <div class="tool-box" ref="toolBox">
        <i class="iconfont icon-search search" @click="showSearchBox"></i>
        <i class="iconfont icon-plus plus" @click="showAddFn"></i>
      </div>
    </div>
    <div class="right-content" ref="rightContent">
      <div class="drag-line" ref="dragLine"></div>
      <code-mirror name="content" class="content-code"
            v-model="selectContent.content"
            :options="cmOption" v-if="selectContent" ref="codeMirror"></code-mirror>
      <search v-if="showSearch" @hide="hideSearchBox" @search="searchContent"></search>
    </div>
    <add-new v-if="showAdd" @hide="hideAdd" @save="saveContent"></add-new>
    <update v-if="showUpdate" @hide="hideUpdate" @save="updateContent"
    :content="selectContent"></update>
    <!-- <message :message="copyedText" v-model="showMessage" @reset="changeMessage"></message> -->
  </div>
</template>

<script>
  import AddNew from './Edit/AddNew'
  import Update from './Edit/Update'
  import Search from './Edit/Search'
  import { ipcRenderer, clipboard, remote } from 'electron'
  import DB from '../../main/db'
  import CodeMirror from './CodeMirror/CodeMirror'
  import List from './List/List'
  export default {
    name: 'landing-page',
    data () {
      return {
        showAdd: false,
        contents: [],
        db: new DB(),
        selectContent: null,
        cmOption: {
          tabSize: 4,
          styleActiveLine: false,
          lineNumbers: false,
          mode: '',
          theme: 'light',
          readOnly: true,
          cursorBlinkRate: -1
        },
        showUpdate: false,
        showSearch: false,
        showMessage: false,
        copyedText: '已复制',
        menu: null
      }
    },
    created () {
      this.getData()
    },
    mounted () {
      ipcRenderer.on('add', (event, arg) => {
        this.showAddFn()
      })
      ipcRenderer.on('del', (event, arg) => {
        this.delContent(arg)
      })
      ipcRenderer.on('search', (event, arg) => {
        this.showSearchBox(arg)
      })
      ipcRenderer.on('getSelectContent', (event, arg) => {
        this.copyContent()
      })
      this.$nextTick(() => {
        this.menu = new remote.Menu()
        this.appendItem()
        this.addEvent()
        this.initDrag()
      })
    },
    watch: {
      selectContent (nv, ov) {
        if (nv) {
          this.cmOption.mode = nv.type
        }
      }
    },
    methods: {
      appendItem () { // create menu
        const MenuItem = remote.MenuItem
        this.menu.append(new MenuItem({
          label: '复制',
          click: () => {
            remote.getCurrentWindow().webContents.send('getSelectContent')
          }
        }))
      },
      addEvent () {
        this.$refs.rightContent.addEventListener('contextmenu', (e) => {
          e.preventDefault()
          this.menu.popup(remote.getCurrentWindow())
        }, false)
      },
      initDrag () { // 左右拖动
        const dragLine = this.$refs.dragLine
        const titleBox = this.$refs.titleBox
        const conBox = this.$refs.rightContent
        let b = ''
        const toolBox = this.$refs.toolBox
        dragLine.onmousedown = (ev) => {
          let iEvent = ev || event
          let dx = iEvent.clientX
          let dw = titleBox.offsetWidth
          let disRight = titleBox.offsetRight + dw
          if (dx < dx + 10) {
            b = 'right'
          }
          document.onmousemove = (e) => {
            let moveEvent = e || event
            if (b === 'right') {
              setTimeout(() => {
                if ((dw + (moveEvent.clientX - dx)) <= 200) {
                  titleBox.style.width = '200px'
                  conBox.style.marginLeft = '200px'
                  toolBox.style.width = '180px'
                } else {
                  titleBox.style.width = dw + (moveEvent.clientX - dx) + 'px'
                  conBox.style.marginLeft = dw + (moveEvent.clientX - dx) + 'px'
                  toolBox.style.width = dw + (moveEvent.clientX - dx) - 20 + 'px'
                }
                if (titleBox.offsetWidth >= 400) {
                  titleBox.style.width = '400px'
                  titleBox.style.left = disRight - titleBox.offsetWidth + 'px'
                  conBox.style.marginLeft = '400px'
                  toolBox.style.width = '380px'
                }
              }, 50)
            }
          }
          document.onmouseup = () => {
            document.onmousedown = null
            document.onmousemove = null
          }
          return false
        }
      },
      showAddFn () {
        this.showAdd = true
      },
      copyContent (c) {
        let con = c || this.$refs.codeMirror.getSelectContent()
        clipboard.writeText(con)
        this.showMessage = true
      },
      changeMessage () {
        this.showMessage = false
      },
      async getData () {
        let res = await this.db.getAll()
        if (res && res.length > 0) {
          this.contents = res
          if (!this.selectContent) {
            this.selectContent = this.contents[0]
          }
        } else {
          this.contents = []
          this.selectContent = null
        }
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      hideAdd () {
        this.showAdd = false
      },
      async saveContent (obj) {
        let res = await this.db.insertTable(obj)
        if (res) {
          this.showAdd = false
          this.getData()
        }
      },
      selectItem (c) {
        this.selectContent = c
      },
      delContenConfirm (c) { // delete confirm
        this.selectItem(c)
        ipcRenderer.send('delConfirm') // send msg to ipcMain
      },
      async delContent (arg) {
        if (arg === 0) { // delete
          let res = await this.db.deleteContent(this.selectContent)
          if (res) {
            this.selectContent = null
            this.getData()
          }
        }
      },
      showUpdateContent (c) {
        this.selectItem(c)
        this.showUpdate = true
      },
      hideUpdate () {
        this.showUpdate = false
      },
      async updateContent (obj) {
        let result = await this.db.updateContent(obj)
        if (result) {
          this.selectContent = obj
          this.hideUpdate()
          this.getData()
        }
      },
      showSearchBox () {
        this.showSearch = !this.showSearch
      },
      hideSearchBox () {
        this.showSearch = false
        this.getData()
      },
      async searchContent (val) {
        let result = await this.db.searchContent(val)
        this.contents = result
      }
    },
    components: {
      AddNew,
      CodeMirror,
      Update,
      Search,
      List
    }
  }
</script>

<style lang="scss">
  ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: #f0f2f5;
  }

  ::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background-color: #b5babf;
  }
  ::-webkit-scrollbar-track {
      border-radius: 8px;
      background-color: #f0f2f5;
  }
  #wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }
  .left-title {
    position: relative;
    width: 26%;
    height: 100%;
    float: left;
    background: #373d47;
    overflow-x: hidden;
    box-sizing: border-box;
  }
  .right-content {
    position: relative;
    height: 100%;
    margin-left: 26%;
    box-sizing: border-box;
    .content-code {
      height: 100%;
      .CodeMirror {
        height: 100%;
      }
    }
  }
  .drag-line {
    position: absolute;
    right: left;
    top: 0;
    height: 100%;
    width: 5px;
    background: #fff;
    z-index: 9;
    cursor: w-resize;
  }
  .tool-box {
    position: fixed;;
    height: 40px;
    width: 24%;
    background: #373d47;
    bottom: 0;
    left: 0;
    z-index: 99;
  }
  .plus, .search {
    display: block;
    position: absolute;
    bottom: 10px;
    color: #979da7;
    cursor: pointer;
  }
  .search {
    right: 10px;
  }
  .plus {
    left: 10px;
  }
</style>
