import { usePacientStore } from "../../store/PacientStore";
import { useForm } from "react-hook-form";
import { useAgregarPacienteMutation } from "../../stack/PacienteStack";

export const ModalPacient = () => {
  const { setModalPacientState } = usePacientStore();
  const { register, handleSubmit } = useForm();

  const { mutate } = useAgregarPacienteMutation();

  const onSubmit = (data) => {
    mutate(data);
  };
  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center"
        onClick={() => setModalPacientState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900">Agregar paciente</h1>
            <button
              type="button"
              onClick={() => setModalPacientState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cerrar
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="dni" className="text-sm font-medium text-slate-700">DNI</label>
                <input
                  type="text"
                  id="dni"
                  {...register("dni", { required: "El DNI es requerido" })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Nombre</label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: "El nombre es requerido" })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="lastname" className="text-sm font-medium text-slate-700">Apellido</label>
                <input
                  type="text"
                  id="lastname"
                  {...register("lastname", {
                    required: "El apellido es requerido",
                  })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="address" className="text-sm font-medium text-slate-700">Dirección</label>
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
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">Teléfono</label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", {
                    required: "El teléfono es requerido",
                  })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="birthdate" className="text-sm font-medium text-slate-700">Fecha de nacimiento</label>
                <input
                  type="date"
                  id="birthdate"
                  {...register("birthdate", {
                    required: "La fecha de nacimiento es requerida",
                  })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">Sexo</span>
              <div className="flex gap-4 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    value="MASCULINO"
                    className="h-4 w-4 text-cyan-600 border-slate-300"
                    {...register("gender", {
                      required: "El sexo es requerido",
                    })}
                  />
                  <span>Masculino</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    value="FEMENINO"
                    className="h-4 w-4 text-cyan-600 border-slate-300"
                    {...register("gender", {
                      required: "El sexo es requerido",
                    })}
                  />
                  <span>Femenino</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalPacientState(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Guardar paciente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
