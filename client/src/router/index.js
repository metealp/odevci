import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signin from '../views/Signin.vue';
import Signup from '../views/Signup.vue';
import UserProfile from '../views/UserProfile.vue';
import HomeworkList from '../views/HomeworkList.vue';
import HomeworkDetail from '../views/HomeworkDetail.vue';
import NewHomework from '../views/NewHomework.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/userprofile/:id',
    name: 'UserProfile',
    component: UserProfile,
    // beforeEnter: authGuard,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: HomeworkList,
  },
  {
    path: '/posts/new',
    name: 'NewHomework',
    component: NewHomework,
  },
  {
    path: '/posts/:postid',
    name: 'PostDetail',
    component: HomeworkDetail,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
