import { create } from "zustand";

const baseURL = import.meta.env.VITE_BASE_URL;
export const useAppointmentsStore = create((set) => ({
    modalAppointmentState: false,
    setModalAppointmentState: (state) => set({ modalAppointmentState: state }),
    

    agregarAppointment: async(appointment,token) => {
        const response = await fetch(`${baseURL}/api/appointments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(appointment),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `Error ${response.status}`);
        }

        return data;
    },

    obtenerTodasLasCitas: async(token) => {
        const response = await fetch(`${baseURL}/api/appointments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `Error ${response.status}`);
        }

        return data;
    },
}))