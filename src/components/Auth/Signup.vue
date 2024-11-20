<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <div v-if="signupSuccess" class="mb-4 p-3 text-green-700 bg-green-100 border border-green-400 rounded">
        {{ signupSuccessMessage }}
      </div>
      <div v-if="signupError" class="mb-4 p-3 text-red-700 bg-red-100 border border-red-400 rounded">
        {{ signupError }}
      </div>
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-medium mb-2">Name</label>
          <input
            type="text"
            id="name"
            v-model="name"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
            :class="{'border-red-500': nameError}"
            required
          />
          <p v-if="nameError" class="text-sm text-red-500 mt-1">{{ nameErrorMessage }}</p>
        </div>
        
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
        
        <div class="mb-4">
          <label for="phone" class="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="text"
            id="phone"
            v-model="phone"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
            :class="{'border-red-500': phoneError}"
            required
          />
          <p v-if="phoneError" class="text-sm text-red-500 mt-1">{{ phoneErrorMessage }}</p>
        </div>

        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
            :class="{'border-red-500': passwordError}"
            required
          />
          <p v-if="passwordError" class="text-sm text-red-500 mt-1">{{ passwordErrorMessage }}</p>
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="block text-gray-700 font-medium mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
            :class="{'border-red-500': confirmPasswordError}"
            required
          />
          <p v-if="confirmPasswordError" class="text-sm text-red-500 mt-1">{{ confirmPasswordErrorMessage }}</p>
        </div>

        <button
          type="submit"
          class="w-full bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600"
          :disabled="!isFormValid"
        >
          Sign Up
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-4">
        Already have an account?
        <router-link to="/login" class="text-teal-500 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SignupForm',
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      nameError: false,
      emailError: false,
      phoneError: false,
      passwordError: false,
      confirmPasswordError: false,
      nameErrorMessage: '',
      emailErrorMessage: '',
      phoneErrorMessage: '',
      passwordErrorMessage: '',
      confirmPasswordErrorMessage: '',
      signupError: '',
      signupSuccess: false,
      signupSuccessMessage: '',
    };
  },
  computed: {
    isFormValid() {
      return (
        this.name && !this.nameError &&
        this.email && !this.emailError &&
        this.phone && !this.phoneError &&
        this.password && !this.passwordError &&
        this.confirmPassword && !this.confirmPasswordError
      );
    },
  },
  methods: {
    validateName() {
      if (!this.name) {
        this.nameError = true;
        this.nameErrorMessage = 'Name is required.';
      } else {
        this.nameError = false;
        this.nameErrorMessage = '';
      }
    },

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

    validatePhone() {
      if (!this.phone) {
        this.phoneError = true;
        this.phoneErrorMessage = 'Phone number is required.';
      } else {
        const phonePattern = /^[0-9]{10}$/;
        this.phoneError = !phonePattern.test(this.phone);
        this.phoneErrorMessage = this.phoneError ? 'Please enter a valid phone number.' : '';
      }
    },

    validatePassword() {
      if (!this.password) {
        this.passwordError = true;
        this.passwordErrorMessage = 'Password is required.';
      } else {
        this.passwordError = this.password.length < 6;
        this.passwordErrorMessage = this.passwordError ? 'Password must be at least 6 characters.' : '';
      }
    },

    validateConfirmPassword() {
      if (!this.confirmPassword) {
        this.confirmPasswordError = true;
        this.confirmPasswordErrorMessage = 'Please confirm your password.';
      } else if (this.confirmPassword !== this.password) {
        this.confirmPasswordError = true;
        this.confirmPasswordErrorMessage = 'Passwords do not match.';
      } else {
        this.confirmPasswordError = false;
        this.confirmPasswordErrorMessage = '';
      }
    },

    async handleSignup() {
      this.validateName();
      this.validateEmail();
      this.validatePhone();
      this.validatePassword();
      this.validateConfirmPassword();
      
      if (this.nameError || this.emailError || this.phoneError || this.passwordError || this.confirmPasswordError) {
        return;
      }

      const userData = {
        username: this.name,
        email: this.email,
        password: this.password,
        phone: this.phone,
      };

      try {
        const response = await axios.post('http://localhost:8080/api/auth/signup', userData);
        console.log('User registered successfully:', response.data);
        this.signupSuccess = true;
        this.signupError = '';
        this.signupSuccessMessage = response.data.message;
      } catch (error) {
        console.error('Error during signup:', error.response ? error.response.data : error);
        this.signupError = error.response ? error.response.data.message : 'An unexpected error occurred.';
        this.signupSuccess = false;
      }
    },
  },
  watch: {
    name() {
      this.validateName();
    },
    email() {
      this.validateEmail();
    },
    phone() {
      this.validatePhone();
    },
    password() {
      this.validatePassword();
    },
    confirmPassword() {
      this.validateConfirmPassword();
    },
  },
};
</script>