import Vue from 'vue'
import axios from 'axios'
// import VueCodemirror from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'
import App from './App'
import router from './router'
import './assets/css/iconfont'
import './assets/css/animate'
// import DB from './store/datastore.js'
// DB.judgeFolder().then(() => {
// Vue.use(new DB())
// Vue.prototype.$db = new DB()
// Vue.prototype.$db.createTable()
// console.log('$db', Vue.prototype.$db)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  components: { App },
  router,
  // store,
  template: '<App/>'
}).$mount('#app')
// })
