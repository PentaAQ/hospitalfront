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
    <div className="">
      <div
        className="inset-0 fixed bg-black/80 flex items-center justify-center"
        onClick={() => setModalHoraryState(false)}
      ></div>
      <div className="bg-white p-4 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h2 className="text-2xl font-semibold">ModalHorary</h2>
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div>
            <label htmlFor="especialidad">Especialidad</label>
            <select name="especialidad" id="especialidad">
              {especialidades?.map((especialidad) => (
                <option key={especialidad.id} value={especialidad.id}>
                  {especialidad.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="doctor">Doctor</label>
            <select name="doctor" id="doctor">
              <option value="">Seleccione un doctor</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};
