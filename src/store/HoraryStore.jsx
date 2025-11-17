import { create } from "zustand";
const baseURL = import.meta.env.VITE_BASE_URL;

export const useHoraryStore = create((set) => ({
  modalHoraryState: false,
  setModalHoraryState: (modal) => set({ modalHoraryState: modal }),

  agregarHorario: async (horario, token) => {
    const response = await fetch(`${baseURL}/api/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(horario),
    });
    const data = await response.json();
    console.log("Respuesta /api/schedules:", response.status, data);

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`);
    }
    return data;
  },
}));
