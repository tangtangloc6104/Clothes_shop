<template>
  <div>
    <h1 class="title">Áo</h1>
    <div class="product-list">
      <div 
        v-for="product in filteredProducts" 
        :key="product.id" 
        class="product-item"
        @click="goToProductDetail(product.id)">
        <h2>{{ product.name }}</h2>
        <img :src="'http://localhost:3000' + product.image" alt="Product Image" />
        <p>{{ product.description }}</p>
        <p>{{ product.price.toLocaleString() }} VNĐ</p>
        <p v-if="isOutOfStock(product)">Hết hàng</p>
        <p v-else> Còn {{ getTotalStock(product) }} sản phẩm</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppShirts',
  computed: {
    ...mapState(['items']),
    filteredProducts() {
      return this.items.filter(product => product.name.toLowerCase().includes('áo'));
    }
  },
  methods: {
    goToProductDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    },
    isOutOfStock(product) {
      return product.sizes.every(size => size.quantity === 0);
    },
    getTotalStock(product) {
      return product.sizes.reduce((total, size) => total + size.quantity, 0);
    }
  }
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 20px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.product-item {
  width: calc(100% / 5 - 32px);
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 16px;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
}
.product-item img {
  width: 100%;
  height: auto;
  border-bottom: 1px solid #ccc;
  margin-bottom: 8px;
}
.product-item:hover {
  transform: scale(1.05);
}
</style>