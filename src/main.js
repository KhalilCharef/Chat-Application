import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// Required for side-effects
require("firebase/firestore");
var firebaseConfig = {
  apiKey: "AIzaSyBmaG3ayBLlXeMFI1uRJTSchjR2pOz5cUA",
  authDomain: "chat-application-49859.firebaseapp.com",
  projectId: "chat-application-49859",
  storageBucket: "chat-application-49859.appspot.com",
  messagingSenderId: "407495822754",
  appId: "1:407495822754:web:deeec8686653fb66e1b6fb",
  measurementId: "G-RML4SL8703"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();
// Generalise access to db
window.db = db;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
