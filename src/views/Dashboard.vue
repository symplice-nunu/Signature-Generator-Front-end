<template>
  <div class="flex">
    <!-- Sidebar Component -->
    <SidebarComponent />
    
    <div class="flex-1 p-6 bg-gray-100">
      <h1 class="text-3xl font-bold text-teal-600">Welcome to Admin Dashboard</h1>
      
      <div class="mt-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold text-teal-600">Total Users</h3>
            <router-link to="/company-settings" class="text-2xl font-bold hover:text-teal-700 cursor-pointer">
              {{ userCount }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SidebarComponent from '../components/Sidebar.vue';

export default {
  name: 'DashboardPage',
  components: {
    SidebarComponent,
  },
  data() {
    return {
      userCount: 0,
    };
  },
  mounted() {
    this.fetchUserCount();
  },
  methods: {
    async fetchUserCount() {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error("No token found in localStorage");
          alert("You need to be logged in to access this data.");
          return;
        }
        
        const response = await axios.get('http://localhost:8080/api/v1/users/count', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          this.userCount = response.data.userCount;
        } else {
          console.error("Failed to fetch user count");
        }
      } catch (error) {
        console.error("Error fetching user count:", error);
        alert("Failed to fetch user count. Please try again later.");
      }
    },
  },
};
</script>
