import { create } from "zustand";
const baseURL = import.meta.env.VITE_BASE_URL;


export const useHistoryMedicStore = create((set) => ({
  modalHistoryMedicState: false,
  setModalHistoryMedicState: (state) => set({ modalHistoryMedicState: state }),

  mostrarHistoriasMedicas: async (token) => {
    const response = await fetch(`${baseURL}/api/medical-histories`, {
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

  agregarHistoriaMedica: async (historiaMedica, token) => {
    const response = await fetch(`${baseURL}/api/medical-histories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(historiaMedica),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    return data;
  },
}));
