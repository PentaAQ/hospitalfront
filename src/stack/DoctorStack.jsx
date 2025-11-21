import { useQuery } from "@tanstack/react-query";
import { useDoctorStore } from "../store/DoctorStore";
import { useAuthStore } from "../store/AuthStore";

export const useObtenerTodosLosDoctoresQuery = () => {
  const { obtenerTodosLosDoctores } = useDoctorStore();
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["obtenerTodosLosDoctores"],
    queryFn: () => obtenerTodosLosDoctores(token),

  });
};
