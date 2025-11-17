import { usePacientStore } from "../store/PacientStore";
import { ModalPacient } from "../components/ModalPacient";
import { BtnAddPacient } from "../components/ui/BtnAddPacient";
import { useMostrarPacientesQuery } from "../stack/PacienteStack";
import { RowTablePacients } from "../components/RowTablePacients";

export const PacientPage = () => {
  const { modalPacientState } = usePacientStore();
  const { data: pacientes } = useMostrarPacientesQuery();
  return (
    <section>
      {modalPacientState && <ModalPacient />}
      <header className="flex justify-between items-center p-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-semibold">Lista de Pacientes</h1>
        <BtnAddPacient />
      </header>
      <main className="p-4">
        <table>
          <thead>
            <tr>
              <th className="p-2 text-center">DNI</th>
              <th className="p-2 text-center">Nombre</th>
              <th className="p-2 text-center">Apellido</th>
              <th className="p-2 text-center">Direccion</th>
              <th className="p-2 text-center">Telefono</th>
              <th className="p-2 text-center">Fecha de Nacimiento</th>
              <th className="p-2 text-center">Sexo</th>
              <th className="p-2 text-center">Estado</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes?.map((paciente) => (
              <RowTablePacients key={paciente.dni} paciente={paciente} />
            ))}
          </tbody>
        </table>
      </main>
    </section>
  );
};
