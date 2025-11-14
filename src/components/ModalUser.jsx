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
        className="inset-0 fixed bg-black/80 flex items-center justify-center"
        onClick={() => setModalUserState(false)}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-full max-w-md space-y-4">
        <p className="text-2xl font-semibold">Agregar Usuario</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nombre" className="w-fit">
              Nombre
            </label>
            <input
              {...register("nombre", {
                required: "El nombre es requerido",
              })}
              type="text"
              name="nombre"
              id="nombre"
              placeholder="Ejm: Juan"
              className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="apellido" className="w-fit">
              Apellido
            </label>
            <input
              {...register("apellido", {
                required: "El apellido es requerido",
              })}
              type="text"
              name="apellido"
              id="apellido"
              placeholder="Ejm: Pérez"
              className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="dni" className="w-fit">
              DNI
            </label>
            <input
              {...register("dni", {
                required: "El DNI es requerido",
              })}
              type="text"
              name="dni"
              id="dni"
              placeholder="Ejm: 12345678"
              className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="w-fit">
              Contraseña
            </label>
            <input
              {...register("password", {
                required: "La contraseña es requerida",
              })}
              type="password"
              name="password"
              id="password"
              className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="role" className="w-fit">
              Rol
            </label>
            <select
              {...register("role", {
                required: "El rol es requerido",
              })}
              name="role"
              id="role"
              className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
            >
              <option value="">Seleccione un rol</option>
              <option value="ADMIN">ADMIN</option>
              <option value="DOCTOR">DOCTOR</option>
              <option value="RECEPCIONISTA">RECEPCIONISTA</option>
            </select>
          </div>

          {role === "DOCTOR" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="specialtyIds" className="w-fit">
                Especialidades
              </label>
              <select
                {...register("specialtyIds", {
                  required: "Seleccione al menos una especialidad",
                })}
                name="specialtyIds"
                id="specialtyIds"
                multiple
                className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300 h-full max-h-20"
              >
                {specialties?.map((especialidad) => (
                  <option
                    key={especialidad.id}
                    value={especialidad.id}
                    className="text-black"
                  >
                    {especialidad.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalUserState(false)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
