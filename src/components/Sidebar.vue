<template>
  <div class="flex h-screen">
    <div class="w-64 bg-teal-500 text-white p-6">
      <h2 class="text-xl font-bold mb-6">Signature Generator</h2>
      <ul>
        <li>
          <router-link 
            to="/dashboard" 
            class="block py-2 px-4 hover:bg-teal-600 rounded"
            exact-active-class="bg-teal-700"
          >
            Dashboard
          </router-link>
        </li>
        <li>
          <router-link 
            to="/company-settings" 
            class="block py-2 px-4 hover:bg-teal-600 rounded"
            exact-active-class="bg-teal-700"
          >
            Users
          </router-link>
        </li>
        <li>
          <button 
            @click="logout" 
            class="block py-2 px-4 hover:bg-teal-600 rounded text-white w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
    <div class="flex-1 p-6 bg-gray-100">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SidebarComponent',
  created() {
    if (!localStorage.getItem('token')) {
      this.logout();
    }
  },
  methods: {
    async logout() {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/logout');
        if (response.data.success) {
          localStorage.removeItem('token');
          
          this.$router.push('/login');
        } else {
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },
};
</script>