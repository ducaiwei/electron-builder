import db from 'electron-db'
function delay () {
  return new Promise(resolve => setTimeout(resolve, 100))
}
class DB {
  constructor () {
    const fs = require('fs')
    fs.stat('data', (err, stats) => {
      if (err || !stats) {
        fs.mkdir('data')
      }
    })
  }
  createTable () {
    db.createTable('contents', (success, msg) => {
      if (success) {
        console.log('create success')
      } else {
        console.log('create failed')
      }
      console.log('msg:', msg)
    })
  }
  insertTable (obj) {
    return new Promise((resolve, reject) => {
      db.insertTableContent('contents', obj, (success, msg) => {
        resolve(success)
      })
    })
  }
  async getAll () {
    await delay()
    return new Promise((resolve, reject) => {
      db.getAll('contents', (succ, data) => {
        if (succ) {
          resolve(data)
        }
        reject(data)
      })
    })
  }
  deleteContent (c) {
    return new Promise((resolve, reject) => {
      db.deleteRow('contents', {'id': c.id}, (succ, msg) => {
        resolve(succ)
      })
    })
  }
  updateContent (c) {
    let where = {
      id: c.id
    }
    return new Promise((resolve, reject) => {
      db.updateRow('contents', where, c, (succ, msg) => {
        resolve(succ)
      })
    })
  }
  async searchContent (c) {
    await delay()
    return new Promise((resolve, reject) => {
      db.search('contents', 'title', c, (succ, data) => {
        if (succ) {
          resolve(data)
        }
        resolve(null)
      })
    })
  }
}
export default DB
