<template>
  <div class="contact-container">
    <h1>Liên hệ</h1>
    <div class="contact-content">
      <!-- Thông tin liên hệ -->
      <div class="contact-info">
        <h2>Thông tin liên hệ</h2>
        <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</p>
        <p><strong>Điện thoại:</strong> +84 123 456 789</p>
        <p><strong>Email:</strong> contact@example.com</p>
        <p><strong>Giờ làm việc:</strong> Thứ 2 - Thứ 6: 9:00 - 18:00</p>
      </div>

      <!-- Form liên hệ -->
      <div class="contact-form">
        <h2>Gửi tin nhắn cho chúng tôi</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Tên của bạn</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="email">Email của bạn</label>
            <input type="email" id="email" v-model="form.email" required />
          </div>
          <div class="form-group">
            <label for="message">Tin nhắn</label>
            <textarea id="message" v-model="form.message" required></textarea>
          </div>
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>

    <!-- Bản đồ -->
    <div class="map">
      <h2>Bản đồ</h2>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.502144056945!2d106.70098231533414!3d10.77688999232056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292920d1b1b1%3A0x4b1b1b1b1b1b1b1b!2s123%20%C4%90%C6%B0%E1%BB%9Dng%20ABC%2C%20Qu%E1%BA%ADn%201%2C%20TP.%20H%E1%BB%93%20Ch%C3%AD%20Minh!5e0!3m2!1sen!2s!4v1612345678901!5m2!1sen!2s"
        width="100%"
        height="450"
        style="border:0;"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppContact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      // Handle form submission (e.g., send data to server)
      alert('Tin nhắn của bạn đã được gửi!');
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
};
</script>

<style scoped>
/* Container chính */
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #f9f9f9;
}

/* Tiêu đề */
h1 {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
}

/* Nội dung liên hệ */
.contact-content {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

/* Thông tin liên hệ */
.contact-info {
  flex: 1;
  min-width: 300px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-info h2 {
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #007bff;
}

.contact-info p {
  margin-bottom: 10px;
  font-size: 1em;
  color: #555;
}

/* Form liên hệ */
.contact-form {
  flex: 1;
  min-width: 300px;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #007bff;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}

input,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1em;
  color: #333;
}

textarea {
  resize: vertical;
  height: 150px;
}

button {
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1em;
}

button:hover {
  background-color: #0056b3;
}

/* Bản đồ */
.map {
  margin-top: 40px;
  text-align: center;
}

.map h2 {
  font-size: 1.5em;
  color: #007bff;
  margin-bottom: 20px;
}
</style>
