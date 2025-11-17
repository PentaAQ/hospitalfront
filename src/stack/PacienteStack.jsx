import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePacientStore } from "../store/PacientStore";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";

export const useMostrarPacientesQuery = () => {
  const { mostrarPacientes } = usePacientStore();
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["mostrarPacientes"],
    queryFn: () => mostrarPacientes(token),
    onSuccess: () => {
      toast.success("Pacientes Cargados correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAgregarPacienteMutation = () => {
  const { agregarPaciente,setModalPacientState } = usePacientStore();
  const queryClient = useQueryClient();
  const { token } = useAuthStore();
  return useMutation({
    mutationFn: (paciente) => agregarPaciente(paciente, token),
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

export const useObtenerPacientePorDNIQuery = (dni) => {
  const { obtenerPacientePorDNI } = usePacientStore();
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["obtenerPacientePorDNI", dni],
    queryFn: () => obtenerPacientePorDNI(dni, token),
    enabled: !!dni,
  });
};
