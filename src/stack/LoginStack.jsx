import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";

export const useLoginMutate = () => {
  const { login } = useAuthStore();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (p) => login(p),
    onSuccess: () => {
      toast.success("Bienvenido, Administrador");
    },
    onError: () => {
      toast.error("Credenciales incorrectas");
    },
  });
};
