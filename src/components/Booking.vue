<template>
  <div class="container booking-container">
    <h2>Booking Kamar: {{ room.name }}</h2>
    <form @submit.prevent="submitBooking">
      <label>Nama Pemesan</label>
      <input v-model="customerName" type="text" placeholder="Masukkan nama lengkap" />

      <label>No. HP</label>
      <input v-model="phoneNumber" type="tel" placeholder="Masukkan nomor HP" />

      <label>Alamat</label>
      <input v-model="address" type="text" placeholder="Masukkan alamat lengkap" />

      <label>Tanggal Check-in</label>
      <input type="date" v-model="checkInDate" />

      <label>Tanggal Check-out</label>
      <input type="date" v-model="checkOutDate" />

      <label>Upload Foto KTP</label>
      <input type="file" @change="handleFileUpload" accept="image/*" />

      <button type="submit">Pesan Sekarang</button>
    </form>

    <!-- Modal error kalau data belum lengkap -->
    <transition name="modal-float">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <p>Mohon isi semua data booking dengan lengkap ya 😀</p>
          <button @click="closeModal">Tutup</button>
        </div>
      </div>
    </transition>

    <!-- Modal preview foto KTP -->
    <transition name="modal-float">
      <div v-if="showKtpPreview" class="modal-overlay" @click.self="closeKtpPreview">
        <div class="modal-content">
          <p>Ini poto KTP yang kamu kirim 😊</p>
          <img :src="ktpPreviewUrl" alt="Foto KTP" class="ktp-preview-image" />
          <button @click="closeKtpPreview">Tutup</button>
        </div>
      </div>
    </transition>

    <!-- Modal konfirmasi booking -->
    <transition name="modal-float">
      <div v-if="showConfirmation" class="modal-overlay" @click.self="showConfirmation = false">
        <div class="modal-content">
          <h3>Konfirmasi Pesanan 😊</h3>
          <p><strong>Nama Pemesan:</strong> {{ confirmationData.customerName }}</p>
          <p><strong>No. HP:</strong> {{ confirmationData.phoneNumber }}</p>
          <p><strong>Alamat:</strong> {{ confirmationData.address }}</p>
          <p><strong>Kamar:</strong> {{ confirmationData.roomName }}</p>
          <p><strong>Check-in:</strong> {{ confirmationData.checkInDate }}</p>
          <p><strong>Check-out:</strong> {{ confirmationData.checkOutDate }}</p>
          <p><strong>Foto KTP:</strong> {{ confirmationData.ktpPhotoName }}</p>
          <p>Silahkan lihat detail pesanan Anda di <strong>My Booking</strong>.</p>
          <button @click="confirmBooking">Konfirmasi & Simpan</button>
          <button @click="showConfirmation = false" style="margin-left: 10px; background-color: #ccc; color: #333;">Batal</button>
        </div>
      </div>
    </transition>

    <!-- Modal ucapan terima kasih -->
    <transition name="modal-float">
      <div v-if="showThankYou" class="modal-overlay" @click.self="closeThankYou">
        <div class="modal-content">
          <h3>Terima Kasih! 😊</h3>
          <p>Booking Anda telah berhasil.</p>
          <button @click="closeThankYou">Sama-sama</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['roomId'],
  data() {
    return {
      room: {},
      customerName: '',
      phoneNumber: '',
      address: '',
      checkInDate: '',
      checkOutDate: '',
      ktpPhoto: null,
      ktpPreviewUrl: '',
      showModal: false,
      showKtpPreview: false,
      showConfirmation: false,
      showThankYou: false,
      confirmationData: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.ktpPhoto = file;
        this.ktpPreviewUrl = URL.createObjectURL(file);
        this.showKtpPreview = true;
      }
    },
    submitBooking() {
      if (
        !this.customerName ||
        !this.phoneNumber ||
        !this.address ||
        !this.checkInDate ||
        !this.checkOutDate ||
        !this.ktpPhoto
      ) {
        this.showModal = true;
        return;
      }

      this.confirmationData = {
        customerName: this.customerName,
        phoneNumber: this.phoneNumber,
        address: this.address,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        ktpPhotoName: this.ktpPhoto.name,
        roomName: this.room.name,
      };

      this.showConfirmation = true;
    },
    confirmBooking() {
      const newBooking = {
        id: Date.now(),
        roomId: this.roomId,
        roomName: this.room.name,
        customerName: this.customerName,
        phoneNumber: this.phoneNumber,
        address: this.address,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        ktpPhotoName: this.ktpPhoto.name,
      };

      let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));

      this.showConfirmation = false;
      this.showThankYou = true;
    },
    closeModal() {
      this.showModal = false;
    },
    closeKtpPreview() {
      this.showKtpPreview = false;
      URL.revokeObjectURL(this.ktpPreviewUrl);
      this.ktpPreviewUrl = '';
    },
    closeThankYou() {
      this.showThankYou = false;
      // Setelah tutup popup terima kasih, redirect ke My Booking
      this.$router.push('/my-bookings');
    },
  },
  mounted() {
    const roomsData = {
      1: { name: 'Kamar Deluxe' },
      2: { name: 'Kamar Suite' },
      3: { name: 'Kamar Standard' },
    };
    this.room = roomsData[this.roomId] || {};
  },
};
</script>

<style scoped>
.booking-container {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #004080;
  margin-bottom: 20px;
  font-weight: 700;
}
label {
  display: block;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 5px;
  color: #004080;
  text-align: left;
  font-size: 13px;
}
input[type='text'],
input[type='tel'],
input[type='date'],
input[type='file'] {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
}
button {
  margin-top: 20px;
  width: 100%;
  padding: 10px 0;
  background-color: #004080;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #002b50;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal-content {
  background: white;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  text-align: center;
  font-weight: 600;
  color: #004080;
}
.modal-content button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: #004080;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.modal-content button:hover {
  background-color: #002b50;
}

/* Animasi modal floating */
.modal-float-enter-active {
  animation: floatIn 0.4s ease forwards;
}
.modal-float-leave-active {
  animation: floatOut 0.3s ease forwards;
}

@keyframes floatIn {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes floatOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(40px) scale(0.9);
  }
}

/* Styling gambar preview KTP */
.ktp-preview-image {
  max-width: 100%;
  margin-top: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
</style>
