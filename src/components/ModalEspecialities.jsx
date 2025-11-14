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
        className="inset-0 fixed bg-black/80 flex items-center justify-center"
        onClick={() => setModalEspecilities(false)}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg w-full max-w-md space-y-4">
        <p className="text-2xl font-semibold">Agregar Especialidad</p>
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
              placeholder="Ejm: Cardiologia"
              className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="descripcion" className="w-fit">
              Descripcion
            </label>
            <textarea
              {...register("descripcion", {
                required: "La descripcion es requerida",
              })}
              name="descripcion"
              id="descripcion"
              placeholder="Ejm: Especialidad de medicina"
              className="border-2 p-2 rounded-md outline-cyan-300 border-gray-300"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalEspecilities(false)}
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
