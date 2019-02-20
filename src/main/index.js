'use strict'

import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import DB from './db'
import menu from './menu'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

// 关掉没用的警告
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1200
  })
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
}
app.db = new DB(app)
setTimeout(() => {
  app.db.createTable()
}, 2000)
ipcMain.on('delConfirm', (event, arg) => {
  dialog.showMessageBox({
    type: 'question',
    buttons: ['Yes', 'No'],
    title: 'notes',
    message: '确定删除此条记录？',
    cancelId: 1,
    defaultId: 0
  }, (response) => {
    mainWindow.webContents.send('del', response)
  })
})
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
