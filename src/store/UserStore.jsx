import { create } from "zustand";

export const useUserStore = create((set)=>({
    modalUserState: false,
    setModalUserState: (state) => set({modalUserState: state}),

    mostrarUsuarios: async (token) => {
        const response = await fetch("https://3t0p4dvn-8080.brs.devtunnels.ms/api/users", {
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

    agregarUsuario: async (user, token) => {
        const response = await fetch("https://3t0p4dvn-8080.brs.devtunnels.ms/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || `Error ${response.status}`);
        }
        return data;
    },

    obtenerUsuario: async (dni, token) => {
        const response = await fetch(`https://3t0p4dvn-8080.brs.devtunnels.ms/api/user/dni/${dni}`, {
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
}))