import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtencionesStore } from "../store/AttentionStore";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";

export const useMostrarAtencionesQuery = () => {
  const { mostrarAtenciones } = useAtencionesStore();
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["mostrarAtenciones"],
    queryFn: () => mostrarAtenciones(token),
  });
};

export const useCrearAtencionMutation = () => {
  const { crearAtencion, setModalAttentionState } = useAtencionesStore();
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attention) => crearAtencion(attention, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mostrarAtenciones"], refetchType: "active" });
      setModalAttentionState(false);
      toast.success("Atención médica registrada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useBuscarAtencionPorIdQuery = (id, options = {}) => {
  const { buscarAtencionPorId } = useAtencionesStore();
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ["buscarAtencionPorId", id],
    queryFn: () => buscarAtencionPorId(id, token),
    enabled: !!id,
    ...options,
  });
};
