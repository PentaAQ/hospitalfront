import { useMutation, useQuery } from "@tanstack/react-query";
import { useAppointmentsStore } from "../store/AppointmentsStore";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";

export const useAgregarAppointmentMutation = () => {
    const { setModalAppointmentState,agregarAppointment } = useAppointmentsStore();
    const { token } = useAuthStore();
    return useMutation({
        mutationFn: (appointment) => agregarAppointment(appointment, token),
        onSuccess: () => {
            toast.success("Cita Creada Correctamente");
            setModalAppointmentState(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
}

export const useObtenerTodasLasCitasQuery = () => {
    const { obtenerTodasLasCitas } = useAppointmentsStore();
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ["obtenerTodasLasCitas"],
        queryFn: () => obtenerTodasLasCitas(token),
    });
}