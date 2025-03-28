<template>
  <div class="container my-4">
    <div class="row product-list">
      <div 
        v-for="product in paginatedProducts" 
        :key="product.id" 
        class="col-md-6 col-lg-4 mb-4 product-item"
        @click="goToProductDetail(product.id)"
      >
        <div class="card h-100 shadow-sm">
          <img :src="'http://localhost:3000' + product.image" :alt="product.name" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text text-primary">{{ product.price.toLocaleString() }} VNĐ</p>
            <p v-if="isOutOfStock(product)" class="text-danger">Hết hàng</p>
            <p v-else class="text-success">Còn {{ getTotalStock(product) }} sản phẩm</p>
            <button class="btn btn-primary mt-auto" @click.stop="goToProductDetail(product.id)">Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination-container">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="prevPage" :disabled="currentPage === 1">Trước</button>
        </li>
        <li 
          class="page-item" 
          v-for="page in totalPages" 
          :key="page" 
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="goToPage(page)">{{ page }}</button>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Tiếp</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppProduct',
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 8, // Giảm số lượng sản phẩm mỗi trang để sản phẩm to hơn
    };
  },
  computed: {
    ...mapState(['items']),
    paginatedProducts() {
      if (!Array.isArray(this.items) || this.items.length === 0) return [];
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
    totalPages() {
      return this.items.length > 0 ? Math.ceil(this.items.length / this.itemsPerPage) : 1;
    }
  },
  methods: {
    goToProductDetail(productId) {
      this.$router.push({ name: 'ProductDetail', params: { id: productId } });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage -= 1;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage += 1;
      }
    },
    goToPage(page) {
      this.currentPage = page;
    },
    isOutOfStock(product) {
      return product.sizes && product.sizes.every(size => size.quantity === 0);
    },
    getTotalStock(product) {
      return product.sizes ? product.sizes.reduce((total, size) => total + size.quantity, 0) : 0;
    }
  }
};
</script>

<style scoped>
/* Layout sản phẩm */
.product-list {
  display: flex;
  flex-wrap: wrap;
  gap: 24px; /* Tăng khoảng cách giữa các sản phẩm */
  justify-content: center;
}

/* Điều chỉnh sản phẩm hiển thị */
.product-item {
  cursor: pointer;
  flex: 1 1 calc(33.33% - 24px); /* Chia 3 cột trên desktop */
  max-width: calc(33.33% - 24px);
  transition: transform 0.3s ease-in-out;
}

/* Điều chỉnh số cột trên các thiết bị khác nhau */
@media (max-width: 1200px) {
  .product-item {
    flex: 1 1 calc(50% - 24px); /* Chia 2 cột trên màn hình nhỏ hơn */
    max-width: calc(50% - 24px);
  }
}

@media (max-width: 768px) {
  .product-item {
    flex: 1 1 100%; /* Hiển thị 1 cột trên thiết bị di động */
    max-width: 100%;
  }
}

/* Cập nhật phần hình ảnh để không bị cắt */
.card-img-top {
  width: 100%;
  height: auto; /* Tự động điều chỉnh chiều cao */
  max-height: 350px; /* Giới hạn chiều cao tối đa */
  object-fit: contain; /* Hiển thị đầy đủ hình mà không bị cắt */
  padding: 10px; /* Tạo khoảng cách giữa ảnh và viền */
  background: #f8f8f8; /* Màu nền giúp ảnh trông rõ ràng hơn */
  border-bottom: 1px solid #ccc;
  margin-bottom: 8px;
}

/* Căn chỉnh nội dung sản phẩm */
.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  padding: 16px;
}

/* Tăng kích thước tiêu đề sản phẩm */
.card-title {
  font-size: 1.2em;
  font-weight: bold;
}

/* Căn chỉnh giá và trạng thái sản phẩm */
.card-text.text-primary {
  font-size: 1.1em;
  font-weight: bold;
  color: #007bff;
}

.text-success, .text-danger {
  font-size: 1em;
  font-weight: bold;
}

/* Hiệu ứng hover trên sản phẩm */
.product-item:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

/* Pagination */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination {
  display: flex;
  list-style: none;
  padding: 0;
}

.page-item {
  margin: 0 5px;
}

.page-link {
  padding: 12px 18px; /* Tăng kích thước nút */
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.page-link:hover {
  background-color: #007bff;
  color: white;
}

.page-item.active .page-link {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
  opacity: 0.5;
}

</style>
