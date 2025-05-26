<template>
    <div class="profile-container">
      <h2>Profil Saya</h2>
      <form @submit.prevent="updateProfile">
        <label>Username</label>
        <input v-model="username" disabled />
  
        <label>Email</label>
        <input v-model="email" type="email" placeholder="Masukkan email" />
  
        <label>Nomor Telepon</label>
        <input v-model="phone" type="tel" placeholder="Masukkan nomor telepon" />
  
        <button type="submit">Simpan Perubahan</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        phone: ''
      }
    },
    mounted() {
      const user = JSON.parse(localStorage.getItem('user')) || {};
      this.username = user.username || 'user';
      this.email = user.email || '';
      this.phone = user.phone || '';
    },
    methods: {
      updateProfile() {
        alert('Profil berhasil diperbarui!');
        // Simulasi update profil, bisa ditambahkan penyimpanan ke localStorage atau server
      }
    }
  }
  </script>
  
  <style scoped>
  .profile-container {
    max-width: 400px;
    margin: 30px auto;
    background-color: #f5faff;
    padding: 30px 25px;
    border-radius: 14px;
    box-shadow: 0 6px 18px rgba(0, 64, 128, 0.15);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    color: #003366;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 25px;
    font-weight: 700;
    font-size: 1.8rem;
    color: #004080;
  }
  
  form label {
    display: block;
    margin-top: 18px;
    font-weight: 600;
    font-size: 1rem;
    color: #004080;
  }
  
  form input {
    width: 100%;
    padding: 10px 12px;
    margin-top: 6px;
    border: 1.8px solid #c0d4f7;
    border-radius: 8px;
    font-size: 1rem;
    color: #003366;
    transition: border-color 0.3s ease;
    box-sizing: border-box;
  }
  
  form input:disabled {
    background-color: #e0e7f7;
    cursor: not-allowed;
    color: #7a8ba6;
  }
  
  form input:focus:not(:disabled) {
    outline: none;
    border-color: #004080;
    box-shadow: 0 0 8px rgba(0, 64, 128, 0.3);
  }
  
  button {
    margin-top: 28px;
    width: 100%;
    padding: 12px 0;
    background-color: #004080;
    color: #fff;
    font-weight: 700;
    font-size: 1.1rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.35s ease;
    box-shadow: 0 4px 10px rgba(0, 64, 128, 0.3);
  }
  
  button:hover {
    background-color: #002a50;
  }
  </style>
  