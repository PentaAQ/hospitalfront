import { useForm } from "react-hook-form";
import { useUserStore } from "../store/UserStore";
import { useMostrarEspecilitiesQuery } from "../stack/EspecilitiesStack";
import { useAgregarUsuariosMutation } from "../stack/UserStack";

export const ModalUser = () => {
  const { register, handleSubmit, watch } = useForm();
  const { setModalUserState } = useUserStore();
  const role = watch("role");

  const { data: specialties } = useMostrarEspecilitiesQuery();
  const { mutate } = useAgregarUsuariosMutation();

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center"
        onClick={() => setModalUserState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <p className="text-xl font-semibold text-slate-900">Agregar usuario</p>
            <button
              type="button"
              onClick={() => setModalUserState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cerrar
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="nombre" className="text-sm font-medium text-slate-700">
                  Nombre
                </label>
                <input
                  {...register("name", {
                    required: "El nombre es requerido",
                  })}
                  type="text"
                  id="name"
                  placeholder="Ejm: Juan"
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="apellido" className="text-sm font-medium text-slate-700">
                  Apellido
                </label>
                <input
                  {...register("lastname", {
                    required: "El apellido es requerido",
                  })}
                  type="text"
                  id="lastname"
                  placeholder="Ejm: Pérez"
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="dni" className="text-sm font-medium text-slate-700">
                  DNI
                </label>
                <input
                  {...register("dni", {
                    required: "El DNI es requerido",
                  })}
                  type="text"
                  id="dni"
                  placeholder="Ejm: 12345678"
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-slate-700">
                  Contraseña
                </label>
                <input
                  {...register("password", {
                    required: "La contraseña es requerida",
                  })}
                  type="password"
                  id="password"
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="role" className="text-sm font-medium text-slate-700">
                  Rol
                </label>
                <select
                  {...register("role", {
                    required: "El rol es requerido",
                  })}
                  id="role"
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="">Seleccione un rol</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="DOCTOR">DOCTOR</option>
                  <option value="RECEPCIONISTA">RECEPCIONISTA</option>
                </select>
              </div>
            </div>

            {role === "DOCTOR" && (
              <div className="flex flex-col gap-1">
                <label htmlFor="specialtyIds" className="text-sm font-medium text-slate-700">
                  Especialidades
                </label>
                <select
                  {...register("specialtyIds", {
                    required: "Seleccione al menos una especialidad",
                  })}
                  id="specialtyIds"
                  multiple
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 h-full max-h-32"
                >
                  {specialties?.map((especialidad) => (
                    <option
                      key={especialidad.id}
                      value={especialidad.id}
                      className="text-black"
                    >
                      {especialidad.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalUserState(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Guardar usuario
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
