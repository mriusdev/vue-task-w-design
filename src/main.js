import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'

import Countries from './components/Countries.vue'
import SingleCountry from './components/SingleCountry'
import CountryEdit from './components/CountryEdit'
import CityEdit from './components/CityEdit'

Vue.prototype.$http = axios;

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Countries
    },

    {
      path: '/countries/:id/edit',
      home: 'countries-edit',
      component: CountryEdit
    },

    {
      path: '/countries/:id/cities/:idCity/edit',
      home: 'cities-edit',
      component: CityEdit
    },

    {
      path: '/countries/:id/cities',
      home: 'cities',
      component: SingleCountry
    },




  ]
})


new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
