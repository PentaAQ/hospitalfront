import { useHoraryStore } from "../store/HoraryStore";
import { useAuthStore } from "../store/AuthStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAgregarHorarioMutation = () => {
    const { setModalHoraryState,agregarHorario } = useHoraryStore();
    const { token } = useAuthStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (horario) => agregarHorario(horario, token),
        onSuccess: () => {
            setModalHoraryState(false);
            queryClient.invalidateQueries({ queryKey: ["mostrarHorarios"] });
            toast.success("Horario agregado correctamente");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useObtenerTodosLosHorariosQuery = () => {
    const { obtenerTodosLosHorarios } = useHoraryStore();
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ["mostrarHorarios"],
        queryFn: () => obtenerTodosLosHorarios(token),
    });
};
