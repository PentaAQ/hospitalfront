import { usePacientStore } from "../store/PacientStore";
import { useForm } from "react-hook-form";
import { useAgregarPacienteMutation } from "../stack/PacienteStack";

export const ModalPacient = () => {
  const { setModalPacientState } = usePacientStore();
  const { register, handleSubmit } = useForm();

  const { mutate } = useAgregarPacienteMutation();

  const onSubmit = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div>
      <div
        className="inset-0 fixed bg-black/80 flex items-center justify-center"
        onClick={() => setModalPacientState(false)}
      ></div>
      <div className="w-full max-w-[500px] bg-white rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-4">Agregar Paciente</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                {...register("dni", { required: "El dni es requerido" })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                {...register("nombre", { required: "El nombre es requerido" })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="apellido">Apellido</label>
              <input
                type="text"
                {...register("apellido", {
                  required: "El apellido es requerido",
                })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="direccion">Direccion</label>
              <input
                type="text"
                {...register("direccion", {
                  required: "La direccion es requerida",
                })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="telefono">Telefono</label>
              <input
                type="text"
                {...register("telefono", {
                  required: "El telefono es requerido",
                })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="fechaNacimiento">Fecha de Nacimiento</label>
              <input
                type="date"
                {...register("fechaNacimiento", {
                  required: "La fecha de nacimiento es requerida",
                })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="sexo">Sexo</label>
              <input
                type="text"
                {...register("sexo", { required: "El sexo es requerido" })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-cyan-500 text-white px-4 py-2 rounded-md"
              >
                Agregar
              </button>
              <button
                type="button"
                onClick={() => setModalPacientState(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
