import { create } from "zustand";

const baseURL = import.meta.env.VITE_BASE_URL;

export const useAtencionesStore = create((set) => ({
  modalAttentionState: false,
  setModalAttentionState: (state) => set({ modalAttentionState: state }),

  mostrarAtenciones: async (token) => {
    const response = await fetch(`${baseURL}/api/medical-attention`, {
      method: "GET",
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

  crearAtencion: async (attention, token) => {
    const response = await fetch(`${baseURL}/api/medical-attention`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(attention),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    return data;
  },

  buscarAtencionPorId: async (id, token) => {
    const response = await fetch(`${baseURL}/api/medical-attention/${id}`, {
      method: "GET",
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
