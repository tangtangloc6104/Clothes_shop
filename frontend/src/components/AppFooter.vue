<template>
  <div id="app">

    <!-- Footer -->
    <footer>
      <AppBanner v-if="$route.path === '/'" />
      <div class="footer-container">
        <div class="footer-column">
          <h3>Đây là trang web bán quần áo</h3>
          <p>Mọi chi tiết xin đừng liên hệ!!!</p>
        </div>
        <div class="footer-column">
          <h3>Danh sách</h3>
          <ul>
            <li><router-link to="/ao">Áo</router-link></li>
            <li><router-link to="/giay">Giày</router-link></li>
            <li><router-link to="/bo">Bộ</router-link></li>
            <li><router-link to="/lienhe">Liên hệ</router-link></li>
            <li><router-link to="/tintuc">Tin tức</router-link></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Tăng Gia Lộc</h3>
          <p>MSSV: 22150212</p>
          <p>Lớp: 221404</p>
        </div>
        <div class="footer-column">
          <h3>Trần Đăng Khánh</h3>
          <p>MSSV: 22150242</p>
          <p>Lớp: 221404</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import AppBanner from './AppBanner.vue';

export default {
  components: {
    AppBanner
  }
};
</script>


<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

footer {
  background-color: #333;
  color: white;
  padding: 20px;
  margin-top: auto; /* Đảm bảo footer luôn ở cuối trang */
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column {
  flex: 1;
  padding: 10px;
  min-width: 200px;
  box-sizing: border-box;
}

.footer-column h3 {
  margin-top: 0;
}

.footer-column a {
  color: white;
  text-decoration: none;
}

.footer-column a:hover {
  text-decoration: underline;
}


</style>
