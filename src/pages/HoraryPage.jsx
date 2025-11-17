import { BtnAddHorary } from "../components/ui/BtnAddHorary";
import { useHoraryStore } from "../store/HoraryStore";
import { ModalHorary } from "../components/ModalHorary";

export const HoraryPage = () => {
    const { modalHoraryState } = useHoraryStore();
  return (
    <section className="h-full flex flex-col">
      {modalHoraryState && <ModalHorary />}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Horarios</h1>
          <p className="text-sm text-slate-500">
            Define y administra los horarios de atención de los profesionales.
          </p>
        </div>
        <BtnAddHorary />
      </header>
      <main className="flex-1 overflow-auto">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Especialidad</th>
                <th className="px-4 py-3 text-left">Fecha</th>
                <th className="px-4 py-3 text-left">Hora inicial</th>
                <th className="px-4 py-3 text-left">Hora final</th>
                <th className="px-4 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Aquí se listarán los horarios cuando estén disponibles */}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};
