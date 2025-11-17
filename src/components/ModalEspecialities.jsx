import { useAgregarEspecilitiesMutation } from "../stack/EspecilitiesStack";
import { useEspecilitiesStore } from "../store/EspecilitiesStore";
import { useForm } from "react-hook-form";

export const ModalEspecialities = () => {
  const { setModalEspecilities } = useEspecilitiesStore();

  const { register, handleSubmit } = useForm();

  const { mutate } = useAgregarEspecilitiesMutation();
  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center"
        onClick={() => setModalEspecilities(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-xl font-semibold text-slate-900">Agregar especialidad</p>
            <button
              type="button"
              onClick={() => setModalEspecilities(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cerrar
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Nombre
              </label>
              <input
                {...register("name", {
                  required: "El nombre es requerido",
                })}
                type="text"
                id="name"
                placeholder="Ejm: Cardiología"
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="description" className="text-sm font-medium text-slate-700">
                Descripción
              </label>
              <textarea
                {...register("description", {
                  required: "La descripción es requerida",
                })}
                id="description"
                placeholder="Ejm: Especialidad de medicina"
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 min-h-24"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cost" className="text-sm font-medium text-slate-700">
                Costo
              </label>
              <input
                {...register("cost", {
                  required: "El costo es requerido",
                })}
                type="number"
                id="cost"
                placeholder="Ejm: 100"
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalEspecilities(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Guardar especialidad
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
