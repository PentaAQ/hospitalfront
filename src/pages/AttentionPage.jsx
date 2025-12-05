import { useAtencionesStore } from "../store/AttentionStore";
import { useMostrarAtencionesQuery } from "../stack/AttentionStack";
import { BtnAddAttention } from "../components/ui/BtnAddAttention";
import { ModalAttention } from "../components/modals/ModalAttention";
import { RowTableAttention } from "../components/rows/RowTableAttention";

export const AttentionPage = () => {
  const { modalAttentionState } = useAtencionesStore();
  const { data } = useMostrarAtencionesQuery();

  return (
    <section className="h-full flex flex-col">
      {modalAttentionState && <ModalAttention />}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Atenciones médicas
          </h1>
          <p className="text-sm text-slate-500">
            Registra y visualiza las atenciones realizadas a los pacientes.
          </p>
        </div>
        <BtnAddAttention />
      </header>

      <main className="flex-1 overflow-auto">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-center">ID</th>
                <th className="px-4 py-3 text-center">Paciente</th>
                <th className="px-4 py-3 text-center">Doctor</th>
                <th className="px-4 py-3 text-center">Fecha y hora</th>
                <th className="px-4 py-3 text-center">Diagnóstico</th>
                <th className="px-4 py-3 text-center">Tratamiento</th>
                <th className="px-4 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data?.map((attention) => (
                <RowTableAttention key={attention.id} attention={attention} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};
