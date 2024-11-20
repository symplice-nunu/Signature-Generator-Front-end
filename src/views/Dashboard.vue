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
            <p class="text-2xl font-bold">{{ userCount }}</p> <!-- Bind dynamic value here -->
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
      userCount: 0, // Initialize user count
    };
  },
  mounted() {
    this.fetchUserCount(); // Fetch the user count when the component is mounted
  },
  methods: {
    async fetchUserCount() {
      try {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error("No token found in localStorage");
          alert("You need to be logged in to access this data.");
          return;
        }
        
        // Make API request to fetch the user count
        const response = await axios.get('http://signaturegenerator.samueldev.com/api/v1/users/count', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request headers
          },
        });
        
        // Check if the response is successful
        if (response.data.success) {
          this.userCount = response.data.userCount; // Update userCount with the response
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

<style scoped>
/* Add your custom styles here */
</style>
