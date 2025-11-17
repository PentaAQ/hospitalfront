import { create } from "zustand";
const baseURL = import.meta.env.VITE_BASE_URL;

export const usePacientStore = create((set) => ({
  modalPacientState: false,
  setModalPacientState: (state) => set({ modalPacientState: state }),

  mostrarPacientes: async (token) => {
    const response = await fetch(
      `${baseURL}/api/patients`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    return data;
  },



  agregarPaciente: async (paciente, token) => {
    const response = await fetch(
      "https://3t0p4dvn-8080.brs.devtunnels.ms/api/patients",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paciente),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    return data;
  },
}));
