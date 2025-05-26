<template>
  <div class="container home-container">
    <h2>Selamat Datang di Hotel Kami!</h2>
    <p>Nikmati pengalaman menginap terbaik dengan layanan istimewa dan suasana nyaman.</p>

    <div class="promo-box flex-row">
      <div
        v-for="(promo, index) in promos"
        :key="index"
        class="promo-item"
        :class="{
          active: activeIndex === index,
          sibling: activeIndex !== null && activeIndex !== index
        }"
        @click="setActive(index)"
      >
        <h3>{{ promo.title }}</h3>
        <p>{{ promo.description }}</p>
      </div>
    </div>

    <section class="features-section">
      <h3>Kenapa Memilih Hotel Kami?</h3>
      <div class="features">
        <div class="feature-item">🛏️ Kamar Nyaman & Bersih</div>
        <div class="feature-item">📶 Wi-Fi Super Cepat</div>
        <div class="feature-item">🏊 Kolam Renang & Spa</div>
        <div class="feature-item">🍽️ Restoran dengan Menu Lezat</div>
      </div>
    </section>

    <section class="testimonials">
      <h3>Apa Kata Tamu Kami</h3>
      <div class="testimonial-box">
        <p>"Pelayanan sangat ramah dan kamar sangat bersih. Pasti akan kembali lagi!"</p>
        <span>- Rina, Jakarta</span>
      </div>
      <div class="testimonial-box">
        <p>"Makanan enak, lokasi strategis, dan fasilitas lengkap. Recommended!"</p>
        <span>- Budi, Surabaya</span>
      </div>
    </section>

    <section class="gallery">
      <h3>Galeri Hotel</h3>
      <div class="gallery-images">
        <div class="gallery-card">
          <img src="/tempatmakan.jpg" alt="Room" />
          <p>Restaurant</p>
        </div>
        <div class="gallery-card">
          <img src="/lobby.jpg" alt="Lobby" />
          <p>Lobi Modern</p>
        </div>
        <div class="gallery-card">
          <img src="/pool.jpg" alt="Kolam Renang" />
          <p>Kolam Renang</p>
        </div>
        <div class="gallery-card">
          <img src="/ruangkeluarga.jpg" alt="Ruang Keluarga" />
          <p>Ruang Keluarga</p>
        </div>
      </div>
    </section>

    <section class="cta-box">
      <h3>Siap Menginap Bersama Kami?</h3>
      <p>Pesan sekarang dan nikmati promo spesial hari ini juga!</p>
      <button class="cta-button" @click="goToRooms">Pesan Sekarang</button>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    const promos = [
      { title: 'Promo Akhir Tahun', description: 'Diskon hingga 30% untuk semua tipe kamar.' },
      { title: 'Gratis Sarapan', description: 'Pesan kamar Deluxe dan dapatkan sarapan gratis untuk dua orang.' },
      { title: 'Check-in Lebih Awal', description: 'Dapatkan fasilitas check-in lebih awal tanpa biaya tambahan.' }
    ];

    const activeIndex = ref(null);

    function setActive(index) {
      activeIndex.value = activeIndex.value === index ? null : index;
    }

    function goToRooms() {
      window.location.href = '/rooms';
    }

    return {
      promos,
      activeIndex,
      setActive,
      goToRooms
    };
  }
}
</script>

<style scoped>
.home-container {
  padding: 30px 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #333;
  background-color: #e6f0ff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 64, 128, 0.1);
}

.promo-box {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  margin-top: 25px;
}

.promo-item {
  background-color: #004080;
  color: white;
  padding: 20px;
  border-radius: 10px;
  flex: 1 1 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  user-select: none;
}

/* Item yang sedang aktif: naik dan shadow lebih besar */
.promo-item.active {
  transform: translateY(-15px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
  z-index: 10;
}

/* Item sibling lain saat ada item aktif: hanya shadow lebih besar, tapi posisi tetap */
.promo-item.sibling {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

/* Hover tetap ada */
.promo-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
}

.features-section {
  margin-top: 40px;
}
.features {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
}
.feature-item {
  background-color: #e6f0ff;
  border-left: 5px solid #004080;
  padding: 15px;
  border-radius: 6px;
  flex: 1 1 220px;
}

.testimonials {
  margin-top: 40px;
}
.testimonial-box {
  background-color: #f9f9f9;
  border-left: 5px solid #004080;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 6px;
}

.gallery {
  margin-top: 40px;
}
.gallery-images {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 kolom */
  gap: 20px;
  margin-top: 10px;
}

.gallery-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
}

.gallery-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.3);
}

.gallery-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.gallery-card p {
  margin: 10px 0 15px;
  font-weight: 600;
  color: #004080;
}

.cta-box {
  margin-top: 50px;
  background-color: #004080;
  color: white;
  padding: 30px;
  text-align: center;
  border-radius: 10px;
}
.cta-button {
  margin-top: 15px;
  padding: 10px 25px;
  background-color: #ffcc00;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.cta-button:hover {
  background-color: #e6b800;
}
</style>
