<template>
  <div id="app">
    <nav v-if="loggedIn" class="nav-menu">
      <div class="nav-left">Meisya Bliss Resort</div>
      <div class="nav-right">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          @click.native="animateLink(link.path)"
          :class="{ 'float-up': activeLink === link.path }"
        >
          {{ link.label }}
        </router-link>
        <button @click="logout">Logout</button>
      </div>
    </nav>

    <div class="page-wrapper">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

export default {
  setup() {
    const loggedIn = ref(false);
    const activeLink = ref(null);

    const links = [
      { path: "/", label: "Home" },
      { path: "/rooms", label: "Rooms" },
      { path: "/my-bookings", label: "My Bookings" },
      { path: "/profile", label: "Profile" },
    ];

    const checkLogin = () => {
      loggedIn.value = !!localStorage.getItem("user");
    };

    onMounted(() => {
      checkLogin();
      window.addEventListener("storage", checkLogin);
    });

    onBeforeUnmount(() => {
      window.removeEventListener("storage", checkLogin);
    });

    const logout = () => {
      localStorage.removeItem("user");
      loggedIn.value = false;
      window.location.href = "/login";
    };

    const animateLink = (path) => {
      activeLink.value = path;
      setTimeout(() => {
        activeLink.value = null;
      }, 300);
    };

    return {
      loggedIn,
      logout,
      activeLink,
      animateLink,
      links,
    };
  },
};
</script>

<style>
/* Reset dan box-sizing */
* {
  box-sizing: border-box;
}

/* Navbar fixed di atas */
.nav-menu {
  background-color: #004080;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

/* Judul hotel */
.nav-left {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  user-select: none;
}

/* Menu kanan */
.nav-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Link dasar */
.nav-right a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  transition: transform 0.3s ease, background-color 0.3s ease, color 0.3s ease;
}

/* Efek klik */
.nav-right a.float-up {
  transform: translateY(-5px);
  background-color: #ffffff;
  color: #004080;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Tombol logout */
.nav-right button {
  background-color: #ff4d4d;
  border: none;
  color: white;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  user-select: none;
}

.nav-right button:hover {
  background-color: #e60000;
}

/* Bungkus konten halaman dengan padding atas setinggi navbar supaya tidak tertutup */
.page-wrapper {
  padding-top: 80px; /* beri ruang untuk navbar fixed */
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);
  padding-left: 20px;
  padding-right: 20px;
  box-sizing: border-box;
  background-color: #f9f9f9;
  overflow-y: auto;
}

/* Transisi fade halaman */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
