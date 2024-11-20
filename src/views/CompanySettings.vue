<template>
  <div class="flex h-screen">
    <SidebarComponent />

    <div class="flex-1 p-6 bg-gray-100">
      <h1 class="text-3xl text-center font-bold mb-6 text-gray-800">User Management</h1>

      <div v-if="successMessage" class="mb-4 p-3 text-center text-green-700 bg-green-100 border border-green-400 rounded">
        {{ successMessage }}
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="py-3 px-4 text-left font-medium">ID</th>
              <th class="py-3 px-4 text-left font-medium">Username</th>
              <th class="py-3 px-4 text-left font-medium">Email</th>
              <th class="py-3 px-4 text-left font-medium">Phone</th>
              <th class="py-3 px-4 text-left font-medium">Verified</th>
              <th class="py-3 px-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody class="text-gray-700">
            <tr
              v-for="(user, index) in users"
              :key="user.id"
              :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'">
              <td class="py-3 px-4 border-b">{{ user.id }}</td>
              <td class="py-3 px-4 border-b">{{ user.username }}</td>
              <td class="py-3 px-4 border-b">{{ user.email }}</td>
              <td class="py-3 px-4 border-b">{{ user.phone }}</td>
              <td class="py-3 px-4 border-b">
                <span :class="user.verified ? 'text-green-500' : 'text-red-500'">
                  {{ user.verified ? 'Yes' : 'No' }}
                </span>
              </td>
              <td class="py-3 px-4 border-b">
                <button
                  @click="openModal(user)"
                  class="bg-blue-500 text-white px-5 py-1 text-[12px] rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  @click="createOutlookSignature(user)"
                  class="bg-teal-500 text-white px-5 py-1 text-[12px] rounded-lg hover:bg-teal-600 ml-2 focus:outline-none"
                >
                  Signature
                </button>
                <button
                  @click="openPhoneModal(user)"
                  class="bg-green-500 text-white px-5 py-1 text-[12px] rounded-lg hover:bg-green-600 ml-2 focus:outline-none"
                >
                  Phone
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closeModal"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl font-semibold mb-4">Edit User</h2>

          <form @submit.prevent="updateUser">
            <div class="flex gap-2">
              <div class="mb-4 w-full">
                <label for="username" class="block text-lg font-semibold">Username</label>
                <input
                  v-model="selectedUser.username"
                  type="text"
                  id="username"
                  class="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder="Enter Username" disabled
                />
              </div>

              <div class="mb-4 w-full">
                <label for="email" class="block text-lg font-semibold">Email</label>
                <input
                  v-model="selectedUser.email"
                  type="email"
                  id="email"
                  class="w-full p-2 border border-gray-300 rounded mt-2"
                  placeholder="Enter Email" disabled
                />
              </div>
            </div>

            <div class="mb-4">
              <label for="companyName" class="block text-lg font-semibold">Company Name</label>
              <input
                v-model="selectedUser.companyName"
                type="text"
                id="companyName"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter Company Name"
              />
            </div>

            <div class="mb-4">
              <label for="missionStatement" class="block text-lg font-semibold">Mission Statement</label>
              <textarea
                v-model="selectedUser.missionStatement"
                id="missionStatement"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter Mission Statement"
                rows="3"
              ></textarea>
            </div>

            <div class="mb-4">
              <label for="companyAddress" class="block text-lg font-semibold">Company Address</label>
              <input
                v-model="selectedUser.companyAddress"
                type="text"
                id="companyAddress"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter Company Address"
              />
            </div>

            <div class="mb-4">
              <label for="companySite" class="block text-lg font-semibold">Company Website</label>
              <input
                v-model="selectedUser.companySite"
                type="url"
                id="companySite"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter Company Website"
              />
            </div>

            <div class="mb-4">
              <label for="userTitle" class="block text-lg font-semibold">User Title</label>
              <input
                v-model="selectedUser.userTitle"
                type="text"
                id="userTitle"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter User Title"
              />
            </div>

            <div class="mb-4">
              <button type="submit" class="w-full bg-teal-500 text-white p-2 rounded-lg hover:bg-teal-600">
                Save Changes
              </button>
            </div>
          </form>

          <button @click="closeModal" class="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
      </div>
      <div
        v-if="showPhoneModal"
        class="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
        @click.self="closePhoneModal"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 class="text-2xl font-semibold mb-4">Update Phone Number</h2>

          <form @submit.prevent="updatePhoneNumber">
            <div class="mb-4">
              <label for="phone" class="block text-lg font-semibold">New Phone Number</label>
              <input
                v-model="newPhoneNumber"
                type="tel"
                id="phone"
                class="w-full p-2 border border-gray-300 rounded mt-2"
                placeholder="Enter New Phone Number"
              />
            </div>

            <div class="mb-4 flex justify-between gap-2">
              <button
                type="submit"
                class="bg-teal-500 text-white px-6 py-2 text-lg rounded-lg hover:bg-teal-600"
              >
                Update
              </button>
              <button
                @click="closePhoneModal"
                class="bg-gray-500 text-white px-6 py-2 text-lg rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SidebarComponent from "../components/Sidebar.vue";

export default {
  name: "UserManagement",
  components: {
    SidebarComponent,
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      newPhoneNumber: "",
      successMessage: "",
      showModal: false,
      showPhoneModal: false,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data)
        this.users =  response.data instanceof Array ? response.data : [response.data];
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },

    openModal(user) {
      this.selectedUser = { ...user };
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    openPhoneModal(user) {
      this.selectedUser = user;
      this.newPhoneNumber = user.phone;
      this.showPhoneModal = true;
    },

    closePhoneModal() {
      this.showPhoneModal = false;
    },

    async updateUser() {
      try {
        const token = localStorage.getItem("token");
        const updateData = {
          companyName: this.selectedUser.companyName,
          missionStatement: this.selectedUser.missionStatement,
        };
        await axios.put(
          `http://localhost:8080/api/v1/update-company-info?userId=${this.selectedUser.id}`,
          updateData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const index = this.users.findIndex((u) => u.id === this.selectedUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.selectedUser };
        }
        this.successMessage = "User updated successfully!";
        setTimeout(() => { this.successMessage = ""; }, 3000);
        this.closeModal();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },

    async updatePhoneNumber() {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          `http://localhost:8080/api/v1/update-phone?userId=${this.selectedUser.id}`,
          { phone: this.newPhoneNumber },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const index = this.users.findIndex((user) => user.id === this.selectedUser.id);
        if (index !== -1) {
          this.users[index].phone = this.newPhoneNumber;
        }
        this.successMessage = "Phone number updated successfully!";
        setTimeout(() => { this.successMessage = ""; }, 3000);
        this.closePhoneModal();
      } catch (error) {
        console.error("Error updating phone number:", error);
      }
    },

    createOutlookSignature(user) {
      window.open("https://outlook.office.com/mail/options/accounts-category/signatures-subcategory", "_blank");
      const userDetails = `
        ${user.username}
        ${user.userTitle}
        ${user.email}
        ${user.phone}
        ${user.companyName}
        ${user.companyAddress}
        ${user.companySite}
        ${user.companyAddress}
      `;
      navigator.clipboard.writeText(userDetails).then(() => {
        this.successMessage = "User details copied to clipboard!";
        setTimeout(() => {
          this.successMessage = "";
        }, 5000);
      }).catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>