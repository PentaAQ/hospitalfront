import { ModalEspecialities } from "../components/ModalEspecialities";
import { RowTableEspecialities } from "../components/RowTableEspecialities";
import { BtnAddEspecilities } from "../components/ui/BtnAddEspecilities";
import { useEspecilitiesStore } from "../store/EspecilitiesStore";
import { useMostrarEspecilitiesQuery } from "../stack/EspecilitiesStack";

export const EspecialitiesPage = () => {
  const { modalEspecilities } = useEspecilitiesStore();
  const { data } = useMostrarEspecilitiesQuery();
  return (
    <section className="h-screen bg-white text-black">
      {modalEspecilities && <ModalEspecialities />}
      <header className="flex justify-between items-center p-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-semibold">Especialidades</h1>
        <BtnAddEspecilities />
      </header>
      <main className="p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((especialidad) => (
              <RowTableEspecialities
                key={especialidad.id}
                especialidad={especialidad}
              />
            ))}
          </tbody>
        </table>
      </main>
    </section>
  );
};
