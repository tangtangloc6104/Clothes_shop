import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/AppHome.vue';
import ProductList from '@/components/AppProduct.vue';
import ProductDetail from '@/components/AppProductDetail.vue';
import AppCart from '@/components/AppCart.vue';
import AppLogin from '@/components/AppLogin.vue';
import AppRegister from '@/components/AppRegister.vue';
import AppSearch from '@/components/AppSearch.vue';
import AppShirts from '@/components/AppShirts.vue';
import AppShoes from '@/components/AppShoes.vue';
import AppSets from '@/components/AppSets.vue';
import AppProductManagement from '@/components/AppProductManagement.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/lienhe',
    name: 'Contact',
    component: () => import('@/components/AppContact.vue')
  },
  {
    path: '/tintuc',
    name: 'News',
    component: () => import('@/components/AppNews.vue')
  },
  {
    path: '/product',
    name: 'ProductList',
    component: ProductList,
  },
  {
    path: '/product/:id', 
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  { path: '/cart', 
    name: 'Cart', 
    component: AppCart,
  },
  {
    path: '/login',
    name: 'Login',
    component: AppLogin
  },
  { path: '/search', 
    name: 'AppSearch',
    component: AppSearch 
  },
  { path: '/register',
    name: 'AppRegister', 
    component: AppRegister 
  },
  { path: '/ao',
    name: 'Shirts',
    component: AppShirts 
  },
  { path: '/giay',
    name: 'Shoes',
    component: AppShoes 
  },
  { path: '/bo',
    name: 'Sets',
    component: AppSets 
  },
  {
    path: '/product-management',
    name: 'ProductManagement',
    component: AppProductManagement
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
