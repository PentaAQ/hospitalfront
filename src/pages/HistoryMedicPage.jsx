import { ModalHistoryMedic } from "../components/ModalHistoryMedic";
import { BtnAddHistoryMedic } from "../components/ui/BtnAddHistoryMedic";
import { useHistoryMedicStore } from "../store/HistoryMedic";

export const HistoryMedicPage = () => {
  const { modalHistoryMedicState } = useHistoryMedicStore();
  return (
    <section>
      {modalHistoryMedicState && <ModalHistoryMedic />}
      <header className="flex justify-between items-center p-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-semibold">Historias Medicas</h1>
        <BtnAddHistoryMedic />
      </header>
      <main>
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
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </main>
    </section>
  );
};
