import { create } from "zustand";

export const useHoraryStore = create((set) => ({
    modalHoraryState: false,
    setModalHoraryState: (modal) => set({ modalHoraryState: modal }),
}));