import { useAuthStore } from "../../store/AuthStore";

export const BtnLogout = () => {
    const {cerrarSesion} = useAuthStore();
  return (
    <button className="h-fit w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 ease-in-out cursor-pointer" onClick={cerrarSesion}>
      <span>Cerrar Sesion</span>
    </button>
  );
};
