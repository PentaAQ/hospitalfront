import { Icon } from "@iconify/react";
import { usePayStore } from "../../store/PayStore";

export const BtnAddPay = () => {
  const { setModalPayState } = usePayStore();
  return (
    <button
      onClick={() => setModalPayState(true)}
      className="h-fit w-fit py-2 px-3 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition-colors duration-200 cursor-pointer flex items-center gap-2 text-sm font-medium"
    >
      <Icon icon="fluent-mdl2:circle-addition" width="20" height="20" />
      <span>Agregar pago</span>
    </button>
  );
};
