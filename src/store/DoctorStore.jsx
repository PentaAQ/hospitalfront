import { create } from "zustand";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useDoctorStore = create((set) => ({
  obtenerTodosLosDoctores: async (token) => {
    const response = await fetch(`${baseURL}/api/doctors`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    return data;
  },
}));
