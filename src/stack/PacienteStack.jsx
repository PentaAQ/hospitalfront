import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePacientStore } from "../store/PacientStore";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";

export const useMostrarPacientesQuery = () => {
  const { mostrarPacientes } = usePacientStore();
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ["mostrarPacientes"],
    queryFn: () => mostrarPacientes(user.accessToken),
    onSuccess: () => {
      toast.success("Pacientes Cargados correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAgregarPacienteMutation = () => {
  const { agregarPaciente } = usePacientStore();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  return useMutation({
    mutationFn: (paciente) => agregarPaciente(paciente, user.accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mostrarPacientes"] });
      setModalPacientState(false);
      toast.success("Paciente Añadido correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
