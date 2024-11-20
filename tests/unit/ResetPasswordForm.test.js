import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import ResetPasswordForm from "../../src/components/Auth/ResetPassword.vue";

describe("ResetPasswordForm.vue", () => {
  it("renders the reset password form correctly", () => {
    const wrapper = mount(ResetPasswordForm);

    expect(wrapper.find("h1").text()).toBe("Reset Password");
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("button[type='submit']").text()).toBe("Reset Password");
  });

  it("shows validation error for an invalid email", async () => {
    const wrapper = mount(ResetPasswordForm);

    await wrapper.find("input#email").setValue("invalidemail");
    await wrapper.vm.validateEmail();

    expect(wrapper.vm.emailError).toBe(true);
    expect(wrapper.find("p.text-red-500").text()).toBe("Please enter a valid email.");
  });

  it("shows validation error for an empty email", async () => {
    const wrapper = mount(ResetPasswordForm);

    await wrapper.find("input#email").setValue("");
    await wrapper.vm.validateEmail();

    expect(wrapper.vm.emailError).toBe(true);
    expect(wrapper.find("p.text-red-500").text()).toBe("Email is required.");
  });

  it("accepts a valid email and allows submission", async () => {
    const logSpy = vi.spyOn(console, "log"); // Spy on console.log first
  
    const wrapper = mount(ResetPasswordForm);
  
    await wrapper.find("input#email").setValue("test@example.com");
    await wrapper.find("form").trigger("submit.prevent"); // Trigger the form submission
  
    // Ensure no validation errors
    expect(wrapper.vm.emailError).toBe(false);
    expect(wrapper.find("p.text-red-500").exists()).toBe(false);
  
    // Ensure the logSpy captured the correct log
    expect(logSpy).toHaveBeenCalledWith("Reset password request for email:", "test@example.com");
  
    logSpy.mockRestore(); // Clean up the spy after the test
  });

  it("disables the submit button if the email is invalid", async () => {
    const wrapper = mount(ResetPasswordForm);

    await wrapper.find("input#email").setValue("invalidemail");
    expect(wrapper.find("button[type='submit']").attributes("disabled")).toBeDefined();

    await wrapper.find("input#email").setValue("test@example.com");
    expect(wrapper.find("button[type='submit']").attributes("disabled")).toBeUndefined();
  });
});