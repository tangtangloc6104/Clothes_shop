<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      @input="searchProducts"
      placeholder="Tìm kiếm sản phẩm..."
      class="search-input"
    />
    <div v-if="searchResults.length" class="search-results">
      <div
        v-for="product in searchResults"
        :key="product.id"
        class="search-result-item"
        @click="goToProductDetail(product.id)"
        v-bind:class="{'fade-in': searchResults.length > 0}"
      >
        <img :src="'http://localhost:3000' + product.image" :alt="product.name" class="search-item-image" />
        <div>
          <h2>{{ product.name }}</h2>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Không tìm thấy sản phẩm nào phù hợp với từ khóa "{{ searchQuery }}".</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "AppSearch",
  data() {
    return {
      searchQuery: "",
      searchResults: []
    };
  },
  computed: {
    ...mapState(['items'])
  },
  methods: {
    searchProducts() {
      const query = this.searchQuery.toLowerCase();
      this.searchResults = this.items.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    },
    goToProductDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    }
  }
};
</script>

<style scoped>
.search-container {
  padding: 20px;
  text-align: center;
  position: relative;
}

.search-input {
  width: 80%;
  padding: 15px;
  border: 2px solid #007bff;
  border-radius: 25px;
  margin-bottom: 20px;
  transition: transform 0.3s ease;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.search-input:focus {
  outline: none;
  transform: scale(1.05);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.search-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.search-result-item {
  display: flex;
  align-items: center;
  width: 80%;
  padding: 15px;
  margin: 5px 0;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.3s;
}

.search-result-item:hover {
  background-color: #f0f8ff;
  transform: translateX(5px);
}

.search-result-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
  transition: transform 0.3s ease;
}

.search-result-item img:hover {
  transform: scale(1.1);
}

.search-result-item h2 {
  font-size: 18px;
  margin: 0;
  font-weight: bold;
  color: #333;
}

.search-result-item p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #666;
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
