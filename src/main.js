import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import Gantt from './components/Gantt.vue';

import Router from 'vue-router';
Vue.use(ElementUI)
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: Gantt
    }
  ]
});

import './styles/quasar.styl';
import iconSet from 'quasar/icon-set/mdi-v3.js';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/mdi-v3/mdi-v3.css';
import {
  Quasar,
  QLayout,
  QHeader,
  QDrawer,
  QPageContainer,
  QPage,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QItem,
  QItemSection,
  QItemLabel
} from 'quasar';

Vue.use(Quasar, {
  config: {},
  components: {
    QLayout,
    QHeader,
    QDrawer,
    QPageContainer,
    QPage,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QItem,
    QItemSection,
    QItemLabel
  },
  directives: {},
  plugins: {},
  iconSet: iconSet
});

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
