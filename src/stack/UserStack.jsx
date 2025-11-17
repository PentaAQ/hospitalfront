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
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAgregarUsuariosMutation = () => {
  const { agregarUsuario } = useUserStore();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { setModalUserState } = useUserStore();
  return useMutation({
    mutationFn: (newUser) => agregarUsuario(newUser, user.accessToken),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["mostrarUsuarios"] });
      setModalUserState(false);
      toast.success("Usuario Añadido correctamente");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
};
