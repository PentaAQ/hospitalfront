import { useConsultoryStore } from "../store/ConsultoryStore";
import { useAuthStore } from "../store/AuthStore";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useObtenerConsultoriosQuery = () => {
    const { obtenerConsultorios } = useConsultoryStore();
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ["obtenerConsultorios"],
        queryFn: () => obtenerConsultorios(token),
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });
};

export const useAgregarConsultorioMutation = () => {
    const { setModalConsultoryState ,agregarConsultorio } = useConsultoryStore();
    const { token } = useAuthStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (consultorio) => agregarConsultorio(token, consultorio),
        onSuccess: (data) => {
            console.log(data);
            setModalConsultoryState(false);
            queryClient.invalidateQueries({ queryKey: ["obtenerConsultorios"] });
            toast.success("Consultorio agregado correctamente");
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.message);
        },
    });
};
