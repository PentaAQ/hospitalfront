import { useEspecilitiesStore } from "../store/EspecilitiesStore";
import { useMostrarEspecilitiesQuery } from "../stack/EspecilitiesStack";
import { ModalEspecialities } from "../components/modals/ModalEspecialities";
import { RowTableEspecialities } from "../components/rows/RowTableEspecialities";
import { BtnAddEspecilities } from "../components/ui/BtnAddEspecilities";

export const EspecialitiesPage = () => {
  const { modalEspecilities } = useEspecilitiesStore();
  const { data } = useMostrarEspecilitiesQuery();
  return (
    <section className="h-full flex flex-col">
      {modalEspecilities && <ModalEspecialities />}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Especialidades</h1>
          <p className="text-sm text-slate-500">
            Administra las especialidades médicas disponibles en el hospital.
          </p>
        </div>
        <BtnAddEspecilities />
      </header>
      <main className="flex-1 overflow-auto">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-center">Nombre</th>
                <th className="px-4 py-3 text-center">Descripción</th>
                <th className="px-4 py-3 text-center">Costo / Consulta</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.map((especialidad) => (
                <RowTableEspecialities
                  key={especialidad.id}
                  especialidad={especialidad}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};
