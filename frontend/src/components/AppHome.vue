<template>
  <div>
    
    <!-- Banner Section -->
    <div class="banner">
      <div class="banner-content">
        <h1>Thời Trang Nam Cao Cấp – Lịch Lãm & Phong Cách</h1>
        <p>Khám phá bộ sưu tập mới nhất từ Raphael với quần áo, đồng hồ và giày dép sang trọng, thiết kế dành riêng cho quý ông hiện đại.</p>
        <router-link to="/ao" class="shop-now-btn">Mua Sắm Ngay</router-link>
      </div>
    </div>
    <ProductList/>
  </div>
</template>

<script>
import ProductList from './AppProduct.vue';

export default {
  name: 'AppHome',
  components: {
    ProductList,
  },
};
</script>
<style>
.banner {
  background-color: #1a73e8;  /* Blue background */
  color: white;
  text-align: center;
  padding: 80px 0; /* Adjusted padding for better visibility */
}

.banner h1 {
  font-size: 3em;
  margin-bottom: 15px;
}

.banner p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.shop-now-btn {
  padding: 12px 25px;
  background-color: #ff9800;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-size: 1.2em;
  display: inline-block;
  margin-top: 20px; /* Tăng khoảng cách với dòng chữ phía trên */
}


.shop-now-btn:hover {
  background-color: #f57c00;
}

</style>
