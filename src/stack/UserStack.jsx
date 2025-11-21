import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/AuthStore";
import { useUserStore } from "../store/UserStore";
import { toast } from "sonner";

export const useMostrarUsuariosQuery = () => {
  const { mostrarUsuarios } = useUserStore();
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["mostrarUsuarios"],
    queryFn: () => mostrarUsuarios(token),
  });
};

export const useAgregarUsuariosMutation = () => {
  const { agregarUsuario } = useUserStore();
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  const { setModalUserState } = useUserStore();
  return useMutation({
    mutationFn: (newUser) => agregarUsuario(newUser, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mostrarUsuarios"] });
      setModalUserState(false);
      toast.success("Usuario Añadido correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
