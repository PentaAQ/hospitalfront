import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistoryMedicStore } from "../store/HistoryMedic";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";

export const useAgregarHistoriaMedicaMutation = () => {
   const { agregarHistoriaMedica } = useHistoryMedicStore();
   const { user } = useAuthStore();
   const queryClient = useQueryClient();
   const { setModalHistoryMedicState } = useHistoryMedicStore();
   return useMutation({
      mutationFn: (newHistory) => agregarHistoriaMedica(newHistory, user.accessToken),
      onSuccess: (data) => {
         console.log(data);
         queryClient.invalidateQueries({ queryKey: ["mostrarHistoriasMedicas"] });
         setModalHistoryMedicState(false);
         toast.success("Historia médica añadida correctamente");
      },
      onError: (error) => {
         console.log(error);
         toast.error(error.message);
      },
   });
};