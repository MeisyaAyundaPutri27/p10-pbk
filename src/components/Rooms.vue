<template>
  <div class="container rooms-container">
    <h2>Daftar Kamar Hotel</h2>
    <div class="room-list flex-row">
      <div v-for="room in rooms" :key="room.id" class="room-card">
        <img :src="room.image" :alt="room.name" class="room-image" />
        <h3>{{ room.name }}</h3>
        <p class="price">Harga: {{ room.price }}</p>
        <p>{{ room.description }}</p>
        <router-link :to="`/rooms/${room.id}`" class="btn-detail">Lihat Detail</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rooms: [
        {
          id: 1,
          name: 'Kamar Deluxe',
          price: 'Rp 500.000 / malam',
          description: 'Kamar mewah dengan fasilitas lengkap.',
          image: '/kamardelux.jpg'
        },
        {
          id: 2,
          name: 'Kamar Suite',
          price: 'Rp 800.000 / malam',
          description: 'Kamar suite dengan pemandangan indah.',
          image: '/kamarsuite.jpg'
        },
        {
          id: 3,
          name: 'Kamar Standard',
          price: 'Rp 300.000 / malam',
          description: 'Kamar standard nyaman dan ekonomis.',
          image: '/kamarstandard.jpg'
        }
      ]
    }
  }
}
</script>

<style scoped>
.rooms-container {
  padding: 30px 20px;
  font-family: 'Segoe UI', sans-serif;
}

.room-list {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 20px;
}

.room-card {
  background-color: white;
  padding: 20px 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  flex: 1 1 280px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

.room-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

.price {
  font-weight: 700;
  margin: 12px 0;
  color: #004080;
}

.btn-detail {
  background-color: #004080;
  color: white;
  text-align: center;
  padding: 10px 0;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 15px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-detail:hover {
  background-color: #002f5a;
}
</style>
