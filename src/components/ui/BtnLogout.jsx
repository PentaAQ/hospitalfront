import { useAuthStore } from "../../store/AuthStore";
import { Icon } from "@iconify/react";

export const BtnLogout = () => {
  const { cerrarSesion } = useAuthStore();
  return (
    <button
      className="h-fit w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out cursor-pointer flex items-center gap-2 justify-center"
      onClick={cerrarSesion}
    >
      <Icon icon="majesticons:logout" width="24" height="24" />
      <span className="max-lg:hidden">Cerrar Sesion</span>
    </button>
  );
};
