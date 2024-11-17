import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:5000/api/users";

export const useUserStore = create((set) => ({
  users: [],
  user: null,
  error: null,
  isUserLoading: false,
  isBlocking: false,
  isDeleting: false,
  
  getAllUsers: async (searchKey, nameOrder, lastLoginOrder, limit = 10, page = 1) => {
    set({ isUserLoading: true, error: null });   
    try {
      const res = await axios.get(`${API_URL}`, {
        params: {
          searchKey,
          nameOrder,
          lastLoginOrder,
          limit,
          page,
        },
      });
      const { users, pagination } = res.data;
  
      set({
        users,
        isUserLoading: false,
        pagination,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch users",
        isUserLoading: false,
      });
      console.error("Error fetching users:", error);
    }
  },
  // Function to get a user by ID
  getUserById: async (userId) => {
    set({ isUserLoading: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/${userId}`);
      set({ user: res.data.user, isUserLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch user",
        isUserLoading: false,
      });
      console.error(error);
    }
  },

  // Function to block/unblock users in bulk
  blockUnblockInBulk: async (userIds, newStatus) => {
    set({ isBlocking: true, error: null });
    try {
      const res = await axios.patch(`${API_URL}/block-toggle`, {
        userIds,
        newStatus,
      });
      set({ isBlocking: false });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to block/unblock users",
        isBlocking: false,
      });
      toast.error(error.message);
      console.error(error);
    }
  },

  // Function to delete users in bulk
  deleteInBulk: async (userIds) => {
    set({ isDeleting: true, error: null });
    try {
      const res = await axios.delete(`${API_URL}/delete`, {
        data: { userIds },
      });
      set({ isDeleting: false });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete users",
        isDeleting: false,
      });
      console.error(error);
    }
  },

  // Function to block/unblock a user by ID
  blockById: async (userId, newStatus) => {
    set({ isBlocking: true, error: null });
    try {
      const res = await axios.patch(`${API_URL}/${userId}/block`, {
        status: newStatus,
      });
      set({ isBlocking: false });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to block user",
        isBlocking: false,
      });
      console.error(error);
    }
  },

  // Function to delete a user by ID
  deleteById: async (userId) => {
    set({ isDeleting: true, error: null });
    try {
      const res = await axios.delete(`${API_URL}/${userId}`);
      set({ isDeleting: false });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete user",
        isDeleting: false,
      });
      console.error(error);
    }
  },
}));
