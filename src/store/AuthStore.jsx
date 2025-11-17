import { create } from "zustand";
import { persist } from "zustand/middleware";


const baseURL = import.meta.env.VITE_BASE_URL;

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token:null,

      login: async (p) => {
        const response = await fetch(`${baseURL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(p),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || `Error ${response.status}`);
        }

        if (!data.accessToken) {
          throw new Error("Token no recibido");
        }

        set({ user: data.employee, token: data.accessToken });

        return data;
      },

      cerrarSesion: async () => {
        set({ user: null });
      },
    }),
    {
      name: "user",
    }
  )
);
