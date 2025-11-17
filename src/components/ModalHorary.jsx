import { useMostrarEspecilitiesQuery } from "../stack/EspecilitiesStack";
import { useHoraryStore } from "../store/HoraryStore";
import { useForm } from "react-hook-form";

export const ModalHorary = () => {
  const { setModalHoraryState } = useHoraryStore();
  const { data: especialidades } = useMostrarEspecilitiesQuery();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center"
        onClick={() => setModalHoraryState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Nuevo horario</h2>
            <button
              type="button"
              onClick={() => setModalHoraryState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cerrar
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="flex flex-col gap-1">
              <label htmlFor="especialidad" className="text-sm font-medium text-slate-700">
                Especialidad
              </label>
              <select
                id="especialidad"
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                {...register("especialidad")}
              >
                {especialidades?.map((especialidad) => (
                  <option key={especialidad.id} value={especialidad.id}>
                    {especialidad.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="doctor" className="text-sm font-medium text-slate-700">
                Doctor
              </label>
              <select
                id="doctor"
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                {...register("doctor")}
              >
                <option value="">Seleccione un doctor</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalHoraryState(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Guardar horario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
