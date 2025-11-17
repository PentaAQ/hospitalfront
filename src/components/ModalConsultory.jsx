import { useConsultoryStore } from "../store/ConsultoryStore";
import { useMostrarEspecilitiesQuery } from "../stack/EspecilitiesStack";
import { useForm } from "react-hook-form";
import { useAgregarConsultorioMutation } from "../stack/ConsultoryStack";

export const ModalConsultory = () => {
  const { setModalConsultoryState } = useConsultoryStore();
  const { data: especialidades } = useMostrarEspecilitiesQuery();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      status: true,
    },
  });
  const { mutate } = useAgregarConsultorioMutation();

  const onSubmit = (formData) => {
    const payload = {
      name: formData.name,
      address: formData.address,
      floor: formData.floor ? Number(formData.floor) : undefined,
      officeNumber: formData.officeNumber || undefined,
      status: formData.status ?? true,
      specialtyIds: Array.isArray(formData.specialtyIds)
        ? formData.specialtyIds.map((id) => Number(id))
        : [],
    };
    console.log(payload);
    mutate(payload);
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center"
        onClick={() => setModalConsultoryState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900">
              Nuevo consultorio
            </h1>
            <button
              type="button"
              onClick={() => setModalConsultoryState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cerrar
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Nombre del consultorio
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "El nombre es requerido" })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-slate-700"
                >
                  Ubicación
                </label>
                <input
                  type="text"
                  id="address"
                  {...register("address", {
                    required: "La dirección es requerida",
                  })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="floor"
                  className="text-sm font-medium text-slate-700"
                >
                  Piso (opcional)
                </label>
                <input
                  type="number"
                  id="floor"
                  {...register("floor")}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="officeNumber"
                  className="text-sm font-medium text-slate-700"
                >
                  Número de consultorio (opcional)
                </label>
                <input
                  type="text"
                  id="officeNumber"
                  {...register("officeNumber")}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">
                Estado
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-cyan-600 border-slate-300 rounded"
                  {...register("status")}
                />
                <span>Activo</span>
              </label>
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="specialtyIds"
                className="text-sm font-medium text-slate-700"
              >
                Especialidades asignadas
              </label>
              <select
                id="specialtyIds"
                multiple
                {...register("specialtyIds", {
                  required: "Debe seleccionar al menos una especialidad",
                })}
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 min-h-[120px]"
              >
                {especialidades?.map((especialidad) => (
                  <option key={especialidad.id} value={especialidad.id}>
                    {especialidad.name}
                  </option>
                ))}
              </select>
              <span className="text-xs text-slate-400">
                Mantenga presionada la tecla Ctrl (Cmd en Mac) para seleccionar
                múltiples especialidades.
              </span>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalConsultoryState(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Guardar consultorio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
