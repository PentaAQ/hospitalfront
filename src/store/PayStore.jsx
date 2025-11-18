import { create } from "zustand";

const base_URL = import.meta.env.VITE_BASE_URL;
export const usePayStore = create((set) => ({
  modalPayState: false,
  setModalPayState: (modal) => set({ modalPayState: modal }),
  agregarPay: async (token, newPay) => {
    const response = await fetch(`${base_URL}/api/receipts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPay),
    });
    const data = await response.json();
    console.log(data);
  },

  obtenerTodosLosPagos: async (token) => {
    const response = await fetch(`${base_URL}/api/receipts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    
    return data;
  },
}));
