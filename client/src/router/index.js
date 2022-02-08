import Vue from 'vue';
import Router from 'vue-router';
import Repos from '../components/Repos.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Repos',
      component: Repos,
    },
  ],
});
