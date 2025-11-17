import { create } from "zustand";
const baseURL = import.meta.env.VITE_BASE_URL;

export const useHoraryStore = create((set) => ({
    modalHoraryState: false,
    setModalHoraryState: (modal) => set({ modalHoraryState: modal }),
}));