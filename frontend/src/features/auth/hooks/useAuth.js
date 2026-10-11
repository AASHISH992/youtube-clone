import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import {
  loginApi,
  registerApi,
  logoutApi,
  getCurrentUserApi,
} from "../api/auth.api.js";

function useAuth() {
  const user = useAuthStore((state) => state.user);

  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const isLoading = useAuthStore((state) => state.isLoading);

  const setUser = useAuthStore((state) => state.setUser);

  const clearUser = useAuthStore((state) => state.clearUser);

  const setLoading = useAuthStore((state) => state.setLoading);

  const [error, setError] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  async function login(credentials) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await loginApi(credentials);
      const userData = response.data?.user || response.data;
      setUser(userData);
      navigate("/");
      return { success: true };

    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);

      return { success: false, error: message };
    } finally {
      setIsSubmitting(false);
    }
  }

  async function register(formData) {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await registerApi(formData);

      navigate("/signin");
      return { success: true, data: response.data };
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed.";
      setError(message);
      return { success: false, error: message };
    } finally {
      setIsSubmitting(false);
    }
  }

  async function logout() {
    setIsSubmitting(true);

    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      clearUser();
      navigate("/signin");
      setIsSubmitting(false);
    }
  }

  async function checkAuth() {
    setIsSubmitting(true);
    try {
      const response = await getCurrentUserApi();

      setUser(response.data);
    } catch (err) {
      clearUser();
    } finally {
      setLoading(false);
    }
  }
  return {
    user,
    isLoggedIn,
    isLoading,
    setUser,
    clearUser,
    setLoading,
    isSubmitting,
    setIsSubmitting,
    error,
    setError,
    login,
    register,
    logout,
    checkAuth,
  };
}
export { useAuth };
