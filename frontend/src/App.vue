<template>
  <div id="app">
    <Header />

    <router-view v-slot="{ Component }">
      <transition @enter="enterAnimation" @leave="leaveAnimation" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <Footer />
  </div>
</template>

<script>
import { gsap } from "gsap";
import Header from './components/AppHeader.vue';
import Footer from './components/AppFooter.vue';

export default {
  name: "App",
  components: {
    Header,
    Footer
  },
  methods: {
    // Hiệu ứng khi vào trang mới
    enterAnimation(el, done) {
      gsap.fromTo(el, 
        { opacity: 0, y: 50, scale: 0.9 }, // Bắt đầu với opacity 0, lệch xuống và thu nhỏ
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out", onComplete: done } // Hiện dần, trở lại vị trí bình thường
      );
    },
    // Hiệu ứng khi rời trang cũ
    leaveAnimation(el, done) {
      gsap.to(el, 
        { opacity: 0, y: -50, scale: 1.05, duration: 0.5, ease: "power3.in", onComplete: done } // Fade dần và di chuyển lên trên
      );
    }
  }
};
</script>

<style>
/* CSS cơ bản */
#app {
  position: relative;
  overflow: hidden;
}
</style>
