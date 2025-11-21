import { BtnAddConsultory } from "../components/ui/BtnAddConsultory";
import { useConsultoryStore } from "../store/ConsultoryStore";
import { useObtenerConsultoriosQuery } from "../stack/ConsultoryStack";
import { RowTableConsultory } from "../components/rows/RowTableConsultory";
import { ModalConsultory } from "../components/modals/ModalConsultory";

export const ConsultoryPage = () => {
    const { modalConsultoryState } = useConsultoryStore();
    const { data: consultorios } = useObtenerConsultoriosQuery();
    console.log(consultorios);
    
  return (
    <section className="h-full flex flex-col">
      {modalConsultoryState && <ModalConsultory />}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Consultorios</h1>
          <p className="text-sm text-slate-500">
            Administra los consultorios disponibles en el hospital.
          </p>
        </div>
        <BtnAddConsultory />
      </header>
      <main className="flex-1 overflow-auto">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-center">ID</th>
                <th className="px-4 py-3 text-center">Nombre</th>
                <th className="px-4 py-3 text-center">Ubicación</th>
                <th className="px-4 py-3 text-center">Piso</th>
                <th className="px-4 py-3 text-center">Número de consultorio</th>
                <th className="px-4 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {consultorios?.map((consultory) => (
                <RowTableConsultory key={consultory.id} consultory={consultory} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};
