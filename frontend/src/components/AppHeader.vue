<template>
  <div>
    <!-- Vùng hiển thị Voucher cuộn ngang -->
    <div class="top-line">
      <div class="voucher">
        <span class="text">VOUCHER 10% TỐI ĐA 10K</span>
        <span class="text">VOUCHER 50K DÀNH CHO ĐƠN TỪ 699K</span>
        <span class="text">VOUCHER 100K DÀNH CHO ĐƠN TỪ 999K</span>
        <span class="text">FREESHIP CHO ĐƠN TỪ 399K</span>
      </div>
    </div>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand logo-shine" @click="goToHome">
          <h1 class="logo">Raphael</h1>
        </a>

        <!-- Nút toggle menu trên mobile -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Menu điều hướng -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mx-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Trang chủ</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/ao">Áo</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/giay">Giày</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/bo">Bộ</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/lienhe">Liên hệ</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/tintuc">Tin tức</router-link>
            </li>
          </ul>
        </div>

        <!-- Các icon chức năng (Tìm kiếm, Đăng nhập, Giỏ hàng) -->
        <div class="d-flex align-items-center">
          <!--Tìm kiếm -->
          <form class="form-inline" @submit.prevent="goToSearch">
            <button class="btn btn-outline-primary search-btn" type="submit">Tìm kiếm</button>
          </form>

          <!-- Đăng nhập/Đăng ký -->
          <span class="user" v-if="!isLoggedIn">
            <router-link to="/login" class="btn btn-primary me-3">
              Đăng nhập / Đăng ký
            </router-link>
          </span>

          <!-- Dropdown User khi đã đăng nhập -->
          <span class="user" v-else>
            <div class="dropdown" @click="toggleDropdown">
              <button class="btn btn-outline-primary dropdown-toggle">
                Xin chào, {{ user?.fullName }}
              </button>
              <ul class="dropdown-menu" :class="{ show: showDropdown }">
                <li><button class="dropdown-item" @click="logout">Đăng xuất</button></li>
                <li v-if="user?.role === 'admin'">
                  <button class="dropdown-item" @click="goToProductManagement">Quản lý sản phẩm</button>
                </li>
              </ul>
            </div>
          </span>

          <!-- Giỏ hàng với biểu tượng Bootstrap Icons -->
          <router-link to="/cart" class="btn cart-btn d-flex align-items-center position-relative">
            <!-- Biểu tượng giỏ hàng sử dụng Bootstrap Icons -->
            <i class="bi bi-cart-fill cart-icon"></i>
            <!-- Số lượng sản phẩm trong giỏ -->
            <span class="cart-count position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cartItemCount }}
            </span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AppHeader',
  data() {
    return {
      showDropdown: false,
      searchQuery: "" // Biến lưu giá trị tìm kiếm
    };
  },
  computed: {
    ...mapGetters(['cartItemCount', 'isLoggedIn', 'user'])
  },
  methods: {
    ...mapActions(['setLoginStatus']),
    goToHome() {
      this.$router.push('/');
    },
    goToSearch() {
      // Dẫn đến trang tìm kiếm với giá trị query
      this.$router.push({ name: 'AppSearch', query: { search: this.searchQuery } });
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    logout() {
      this.setLoginStatus({ status: false, user: null });
      this.$router.push('/');
    },
    goToProductManagement() {
      this.$router.push('/product-management');
    }
  }
};
</script>

<style scoped>
/* Hiệu ứng Shine cho Logo */
.logo-shine {
  position: relative;
  display: inline-block;
}

.logo {
  font-size: 2.5em;
  font-weight: bold;
  background: linear-gradient(to right, #007bff 0%, #ffffff 20%, #007bff 40%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 3s linear infinite;
  font-family: "Poppins", sans-serif;
}

@keyframes shine {
  0% {
    background-position: 0%;
  }
  100% {
    background-position: 200%;
  }
}

/* Thanh Voucher cuộn ngang */
.top-line {
  background-color: #ffc800;
  padding: 8px 0;
  font-weight: bold;
  text-align: center;
  overflow: hidden;
  position: relative;
  color: rgb(0, 0, 0);
}

.voucher {
  display: flex;
  gap: 50px;
  white-space: nowrap;
  font-size: 16px;
  animation: scrollLeft 20s linear infinite;
}

@keyframes scrollLeft {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}

/* Navbar */
.navbar {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out; /* Hiệu ứng khi navbar di chuyển */
}
.navbar .nav-item .nav-link {
  font-size: 18px;
  font-weight: 500;
  color: #007bff;
  padding: 10px 15px;
  transition: color 0.3s, transform 0.3s; /* Thêm hiệu ứng biến màu và kích thước */
}

.navbar .nav-item .nav-link:hover {
  color: #ffcc00;
  transform: scale(1.1); /* Phóng to khi hover */
}

/* Tìm kiếm */
.search-btn {
  font-size: 18px;
  font-weight: 500;
  color: #007bff;
  border: 1px solid #007bff;
  transition: background 0.3s, color 0.3s;
  margin-right: 15px; /* Tạo khoảng cách giữa các nút */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Thêm bóng đổ */
}

.search-btn:hover {
  background-color: #007bff;
  color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* Thêm bóng khi hover */
}

/* Đăng nhập/Đăng ký */
.user {
  margin-right: 15px; /* Khoảng cách giữa đăng nhập và giỏ hàng */
}

/* Giỏ hàng */
.cart-btn {
  font-size: 24px; /* Tăng kích thước icon */
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
  border-radius: 50%;
  width: 60px; /* Tăng kích thước vòng tròn */
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.cart-btn:hover {
  background-color: #007bff;
  color: white;
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.cart-icon {
  font-size: 1.8rem; /* Tăng kích thước icon */
}

/* Đếm số lượng sản phẩm trong giỏ */
.cart-count {
  font-size: 16px;
  padding: 8px 16px;
  background-color: #ff5733; /* Màu tươi sáng */
  color: white;
  position: absolute;
  top: -10px;
  right: -10px;
  font-weight: bold;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Đổ bóng để nổi bật */
  animation: bounce 0.6s ease-in-out infinite; /* Hiệu ứng nhảy */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Hiệu ứng nhảy cho số đếm */
@keyframes bounce {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1);
  }
  75% {
    transform: scale(1.2);
  }
}

</style>
