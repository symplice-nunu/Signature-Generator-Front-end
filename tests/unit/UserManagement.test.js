import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import axios from "axios";
import UserManagement from "../../src/views/CompanySettings.vue";

// Mock axios
vi.mock("axios");

describe("UserManagement Component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(UserManagement);
  });

  it("fetches users on mount", async () => {
    const mockUsers = [
      { id: 1, username: "john_doe", email: "john@example.com", phone: "123456789", verified: true },
    ];

    // Mock the axios response
    axios.get.mockResolvedValue({ data: mockUsers });

    await wrapper.vm.fetchUsers();
    expect(wrapper.vm.users).toEqual(mockUsers);
  });

  it("displays user data in the table", async () => {
    wrapper.setData({
      users: [
        { id: 1, username: "john_doe", email: "john@example.com", phone: "123456789", verified: true },
      ],
    });

    await wrapper.vm.$nextTick();

    const rows = wrapper.findAll("tbody tr");
    expect(rows.length).toBe(1);
    expect(rows[0].text()).toContain("john_doe");
    expect(rows[0].text()).toContain("john@example.com");
  });

  it("opens and closes the edit modal", async () => {
    const user = { id: 1, username: "john_doe", email: "john@example.com" };

    wrapper.vm.openModal(user);
    expect(wrapper.vm.showModal).toBe(true);
    expect(wrapper.vm.selectedUser).toEqual(user);

    wrapper.vm.closeModal();
    expect(wrapper.vm.showModal).toBe(false);
  });

  it("updates user information", async () => {
    const user = { id: 1, username: "john_doe", email: "john@example.com", companyName: "Old Name" };
    const updatedData = { companyName: "New Name", missionStatement: "New Mission" };

    wrapper.setData({
      users: [user],
      selectedUser: { ...user, ...updatedData },
    });

    // Mock axios response
    axios.put.mockResolvedValue({});

    await wrapper.vm.updateUser();

    expect(wrapper.vm.users[0].companyName).toBe("New Name");
  });

  it("handles phone number update", async () => {
    const user = { id: 1, phone: "123456789" };
    const newPhone = "987654321";

    wrapper.setData({
      users: [user],
      selectedUser: user,
      newPhoneNumber: newPhone,
    });

    // Mock axios response
    axios.put.mockResolvedValue({});

    await wrapper.vm.updatePhoneNumber();

    expect(wrapper.vm.users[0].phone).toBe(newPhone);
    expect(wrapper.vm.successMessage).toBe("Phone number updated successfully!");
  });
});