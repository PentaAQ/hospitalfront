import { usePacientStore } from "../../store/PacientStore";
import { Icon } from "@iconify/react";

export const BtnAddPacient = () => {
  const { setModalPacientState } = usePacientStore();
  return (
    <button
      onClick={() => setModalPacientState(true)}
      className="h-fit w-fit py-2 px-4 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-300 ease-in-out cursor-pointer flex items-center gap-2"
    >
      <Icon icon="fluent-mdl2:circle-addition" width="20" height="20" />

      <span>Agregar Paciente</span>
    </button>
  );
};
