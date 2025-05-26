<template>
  <div class="my-bookings-container">
    <h2>Daftar Booking Saya</h2>
    <div class="booking-list">
      <div
        v-for="(booking, index) in bookings"
        :key="booking.id"
        class="booking-card"
      >
        <h3>{{ booking.roomName }}</h3>
        <p><strong>Nama:</strong> {{ booking.customerName }}</p>
        <p><strong>No. HP:</strong> {{ booking.phoneNumber }}</p>
        <p><strong>Check-in:</strong> {{ booking.checkInDate }}</p>
        <p><strong>Check-out:</strong> {{ booking.checkOutDate }}</p>

        <div class="btn-group">
          <button @click="startEdit(index)">Edit</button>
          <button @click="confirmDelete(index)">Hapus</button>
        </div>

        <!-- Edit form muncul jika index ini sedang diedit -->
        <div v-if="editIndex === index" class="edit-form">
          <label>Nama Pemesan</label>
          <input v-model="editBooking.customerName" type="text" />

          <label>No. HP</label>
          <input v-model="editBooking.phoneNumber" type="tel" />

          <label>Check-in</label>
          <input type="date" v-model="editBooking.checkInDate" />

          <label>Check-out</label>
          <input type="date" v-model="editBooking.checkOutDate" />

          <button @click="saveEdit(index)">Simpan</button>
          <button @click="cancelEdit">Batal</button>
        </div>
      </div>
    </div>

    <!-- Modal Hapus -->
    <transition name="modal-fade">
      <div v-if="showDeleteModal" class="modal-overlay" @click.self="cancelDelete">
        <div class="modal-box">
          <h3>Konfirmasi Hapus</h3>
          <p>Apakah Anda yakin ingin menghapus booking ini?</p>
          <div class="modal-buttons">
            <button class="btn cancel" @click="cancelDelete">Batal</button>
            <button class="btn confirm" @click="deleteBookingConfirmed">Hapus</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookings: [],
      editIndex: null,
      editBooking: null,
      showDeleteModal: false,
      deleteIndex: null,
    };
  },
  methods: {
    loadBookings() {
      this.bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    },
    startEdit(index) {
      this.editIndex = index;
      this.editBooking = { ...this.bookings[index] };
    },
    cancelEdit() {
      this.editIndex = null;
      this.editBooking = null;
    },
    saveEdit(index) {
      if (
        !this.editBooking.customerName ||
        !this.editBooking.phoneNumber ||
        !this.editBooking.checkInDate ||
        !this.editBooking.checkOutDate
      ) {
        alert('Mohon isi semua data dengan lengkap!');
        return;
      }
      this.bookings.splice(index, 1, this.editBooking);
      localStorage.setItem('bookings', JSON.stringify(this.bookings));
      this.cancelEdit();
    },
    confirmDelete(index) {
      this.deleteIndex = index;
      this.showDeleteModal = true;
    },
    cancelDelete() {
      this.showDeleteModal = false;
      this.deleteIndex = null;
    },
    deleteBookingConfirmed() {
      if (this.deleteIndex !== null) {
        this.bookings.splice(this.deleteIndex, 1);
        localStorage.setItem('bookings', JSON.stringify(this.bookings));
        this.cancelDelete();
      }
    },
  },
  mounted() {
    this.loadBookings();
  },
};
</script>

<style scoped>
.my-bookings-container {
  max-width: 960px;
  margin: 20px auto;
  padding: 10px;
}
h2 {
  color: #004080;
  margin-bottom: 20px;
  font-weight: 700;
  text-align: center;
}
.booking-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.booking-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  width: 300px; /* Fixed width biar kotak konsisten */
  padding: 15px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 340px; /* Biar ukuran kotak stabil meski konten beda */
}
.booking-card h3 {
  color: #004080;
  margin-bottom: 10px;
  text-align: center;
}
.booking-card p {
  font-size: 14px;
  margin: 3px 0;
  text-align: center;
}
.btn-group {
  margin-top: auto;
  display: flex;
  gap: 10px;
  width: 100%;
}
.btn-group button {
  flex: 1;
  padding: 8px 0;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  background-color: #004080;
  color: white;
  transition: background-color 0.3s ease;
}
.btn-group button:hover {
  background-color: #002b50;
}
.edit-form {
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.edit-form label {
  font-weight: 600;
  font-size: 13px;
  color: #004080;
  margin-top: 8px;
  margin-bottom: 4px;
  text-align: left;
}
.edit-form input {
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}
.edit-form button {
  margin-top: 12px;
  background-color: #004080;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  padding: 8px 0;
}
.edit-form button:hover {
  background-color: #002b50;
}
.edit-form button + button {
  margin-left: 10px;
  background-color: #ccc;
  color: #333;
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Kotak modal */
.modal-box {
  background: white;
  border-radius: 12px;
  padding: 25px 30px;
  width: 320px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  text-align: center;
  color: #004080;
}

/* Judul modal */
.modal-box h3 {
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 20px;
}

/* Paragraf */
.modal-box p {
  font-size: 16px;
  margin-bottom: 20px;
}

/* Tombol modal */
.modal-buttons {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

/* Style tombol */
.modal-buttons .btn {
  flex: 1;
  padding: 10px 0;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
}

/* Tombol batal */
.modal-buttons .btn.cancel {
  background-color: #ccc;
  color: #444;
}
.modal-buttons .btn.cancel:hover {
  background-color: #aaa;
}

/* Tombol konfirmasi hapus */
.modal-buttons .btn.confirm {
  background-color: #c0392b;
  color: white;
}
.modal-buttons .btn.confirm:hover {
  background-color: #922b21;
}

/* Animasi modal fade */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
