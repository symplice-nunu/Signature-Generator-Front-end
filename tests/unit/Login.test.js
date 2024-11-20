import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Login from "../../src/components/Auth/Login.vue";
import axios from "axios";

// Mock Axios
vi.mock("axios");

describe("Login.vue", () => {
  it("renders the login form correctly", () => {
    const wrapper = mount(Login);

    expect(wrapper.find("h1").text()).toBe("Login");
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("button[type='submit']").text()).toBe("Login");
  });

  it("shows validation errors for invalid email", async () => {
    const wrapper = mount(Login);

    await wrapper.find("input#email").setValue("invalidemail");
    await wrapper.vm.validateEmail();

    expect(wrapper.vm.emailError).toBe(true);
    expect(wrapper.find("p.text-red-500").text()).toBe("Please enter a valid email.");
  });

  it("shows validation errors for short password", async () => {
    const wrapper = mount(Login);

    await wrapper.find("input#password").setValue("123");
    await wrapper.vm.validatePassword();

    expect(wrapper.vm.passwordError).toBe(true);
    expect(wrapper.find("p.text-red-500").text()).toBe("Password must be at least 6 characters.");
  });

  it("submits the form successfully", async () => {
    const mockResponse = { data: { token: "mockToken" } };
    axios.post.mockResolvedValueOnce(mockResponse);

    const wrapper = mount(Login);

    await wrapper.find("input#email").setValue("test@example.com");
    await wrapper.find("input#password").setValue("password123");
    await wrapper.find("form").trigger("submit.prevent");

    expect(axios.post).toHaveBeenCalledWith("https://signaturegenerator.samueldev.com/api/auth/login", {
      email: "test@example.com",
      password: "password123",
    });

    expect(wrapper.vm.loginSuccess).toBe(true);
    expect(wrapper.vm.loginSuccessMessage).toBe("Login successful! Redirecting...");
  });

  it("displays an error message on failed login", async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    const wrapper = mount(Login);

    await wrapper.find("input#email").setValue("test@example.com");
    await wrapper.find("input#password").setValue("wrongpassword");
    await wrapper.find("form").trigger("submit.prevent");

    expect(axios.post).toHaveBeenCalledWith("https://signaturegenerator.samueldev.com/api/auth/login", {
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(wrapper.vm.loginError).toBe("Invalid credentials");
    expect(wrapper.find("div.text-red-700").text()).toBe("Invalid credentials");
  });
});