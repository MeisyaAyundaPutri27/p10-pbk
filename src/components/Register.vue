<template>
    <div class="register-container">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p>Sudah punya akun? <router-link to="/login">Login di sini</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      handleRegister() {
        alert('Registrasi berhasil! Silakan login.');
        this.$router.push('/login');
      }
    }
  }
  </script>
  
  <style scoped>
  .register-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    box-shadow: 0 0 10px #ccc;
    border-radius: 10px;
  }
  input, button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
  }
  button {
    background-color: #004080;
    color: white;
    border: none;
  }
  </style>