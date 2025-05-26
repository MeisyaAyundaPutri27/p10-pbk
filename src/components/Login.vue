<template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>Belum punya akun? <router-link to="/register">Daftar di sini</router-link></p>
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
      handleLogin() {
        // Simulasi login sukses, simpan ke localStorage
        localStorage.setItem('user', JSON.stringify({ username: this.username }));
        // Trigger event storage supaya App.vue tahu login status berubah
        window.dispatchEvent(new Event('storage'));
        this.$router.push('/');
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    box-shadow: 0 0 10px #ccc;
    border-radius: 10px;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
  }
  button {
    background-color: #004080;
    color: white;
    border: none;
    padding: 10px;
    width: 100%;
    cursor: pointer;
    font-weight: bold;
  }
  </style>