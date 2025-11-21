import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHistoryMedicStore } from "../store/HistoryMedic";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";

export const useAgregarHistoriaMedicaMutation = () => {
  const { agregarHistoriaMedica } = useHistoryMedicStore();
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const { setModalHistoryMedicState } = useHistoryMedicStore();
  return useMutation({
    mutationFn: (newHistory) => agregarHistoriaMedica(newHistory, token),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["mostrarHistoriasMedicas"],
        refetchType: "active",
      });
      setModalHistoryMedicState(false);
      toast.success("Historia médica añadida correctamente");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};

export const useMostrarHistoriasMedicasQuery = () => {
  const { mostrarHistoriasMedicas } = useHistoryMedicStore();
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["mostrarHistoriasMedicas"],
    queryFn: () => mostrarHistoriasMedicas(token),

  });
};
