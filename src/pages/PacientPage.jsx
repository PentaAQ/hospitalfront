import { usePacientStore } from "../store/PacientStore";
import { ModalPacient } from "../components/modals/ModalPacient";
import { BtnAddPacient } from "../components/ui/BtnAddPacient";
import { useMostrarPacientesQuery } from "../stack/PacienteStack";
import { RowTablePacients } from "../components/rows/RowTablePacients";

export const PacientPage = () => {
  const { modalPacientState } = usePacientStore();
  const { data: pacientes } = useMostrarPacientesQuery();
  return (
    <section className="h-full flex flex-col">
      {modalPacientState && <ModalPacient />}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Pacientes</h1>
          <p className="text-sm text-slate-500">
            Gestiona la lista de pacientes registrados en el hospital.
          </p>
        </div>
        <BtnAddPacient />
      </header>
      <main className="flex-1 overflow-auto">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">DNI</th>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Apellido</th>
                <th className="px-4 py-3 text-left">Dirección</th>
                <th className="px-4 py-3 text-left">Teléfono</th>
                <th className="px-4 py-3 text-left">Fecha de nacimiento</th>
                <th className="px-4 py-3 text-left">Sexo</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pacientes?.map((paciente) => (
                <RowTablePacients key={paciente.dni} paciente={paciente} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};
