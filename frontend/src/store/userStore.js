import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
axios.defaults.withCredentials = true;
const API_URL = import.meta.env.MODE ==='development' ?  "http://localhost:5000/api/users" :'/api/users';

export const useUserStore = create((set,get) => ({
  users: [],
  user: null,
  error: null,
  isUserLoading: false,
  isBlocking: false,
  isDeleting: false,
  pagination: {},
  searchKey: "",
  nameOrder: null,
  lastLoginOrder: null,
  page:1,

  getAllUsers: async (
    newSearchKey,
    newNameOrder,
    newLastLoginOrder,
    newPage
  ) => {
    const state = get();
    const searchKey = newSearchKey ?? state.searchKey;
    const nameOrder = newNameOrder ?? state.nameOrder;
    const lastLoginOrder = newLastLoginOrder ?? state.lastLoginOrder;
    const page = newPage ?? state.page;
    set({
        isUserLoading: true,
        error: null,
        searchKey,
        nameOrder,
        lastLoginOrder,
        page,
      });
    try {
      const res = await axios.get(`${API_URL}`, {
        params: {
          searchKey,
          nameOrder,
          lastLoginOrder,
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
      toast.error(error.data.message);
    }
  },

  // Function to block/unblock users in bulk
  blockUnblockInBulk: async (userIds, status) => {
    set({ isBlocking: true, error: null });
    try {
      const res = await axios.put(`${API_URL}/block-many`, {
        userIds,
        status,
      });
      set({ isBlocking: false });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to block/unblock users",
        isBlocking: false,
      });
      toast.error(error.data.message);
      console.error(error);
    }
  },

  // Function to delete users in bulk
  deleteInBulk: async (userIds) => {
    set({ isDeleting: true, error: null });
    try {
      const res = await axios.put(`${API_URL}/delete-many`, { userIds });
      set({ isDeleting: false });
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete users",
        isDeleting: false,
      });
      toast.error(error.data.message);
      console.error(error);
    }
  },

  // Function to block/unblock a user by ID
  blockById: async (userId) => {
    try {
      const res = await axios.put(`${API_URL}/block/${userId}`);
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to block user",
      });
      toast.error(error.data.message);
    }
  },

  // Function to delete a user by ID
  deleteById: async (userId) => {
    try {
      const res = await axios.put(`${API_URL}/delete/${userId}`);
      toast.success(res.data.message);
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete user",
      });
      toast.error(error.data.message);
      console.error(error);
    }
  },
}));
