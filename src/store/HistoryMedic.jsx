import { create } from "zustand";

export const useHistoryMedicStore = create((set)=>({
   modalHistoryMedicState: false,
   setModalHistoryMedicState: (state) => set({modalHistoryMedicState: state}),
   
   agregarHistoriaMedica: async (historiaMedica, token) => {
      const response = await fetch("https://3t0p4dvn-8080.brs.devtunnels.ms/api/medical-histories", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify(historiaMedica),
      });
      const data = await response.json();
      if (!response.ok) {
         throw new Error(data.message || `Error ${response.status}`);
      }
      return data;
   },
   
}))