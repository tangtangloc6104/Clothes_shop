import { createStore } from 'vuex';
import axios from 'axios';

const state = {
  cart: [],
  items: [], // Define the items array in the state
  isLoggedIn: false,
  user: null,
};

const updateItems = (state, { product, size, quantity }) => {
  const storeItem = state.items.find(item => item.id === product.id);
  if (storeItem) {
    // Update the existing item
    storeItem.size = size;
    storeItem.quantity = quantity;
  } else {
    // Add a new item to the array
    state.items.push({ id: product.id, size, quantity });
  }
};

const mutations = {
  updateItems,
  setItems(state, items) {
    state.items = items;
  },
  addToCart(state, { product, size }) {
    const item = state.cart.find(item => item.id === product.id && item.selectedSize === size);
    if (item) {
      item.quantity += 1;
    } else {
      state.cart.push({
        ...product,
        selectedSize: size,
        quantity: 1
      });
    }
    updateItems(state, { product, size, quantity: -1 });
  },
  increaseQuantity(state, { product, size }) {
    const item = state.cart.find(item => item.id === product.id && item.selectedSize === size);
    if (item) {
      item.quantity += 1;
      updateItems(state, { product, size, quantity: -1 });
    }
  },
  decreaseQuantity(state, { product, size }) {
    const item = state.cart.find(item => item.id === product.id && item.selectedSize === size);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        updateItems(state, { product, size, quantity: 1 });
      } else {
        state.cart = state.cart.filter(cartItem => cartItem.id !== product.id || cartItem.selectedSize !== size);
        updateItems(state, { product, size, quantity: 1 });
      }
    }
  },
  clearCart(state) {
    state.cart = [];
  },
  setLoginStatus(state, { status, user }) {
    state.isLoggedIn = status;
    state.user = user;
    if (status) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user');
    }
  },
  removeFromCart(state, item) {
    state.cart = state.cart.filter(cartItem => cartItem.id !== item.id || cartItem.selectedSize !== item.selectedSize);
    updateItems(state, { product: item, size: item.selectedSize, quantity: item.quantity });
  }
};

const actions = {
  addToCart({ commit }, payload) {
    commit('addToCart', payload);
  },
  increaseQuantity({ commit }, payload) {
    commit('increaseQuantity', payload);
  },
  decreaseQuantity({ commit }, payload) {
    commit('decreaseQuantity', payload);
  },
  clearCart({ commit }) {
    commit('clearCart');
  },
  setLoginStatus({ commit }, payload) {
    commit('setLoginStatus', payload);
  },
  removeFromCart({ commit }, payload) {
    commit('removeFromCart', payload);
  },
  initializeLoginStatus({ commit }) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user'));
    if (isLoggedIn && user) {
      commit('setLoginStatus', { status: true, user });
    }
  },

  // Thêm action fetchItems để lấy dữ liệu sản phẩm từ backend
  async fetchItems({ commit }) {
    try {
      const response = await axios.get('http://localhost:3000/api/items');  // API lấy danh sách sản phẩm
      commit('setItems', response.data); // Lưu sản phẩm vào store
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm:', error);
    }
  }
};

export default createStore({
  state,
  getters: {
    cartItems: state => state.cart,
    cartTotal: state => {
      return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    cartItemCount: state => {
      return state.cart.reduce((total, item) => total + item.quantity, 0);
    },
    getProductById: state => id => {
      return state.items.find(item => item.id === id);
    },
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user,
    latestProducts: state => {
      return state.items.slice(-10).reverse();
    }
  },
  mutations,
  actions
});
