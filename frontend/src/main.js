import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '../../backend/store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>


const app = createApp(App);

app.use(store);
app.use(router);

// Lấy sản phẩm từ backend trước khi mount app
store.dispatch('fetchItems').then(() => {
  app.mount('#app');
});

// Initialize login status from local storage
store.dispatch('initializeLoginStatus');
