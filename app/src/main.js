import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
import store from "./store";
import VueSocketIO from 'vue-socket.io';
import VueDraggable from 'vue-draggable';

Vue.use(VueDraggable);

Vue.config.productionTip = false;

let connectionOptions = {
  "force new connection": true,
  "reconnectionAttempts": "Infinity",
  "timeout": 10000,
  "transports": ["websocket"]
};

Vue.use(new VueSocketIO({
  debug: true,
  connection: `http://${window.location.hostname}:3001/`,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: connectionOptions
}));


new Vue({
  router,
  store,
  components: { App },
  render: h => h(App)
}).$mount("#app");
