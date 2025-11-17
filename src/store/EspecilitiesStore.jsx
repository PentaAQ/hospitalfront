import { create } from "zustand";
const baseURL = import.meta.env.VITE_BASE_URL;

export const useEspecilitiesStore = create((set) => ({
  mostrarEspecilities: async (token) => {
    const response = await fetch(`${baseURL}/api/specialties`, {
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

  agregarEspecilities: async (especialidad, token) => {
    const response = await fetch(`${baseURL}/api/specialties`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(especialidad),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    return data;
  },

  modalEspecilities: false,
  setModalEspecilities: (modal) => set({ modalEspecilities: modal }),
}));
