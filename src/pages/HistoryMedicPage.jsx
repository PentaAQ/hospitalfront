import { ModalHistoryMedic } from "../components/modals/ModalHistoryMedic";
import { BtnAddHistoryMedic } from "../components/ui/BtnAddHistoryMedic";
import { useHistoryMedicStore } from "../store/HistoryMedic";
import { useMostrarHistoriasMedicasQuery } from "../stack/HistoryMedicStack";
import { RowTableHistoryMedic } from "../components/rows/RowTableHistoryMedic";

export const HistoryMedicPage = () => {
  const { modalHistoryMedicState } = useHistoryMedicStore();
  const { data } = useMostrarHistoriasMedicasQuery();

  return (
    <section className="h-full flex flex-col">
      {modalHistoryMedicState && <ModalHistoryMedic />}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Historias médicas</h1>
          <p className="text-sm text-slate-500">
            Registra y consulta la información clínica de los pacientes.
          </p>
        </div>
        <BtnAddHistoryMedic />
      </header>
      <main className="flex-1 overflow-auto">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-center">ID</th>
                <th className="px-4 py-3 text-center">DNI del paciente</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-center">Fecha de creación</th>
                <th className="px-4 py-3 text-center">Fecha de actualización</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.map((historiaMedica) => (
                <RowTableHistoryMedic
                  key={historiaMedica.id}
                  historiaMedica={historiaMedica}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};
