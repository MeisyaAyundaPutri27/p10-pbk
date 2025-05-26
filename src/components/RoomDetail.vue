<template>
  <div class="container room-detail-container">
    <div class="card">
      <img :src="room.image" :alt="room.name" class="room-image" />
      <div class="info">
        <h2>{{ room.name }}</h2>
        <p class="price">Harga: {{ room.price }}</p>
        <p class="description">{{ room.description }}</p>
        <button class="btn-book" @click="bookRoom">Pesan Kamar Ini</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      room: {}
    };
  },
  methods: {
    bookRoom() {
      this.$router.push(`/booking/${this.id}`);
    }
  },
  mounted() {
    const roomsData = {
      1: {
        name: 'Kamar Deluxe',
        price: 'Rp 500.000 / malam',
        description: 'Kamar mewah dengan fasilitas lengkap.',
        image: '/kamardelux.jpg'
      },
      2: {
        name: 'Kamar Suite',
        price: 'Rp 800.000 / malam',
        description: 'Kamar suite dengan pemandangan indah.',
        image: '/kamarsuite.jpg'
      },
      3: {
        name: 'Kamar Standard',
        price: 'Rp 300.000 / malam',
        description: 'Kamar standard nyaman dan ekonomis.',
        image: '/kamarstandard.jpg'
      }
    };
    this.room = roomsData[this.id] || {};
  }
};
</script>

<style scoped>
.room-detail-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
}

.card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  text-align: center;
  padding: 25px;
}

.room-image {
  width: 100%;
  max-height: 350px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
}

h2 {
  color: #004080;
  font-size: 24px;
  margin-bottom: 12px;
}

.price {
  font-weight: bold;
  color: #0073e6;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.description {
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 25px;
}

.btn-book {
  background-color: #004080;
  color: #fff;
  padding: 12px 28px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-book:hover {
  background-color: #002f5a;
}
</style>
