<template>
  <div>
    <h1 class="page-title">Quản lý sản phẩm</h1>
    
    <!-- Bảng danh sách sản phẩm -->
    <div class="product-table">
      <table class="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Hình ảnh</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in paginatedProducts" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td><img :src="'http://localhost:3000' + product.image" alt="Product Image" class="product-image" /></td>
            <td>
              <button @click="editProduct(product.id)" class="btn btn-warning">Sửa</button>
              <button @click="deleteProduct(product.id)" class="btn btn-danger">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Phân trang -->
      <div class="pagination">
        <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1" class="btn btn-secondary">Trước</button>
        <span>Trang {{ currentPage }} / {{ totalPages }}</span>
        <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages" class="btn btn-secondary">Sau</button>
      </div>
    </div>

    <!-- Nút Thêm sản phẩm -->
    <div class="add-product-btn-container">
      <button @click="showAddProductForm = true" class="btn btn-success add-product-btn">Thêm sản phẩm</button>
    </div>

    <!-- Popup Form thêm sản phẩm -->
    <div v-if="showAddProductForm" class="overlay" @click="cancelAddProduct">
      <div class="add-product-form" @click.stop>
        <h2>{{ newProduct.id ? 'Sửa sản phẩm' : 'Thêm sản phẩm' }}</h2>
        <form @submit.prevent="addProduct">
          <div class="form-group">
            <label for="name">Tên sản phẩm:</label>
            <input type="text" v-model="newProduct.name" required />
          </div>
          <div class="form-group">
            <label for="price">Giá:</label>
            <input type="number" v-model="newProduct.price" required />
          </div>
          <div class="form-group">
            <label for="description">Mô tả:</label>
            <textarea v-model="newProduct.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="image">Hình ảnh:</label>
            <input type="file" ref="image" @change="handleImageUpload" />
          </div>
          <div class="form-group">
            <label for="sizes">Kích cỡ và số lượng:</label>
            <div v-for="(size, index) in newProduct.sizes" :key="index" class="size-inputs">
              <input type="text" v-model="size.size" required placeholder="Ví dụ: M, L, XL" />
              <input type="number" v-model="size.quantity" required />
            </div>
          </div>

          <div class="form-buttons">
            <button type="submit" class="btn btn-primary">{{ newProduct.id ? 'Sửa' : 'Thêm' }}</button>
            <button @click="cancelAddProduct" class="btn btn-secondary">Hủy</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      showAddProductForm: false,
      newProduct: {
        name: '',
        price: '',
        description: '',
        image: '',
        sizes: [
          { size: '', quantity: 0 },
          { size: '', quantity: 0 },
          { size: '', quantity: 0 }
        ]
      },
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1
    };
  },
  mounted() {
    this.fetchProducts();
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.products.slice(start, end);
    }
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:3000/api/items')
        .then(response => {
          this.products = response.data;
          this.totalPages = Math.ceil(this.products.length / this.itemsPerPage); // Tính tổng số trang
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    },
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newProduct.image = file; // Chuyển đổi ảnh thành đường dẫn tạm thời
      }
    },
    addProduct() {
      const formData = new FormData();
      formData.append('name', this.newProduct.name);
      formData.append('price', this.newProduct.price);
      formData.append('description', this.newProduct.description);
      formData.append('sizes', JSON.stringify(this.newProduct.sizes));

      // Nếu có ảnh mới, thêm ảnh vào formData
      if (this.$refs.image.files[0]) {
        formData.append('image', this.$refs.image.files[0]);
      } else if (this.newProduct.image) {
        formData.append('image', this.newProduct.image);  // Giữ lại ảnh cũ nếu không có ảnh mới
      }

      // Nếu có id (tức là đang sửa sản phẩm), giữ nguyên id
      if (this.newProduct.id) {
        formData.append('id', this.newProduct.id); // Đảm bảo rằng id không bị thay đổi
        axios.put(`http://localhost:3000/api/items/${this.newProduct.id}`, formData)
          .then(() => {
            this.fetchProducts();
            this.showAddProductForm = false;
            alert('Sửa sản phẩm thành công!');
            this.resetNewProduct();
          })
          .catch(error => {
            console.error('Lỗi khi sửa sản phẩm:', error);
          });
      } else {
        // Thêm sản phẩm mới
        axios.post('http://localhost:3000/api/items', formData)
          .then(() => {
            this.fetchProducts();
            this.showAddProductForm = false;
            alert('Thêm sản phẩm thành công!');
            this.resetNewProduct();
          })
          .catch(error => {
            console.error('Lỗi khi thêm sản phẩm:', error);
          });
      }
    },
    cancelAddProduct() {
      this.showAddProductForm = false;
      this.resetNewProduct();  // Reset form khi hủy
    },
    resetNewProduct() {
      this.newProduct = {
        name: '',
        price: '',
        description: '',
        image: '',
        sizes: [
          { size: '', quantity: 0 },
          { size: '', quantity: 0 },
          { size: '', quantity: 0 }
        ]
      };
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    editProduct(id) {
      axios.get(`http://localhost:3000/api/items/${id}`)
        .then(response => {
          // Gán dữ liệu vào form
          this.newProduct = response.data;
          this.showAddProductForm = true; // Hiển thị form sửa sản phẩm
        })
        .catch(error => {
          console.error('Lỗi khi lấy dữ liệu sản phẩm:', error);
          alert('Không thể lấy dữ liệu sản phẩm để sửa');
        });
    },
    deleteProduct(id) {
      axios.delete(`http://localhost:3000/api/items/${id}`)
        .then(() => {
          alert("Xóa sản phẩm thành công!");
          this.fetchProducts();  // Đảm bảo làm mới danh sách sản phẩm sau khi xóa
        })
        .catch((error) => {
          console.error('Lỗi khi xóa sản phẩm:', error);
          alert('Lỗi khi xóa sản phẩm');
        });
    }
  }
};
</script>

<style scoped>
/* Tổng thể */
.page-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

.product-table {
  margin-bottom: 30px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.table th, .table td {
  padding: 12px;
  text-align: center;
}

.table th {
  background-color: #f1f1f1;
  font-weight: bold;
}

.table td {
  background-color: white;
  border: 1px solid #ddd;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.pagination button {
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination button:hover {
  background-color: #0056b3;
}

.add-product-btn-container {
  text-align: center;
  margin: 20px 0;
}

.add-product-btn {
  font-size: 16px;
  padding: 12px 30px;
  border-radius: 5px;
  background-color: #28a745;
  color: white;
  border: none;
  transition: background-color 0.3s;
}

.add-product-btn:hover {
  background-color: #218838;
}

/* Popup overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Đen mờ */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  animation: fadeIn 0.5s ease;
}

/* Form thêm sản phẩm */
.add-product-form {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;  /* Đảm bảo chiều rộng tối đa cho form */
  height: auto;  /* Đảm bảo chiều cao tự động điều chỉnh */
  max-height: 80vh;  /* Giới hạn chiều cao để không vượt quá màn hình */
  animation: slideUp 0.3s ease-out;
  overflow-y: auto;  /* Cho phép cuộn dọc nếu form quá dài */
}


/* Hiệu ứng di chuyển lên */
@keyframes slideUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

/* Hiệu ứng làm mờ */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* Các ô nhập liệu trong form */
.add-product-form input, .add-product-form textarea {
  width: 100%;  /* Đảm bảo các input chiếm toàn bộ chiều rộng của form */
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s ease;
}

.add-product-form input:focus, .add-product-form textarea:focus {
  border-color: #007bff;
  outline: none;
}

/* Các nút trong form */
.add-product-form button {
  padding: 10px 20px;
  margin: 10px 5px;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.3s ease;
}

.add-product-form button:hover {
  transform: scale(1.05);
}

.add-product-form button.btn-primary {
  background-color: #007bff;
  border: none;
}

.add-product-form button.btn-primary:hover {
  background-color: #0056b3;
}

.add-product-form button.btn-secondary {
  background-color: red;
  border: none;
}

.add-product-form button.btn-secondary:hover {
  background-color: #aaa;
}
</style>
