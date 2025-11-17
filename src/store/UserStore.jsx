import { create } from "zustand";
const baseURL = import.meta.env.VITE_BASE_URL;

export const useUserStore = create((set) => ({
  modalUserState: false,
  setModalUserState: (state) => set({ modalUserState: state }),

  mostrarUsuarios: async (token) => {
    const response = await fetch(`${baseURL}/api/users`, {
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

  agregarUsuario: async (user, token) => {
    const response = await fetch(`${baseURL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    return data;
  },
}));
