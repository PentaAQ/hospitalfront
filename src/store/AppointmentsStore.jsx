import { create } from "zustand";

const base_URL = import.meta.env.VITE_BASE_URL;
export const useAppointmentsStore = create((set) => ({
    modalAppointmentState: false,
    setModalAppointmentState: (state) => set({ modalAppointmentState: state }),
    

    agregarAppointment: async(appointment,token) => {
        const response = await fetch(`${base_URL}/api/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(appointment),
        });
        const data = await response.json();
        return data;
    },

    obtenerTodasLasCitas: async(token) => {
        const response = await fetch(`${base_URL}/api/appointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await response.json();
        return data;
    },
    
}))