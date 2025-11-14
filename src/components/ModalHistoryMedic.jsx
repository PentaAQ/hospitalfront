import { useHistoryMedicStore } from "../store/HistoryMedic";
import { useForm } from "react-hook-form";
import { useObtenerUsuarioQuery } from "../stack/UserStack";
import { useAgregarHistoriaMedicaMutation } from "../stack/HistoryMedicStack";

export const ModalHistoryMedic = () => {
  const { setModalHistoryMedicState } = useHistoryMedicStore();
  const { register, handleSubmit } = useForm();
  const { data: user } = useObtenerUsuarioQuery();
  const { mutate } = useAgregarHistoriaMedicaMutation();
  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <div className="">
      <div
        className="inset-0 fixed bg-black/80 flex items-center justify-center"
        onClick={() => setModalHistoryMedicState(false)}
      ></div>
      <div className="bg-white p-4 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="max-w-md mx-auto p-4 space-y-4">
          <h1 className="text-2xl font-semibold">Nuevo Registro</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="patientDni" className="text-lg">
                DNI Paciente
              </label>
              <input
                type="text"
                id="patientDni"
                className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
                {...register("patientDni")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="employeeId" className="text-lg">
                ID Empleado
              </label>
              <input
                type="text"
                id="employeeId"
                className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
                {...register("employeeId")}
                value={user?.id}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="talla" className="text-lg">
                Talla
              </label>
              <input
                type="text"
                id="talla"
                className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
                {...register("talla")}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="peso" className="text-lg">
                Peso
              </label>
              <input
                type="text"
                id="peso"
                className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
                {...register("peso")}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
