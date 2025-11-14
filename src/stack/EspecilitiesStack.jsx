import { useEspecilitiesStore } from "../store/EspecilitiesStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";

export const useMostrarEspecilitiesQuery = () => {
  const { mostrarEspecilities } = useEspecilitiesStore();
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["mostrarEspecilities"],
    queryFn: () => mostrarEspecilities(user.accessToken),

    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useAgregarEspecilitiesMutation = () => {
   const queryClient = useQueryClient();
   const { setModalEspecilities, agregarEspecilities } = useEspecilitiesStore();
   const { user } = useAuthStore();
   return useMutation({
     mutationFn: (especialidad) =>
       agregarEspecilities(especialidad, user.accessToken),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["mostrarEspecilities"] });
       setModalEspecilities(false);
       toast.success("Especialidad Añadida correctamente");
     },
     onError: (error) => {
       toast.error(error.message);
     },
   });
 };
