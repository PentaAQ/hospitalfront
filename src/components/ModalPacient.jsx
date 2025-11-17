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
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                {...register("name", { required: "El nombre es requerido" })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="lastname">Apellido</label>
              <input
                type="text"
                {...register("lastname", {
                  required: "El apellido es requerido",
                })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="address">Direccion</label>
              <input
                type="email"
                {...register("address", {
                  required: "La direccion es requerida",
                })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="phone">Telefono</label>
              <input
                type="text"
                {...register("phone", {
                  required: "El telefono es requerido",
                })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="birthdate">Fecha de Nacimiento</label>
              <input
                type="date"
                {...register("birthdate", {
                  required: "La fecha de nacimiento es requerida",
                })}
                className="p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="gender">Sexo</label>
              <div className="flex flex-col space-y-2">
                <label htmlFor="male">
                  <input
                    type="radio"
                    id="male"
                    value="MASCULINO"
                    className="w-fit mr-2"
                    {...register("gender", {
                      required: "El sexo es requerido",
                    })}
                  />
                  Masculino
                </label>
                <label htmlFor="female">
                  <input
                    type="radio"
                    id="female"
                    value="FEMENINO"
                    className="w-fit mr-2"
                    {...register("gender", {
                      required: "El sexo es requerido",
                    })}
                  />
                  Femenino
                </label>
              </div>
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
