import { createRouter, createWebHistory } from 'vue-router';

// Import komponen halaman
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Home from '../components/Home.vue';
import Rooms from '../components/Rooms.vue';
import RoomDetail from '../components/RoomDetail.vue';
import Booking from '../components/Booking.vue';
import MyBookings from '../components/MyBookings.vue';
import Profile from '../components/Profile.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/rooms',
    name: 'Rooms',
    component: Rooms,
    meta: { requiresAuth: true }
  },
  {
    path: '/rooms/:id',
    name: 'RoomDetail',
    component: RoomDetail,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/booking/:roomId',
    name: 'Booking',
    component: Booking,
    meta: { requiresAuth: true },
    props: true
  },
  {
    path: '/my-bookings',
    name: 'MyBookings',
    component: MyBookings,
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard agar halaman dengan meta.requiresAuth cuma bisa diakses kalau sudah login
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user');
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login');
  } else if ((to.name === 'Login' || to.name === 'Register') && isLoggedIn) {
    next('/');
  } else {
    next();
  }
});

export default router;
