import { useMutation, useQuery } from "@tanstack/react-query";
import { usePayStore } from "../store/PayStore";
import { useAuthStore } from "../store/AuthStore";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const useAgregarPayMutation = () => {
    const { setModalPayState,agregarPay } = usePayStore();
    const { token } = useAuthStore();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (pay) => agregarPay(token,pay),
        onSuccess: () => {
            toast.success("Pago Añadido correctamente");
            setModalPayState(false);
            queryClient.invalidateQueries({ queryKey: ["obtenerTodosLosPagos"] });
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const obtenerTodosLosPagosQuery = () => {
    const { obtenerTodosLosPagos } = usePayStore();
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ["obtenerTodosLosPagos"],
        queryFn: () => obtenerTodosLosPagos(token),
    });
};