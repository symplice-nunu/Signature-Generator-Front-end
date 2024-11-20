<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded shadow-md w-96">
        <h1 class="text-2xl font-bold mb-6 text-center">Reset Password</h1>
        <form @submit.prevent="handleReset">
          <div class="mb-4">
            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
              :class="{'border-red-500': emailError}"
              required
            />
            <p v-if="emailError" class="text-sm text-red-500 mt-1">{{ emailErrorMessage }}</p>
          </div>
          <button
            type="submit"
            class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
            :disabled="emailError"
          >
            Reset Password
          </button>
        </form>
        <p class="text-center text-sm text-gray-500 mt-4">
          Remembered your password?
          <router-link to="/login" class="text-teal-500 hover:underline">Login</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ResetPasswordForm',
    data() {
      return {
        email: '',
        emailError: false,
        emailErrorMessage: '',
      };
    },
    methods: {
      validateEmail() {
        if (!this.email) {
          this.emailError = true;
          this.emailErrorMessage = 'Email is required.';
        } else {
          const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
          this.emailError = !emailPattern.test(this.email);
          this.emailErrorMessage = this.emailError ? 'Please enter a valid email.' : '';
        }
      },
  
      handleReset() {
        this.validateEmail();
        
        if (this.emailError) {
          return; 
        }
  
        console.log('Reset password request for email:', this.email);
      },
    },
    watch: {
      email() {
        this.validateEmail();
      },
    },
  };
  </script>