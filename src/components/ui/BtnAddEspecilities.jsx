import { useEspecilitiesStore } from "../../store/EspecilitiesStore";
import { Icon } from "@iconify/react";
export const BtnAddEspecilities = () => {
  const { setModalEspecilities } = useEspecilitiesStore();
  return (
    <button
      className="h-fit w-fitt py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-300 ease-in-out cursor-pointer px-2 flex items-center gap-2 font-medium"
      onClick={() => setModalEspecilities(true)}
    >
      <Icon icon="fluent-mdl2:circle-addition" width="20" height="20" />
      <span>Agregar Especialidad</span>
    </button>
  );
};
