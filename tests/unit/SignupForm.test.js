import { mount } from "@vue/test-utils";
import SignupForm from "../../src/components/Auth/Signup.vue"; // Adjust the path as needed
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("SignupForm.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(SignupForm);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders the signup form correctly", () => {
    expect(wrapper.find("h1").text()).toBe("Sign Up");
    expect(wrapper.find("form").exists()).toBe(true);
  });

  it("shows validation errors for empty required fields", async () => {
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.nameError).toBe(true);
    expect(wrapper.vm.emailError).toBe(true);
    expect(wrapper.vm.phoneError).toBe(true);
    expect(wrapper.vm.passwordError).toBe(true);
    expect(wrapper.vm.confirmPasswordError).toBe(true);

    expect(wrapper.find("p.text-red-500").exists()).toBe(true); // Check if error messages exist
  });

  it("validates invalid email format", async () => {
    await wrapper.find("input#email").setValue("invalidemail");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.emailError).toBe(true);
    expect(wrapper.vm.emailErrorMessage).toBe("Please enter a valid email.");
  });

  it("validates invalid phone number format", async () => {
    await wrapper.find("input#phone").setValue("123");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.phoneError).toBe(true);
    expect(wrapper.vm.phoneErrorMessage).toBe("Please enter a valid phone number.");
  });

  it("validates mismatched passwords", async () => {
    await wrapper.find("input#password").setValue("password123");
    await wrapper.find("input#confirmPassword").setValue("differentPassword");
    await wrapper.find("form").trigger("submit.prevent");

    expect(wrapper.vm.confirmPasswordError).toBe(true);
    expect(wrapper.vm.confirmPasswordErrorMessage).toBe("Passwords do not match.");
  });

  it("allows submission with valid input", async () => {
    const userData = {
      username: "John Doe",
      email: "john@example.com",
      password: "password123",
      phone: "1234567890",
    };

    // Mock API response
    axios.post.mockResolvedValueOnce({
      data: { message: "User registered successfully!" },
    });

    // Fill form fields
    await wrapper.find("input#name").setValue(userData.username);
    await wrapper.find("input#email").setValue(userData.email);
    await wrapper.find("input#phone").setValue(userData.phone);
    await wrapper.find("input#password").setValue(userData.password);
    await wrapper.find("input#confirmPassword").setValue(userData.password);

    // Submit form
    await wrapper.find("form").trigger("submit.prevent");

    // Assert API call and success message
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/signup",
      userData
    );
    expect(wrapper.vm.signupSuccess).toBe(true);
    expect(wrapper.vm.signupSuccessMessage).toBe("User registered successfully!");
    expect(wrapper.find("div.text-green-700").text()).toBe("User registered successfully!");
  });

  it("handles API error during submission", async () => {
    const errorMessage = "Email already in use.";

    // Mock API rejection
    axios.post.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    // Fill form fields with valid data
    await wrapper.find("input#name").setValue("John Doe");
    await wrapper.find("input#email").setValue("john@example.com");
    await wrapper.find("input#phone").setValue("1234567890");
    await wrapper.find("input#password").setValue("password123");
    await wrapper.find("input#confirmPassword").setValue("password123");

    // Submit form
    await wrapper.find("form").trigger("submit.prevent");

    // Assert error message
    expect(wrapper.vm.signupError).toBe(errorMessage);
    expect(wrapper.find("div.text-red-700").text()).toBe(errorMessage);
  });
});