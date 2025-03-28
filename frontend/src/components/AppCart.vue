<template>
  <div class="cart-container">
    <h1>Giỏ hàng</h1>
    <div v-if="cartItems && cartItems.length">
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <img :src="'http://localhost:3000' + item.image" :alt="item.name" class="cart-item-image" />
        <div class="cart-item-details">
          <h2>{{ item.name }}</h2>
          <p>Size: {{ item.selectedSize }}</p>
          <p>Giá: {{ item.price.toLocaleString() }} VNĐ</p>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item)" class="quantity-button">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item)" class="quantity-button">+</button>
          </div>
          <button @click="removeFromCart(item)" class="remove-button">Xóa</button>
        </div>
      </div>
      <div class="cart-total">
        <h2>Tổng cộng: {{ cartTotal.toLocaleString() }} VNĐ</h2>
        <button @click="checkout" class="checkout-button">Thanh toán</button>
      </div>
    </div>
    <div v-else class="empty-cart">
      <p>Giỏ hàng của bạn đang trống.</p>
    </div>

    <!-- Modal for successful checkout -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <p>Thanh toán thành công!</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'AppCart',
  data() {
    return {
      showSuccessModal: false
    };
  },
  computed: {
    ...mapState({
      cartItems: state => state.cart || [],
      cartTotal: state => state.cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    })
  },
  methods: {
    ...mapActions(['increaseQuantity', 'decreaseQuantity', 'removeFromCart']),
    async checkout() {
      try {
        // API call to update items in the server
        await axios.post('http://localhost:3000/api/update-items', this.cartItems);
        this.showSuccessModal = true;
        this.$store.commit('clearCart');
      } catch (error) {
        console.error('Error during checkout:', error);
        alert('Thanh toán thất bại. Vui lòng thử lại.');
      }
    },
    closeModal() {
      this.showSuccessModal = false;
    },
    increaseQuantity(item) {
      this.$store.dispatch('increaseQuantity', { product: item, size: item.selectedSize });
    },
    decreaseQuantity(item) {
      this.$store.dispatch('decreaseQuantity', { product: item, size: item.selectedSize });
    },
    removeFromCart(item) {
      this.$store.commit('removeFromCart', item);
    }
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 1s ease-in-out;
}

.cart-item {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 20px;
  animation: slideIn 0.5s ease-out;
}

.cart-item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;
}

.cart-item-details {
  flex: 1;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
  line-height: 28px;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out;
}

.quantity-button:hover {
  transform: scale(1.2);
}

.quantity {
  margin: 0 10px;
  font-size: 16px;
}

.remove-button {
  background-color: transparent;
  border: 1px solid #ff6347;
  color: #ff6347;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  transition: color 0.3s, border-color 0.3s;
}

.remove-button:hover {
  color: #fff;
  background-color: #ff6347;
  border-color: #fff;
}

.cart-total {
  text-align: right;
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 20px;
}

.checkout-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2em;
  transition: background-color 0.3s, transform 0.2s ease-in-out;
}

.checkout-button:hover {
  background-color: #0056b3;
  transform: scale(1.05);
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.5s ease-in-out;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 5px;
  text-align: center;
  position: relative;
  min-width: 300px;
  animation: slideIn 0.5s ease-out;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Animation effects */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes slideIn {
  0% {
    transform: translateY(20px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
