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

  desabilitarEspecilities: async (id, token) => {
    const response = await fetch(`${baseURL}/api/specialties/disable/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = null;
    const text = await response.text();

    if (text) {
      try {
        data = JSON.parse(text);
      } catch (e) {
        // si no es JSON válido, dejamos data en null
      }
    }

    if (!response.ok) {
      throw new Error((data && data.message) || `Error ${response.status}`);
    }

    return data;
  },

  habilitarEspecilities: async (id, token) => {
    const response = await fetch(`${baseURL}/api/specialties/enable/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = null;
    const text = await response.text();

    if (text) {
      try {
        data = JSON.parse(text);
      } catch (e) {
        // si no es JSON válido, dejamos data en null
      }
    }

    if (!response.ok) {
      throw new Error((data && data.message) || `Error ${response.status}`);
    }

    return data;
  },

  modalEspecilities: false,
  setModalEspecilities: (modal) => set({ modalEspecilities: modal }),
}));
