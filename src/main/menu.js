import {app} from 'electron'
const menus = [{
  label: '文件',
  submenu: [{
    label: '新建',
    accelerator: 'CommandOrControl+N',
    click: (menuItem, browserWindow) => {
      browserWindow.webContents.send('add', true)
    }
  }]
}, {
  label: '编辑',
  submenu: [{
    label: '搜索',
    accelerator: 'CommandOrControl+S',
    click: (menuItem, browserWindow) => {
      browserWindow.webContents.send('search', true)
    }
  }]
}, {
  label: '应用',
  submenu: [{
    label: '关于',
    selector: 'orderAboutApplication:'
  }, {
    type: 'separator'
  }, {
    label: '退出',
    accelerator: 'Command+Q',
    click: () => {
      app.quit()
    }
  }]
}]
export default menus
