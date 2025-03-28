<template>
  <div class="news-container">
    <h1>Trang Tin Tức</h1>
    <div class="news-list">
      <div v-for="article in articles" :key="article.id" class="news-item">
        <img :src="article.image" :alt="article.title" class="news-image" />
        <div class="news-content">
          <h2>{{ article.title }}</h2>
          <p class="news-date">{{ article.date }}</p>
          <p class="news-summary">{{ article.summary }}</p>
          <button @click="readMore(article.url)">Đọc thêm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppNews',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: 'Xu hướng thời trang mùa xuân 2025',
          date: '2025-02-20',
          summary: 'Khám phá những xu hướng thời trang nổi bật cho mùa xuân 2025, từ màu sắc tươi sáng đến các thiết kế độc đáo.',
          image: 'https://assets.vogue.com/photos/67634be0b1fb80043ccd54f4/master/w_1920,c_limit/spring%202025%20fashion%20trends.png',
          url: 'https://www.vogue.com/article/spring-2025-fashion-trends'
        },
        {
          id: 2,
          title: 'Bí quyết phối đồ cho mùa hè',
          date: '2025-02-18',
          summary: 'Học cách phối đồ mùa hè sao cho vừa thoải mái vừa thời trang với những gợi ý từ các chuyên gia.',
          image: 'https://file.hstatic.net/1000184601/article/nguyen-tac-phoi-mau-quan-ao-mua-he_10e768bda4984912b3a61823be8599ff.jpg',
          url: 'https://coupletx.com/blogs/thoi-trang/nguyen-tac-phoi-quan-ao-mua-he-sieu-hack-tuoi-cho-moi-dang-nguoi?srsltid=AfmBOoqZLAfZUTUAejmP7MfwtXLHJ8j2siul3AIsltI_ugRZUTk0VFPg/summer-outfit-ideas'
        },
        {
          id: 3,
          title: 'Những bộ sưu tập thời trang nổi bật tại Tuần lễ thời trang Paris',
          date: '2025-02-15',
          summary: 'Cùng nhìn lại những bộ sưu tập thời trang ấn tượng nhất tại Tuần lễ thời trang Paris 2025.',
          image: 'https://cdn.tatlerasia.com/tatlerasia/i/2024/10/04110247-1200x630_cover_1200x630.jpg',
          url: 'https://www.tatlerasia.com/style/fashion/paris-fashion-week-spring-summer-highlight-1-vn'
        }
      ]
    };
  },
  methods: {
    readMore(url) {
      window.open(url, '_blank');
    }
  }
};
</script>

<style scoped>
.news-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
}

.news-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.news-item {
  display: flex;
  flex-direction: column;
  width: calc(33.333% - 20px);
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.news-item:hover {
  transform: scale(1.05);
}

.news-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-content {
  padding: 20px;
}

.news-content h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
}

.news-date {
  font-size: 0.9em;
  color: #888;
  margin-bottom: 10px;
}

.news-summary {
  font-size: 1em;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #0056b3;
}
</style>