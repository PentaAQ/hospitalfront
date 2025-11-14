import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,

      login: async (p) => {
        const response = await fetch("https://3t0p4dvn-8080.brs.devtunnels.ms/api/auth/login", {
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

        set({ user: data });

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
