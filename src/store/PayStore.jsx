import { create } from "zustand";

const baseURL = import.meta.env.VITE_BASE_URL;
export const usePayStore = create((set) => ({
  modalPayState: false,
  setModalPayState: (modal) => set({ modalPayState: modal }),
  agregarPay: async (token, newPay) => {
    const response = await fetch(`${baseURL}/api/receipts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPay),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }

    return data;
  },

  obtenerTodosLosPagos: async (token) => {
    const response = await fetch(`${baseURL}/api/receipts`, {
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
