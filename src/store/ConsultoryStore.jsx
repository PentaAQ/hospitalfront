import { create } from "zustand";
const baseURL = import.meta.env.VITE_BASE_URL;
export const useConsultoryStore = create((set) => ({
  modalConsultoryState: false,
  setModalConsultoryState: (modal) => set({ modalConsultoryState: modal }),

  obtenerConsultorios: async (token) => {
    const response = await fetch(`${baseURL}/api/offices`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    let data = null;
    const text = await response.text();

    if (text) {
      data = JSON.parse(text);
    }

    return data;
  },

  agregarConsultorio: async (token, consultorio) => {
    const response = await fetch(`${baseURL}/api/offices`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(consultorio),
    });
    let data = null;
    const text = await response.text();

    if (text) {
      data = JSON.parse(text);
    }

    return data;
  },
}));
