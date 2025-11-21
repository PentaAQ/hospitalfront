import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppointmentsStore } from "../store/AppointmentsStore";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useAgregarAppointmentMutation = () => {
  const { setModalAppointmentState, agregarAppointment } =
    useAppointmentsStore();
  const { token } = useAuthStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (appointment) => agregarAppointment(appointment, token),
    onSuccess: () => {
      setModalAppointmentState(false);
      queryClient.invalidateQueries({
        queryKey: ["obtenerTodasLasCitas"],
      });
      toast.success("Cita Creada Correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useObtenerTodasLasCitasQuery = () => {
  const { obtenerTodasLasCitas } = useAppointmentsStore();
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["obtenerTodasLasCitas"],
    queryFn: () => obtenerTodasLasCitas(token),
  });
};
