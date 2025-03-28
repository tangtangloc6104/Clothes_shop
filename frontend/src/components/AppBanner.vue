<template>
  <div class="banner-container" ref="bannerContainer">
    <div class="banner" ref="banner" @mouseover="pauseScroll" @mouseleave="resumeScroll">
      <div 
        class="banner-item" 
        v-for="(product, index) in loopedProducts" 
        :key="index" 
        @click="goToProductDetail(product.id)"
      >
        <img :src="'http://localhost:3000' + product.image" alt="Product Image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price.toLocaleString() }} VNĐ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppBanner',
  data() {
    return {
      scrollInterval: null
    };
  },
  computed: {
    ...mapGetters(['latestProducts']),
    loopedProducts() {
      // Lặp lại sản phẩm để tạo hiệu ứng cuộn vô hạn
      return this.latestProducts.length > 5
        ? [...this.latestProducts, ...this.latestProducts]
        : [...this.latestProducts];
    }
  },
  mounted() {
    this.startAutoScroll();
  },
  beforeUnmount() {
    clearInterval(this.scrollInterval);
  },
  methods: {
    startAutoScroll() {
      const banner = this.$refs.banner;
      if (!banner) return;

      this.scrollInterval = setInterval(() => {
        if (banner.scrollLeft >= banner.scrollWidth / 2) {
          banner.scrollLeft = 0; // Reset về đầu khi hết vòng lặp
        } else {
          banner.scrollLeft += 1; // Cuộn từng chút một để tạo hiệu ứng mượt
        }
      }, 20); // Tốc độ cuộn
    },
    pauseScroll() {
      clearInterval(this.scrollInterval);
    },
    resumeScroll() {
      this.startAutoScroll();
    },
    goToProductDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    }
  }
};
</script>

<style scoped>
.banner-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  background-color: #2f0fb1;
  padding: 10px 0;
  display: flex;
  justify-content: center;
}

.banner {
  display: flex;
  gap: 20px;
  white-space: nowrap;
  scroll-behavior: smooth;
  overflow-x: hidden;
}

.banner-item {
  flex: 0 0 auto;
  width: 200px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
}

.banner-item:hover {
  transform: scale(1.05);
}

.banner-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-info {
  margin-top: 10px;
  color: white;
}

.product-info h3 {
  font-size: 1em;
}

.product-info p {
  font-size: 0.9em;
}
</style>
