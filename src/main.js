// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import App from './App'
import router from './router'
import store from './store/store'
import firebase from 'firebase'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vuetify,
  store,
  created () {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: 'AIzaSyDtHltT6LmKMEbiqg8dhKjiVmaf9nPqRcg',
      authDomain: 'sneakershop-542c6.firebaseapp.com',
      databaseURL: 'https://sneakershop-542c6.firebaseio.com',
      projectId: 'sneakershop-542c6',
      storageBucket: 'sneakershop-542c6.appspot.com',
      messagingSenderId: '757963672417',
      appId: '1:757963672417:web:e1de75f73e2ab36a5e1320',
      measurementId: 'G-0YS60LQ0BJ',
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
  },
  components: { App },
  template: '<App/>'
})
