import { ModalHistoryMedic } from "../components/ModalHistoryMedic";
import { BtnAddHistoryMedic } from "../components/ui/BtnAddHistoryMedic";
import { useHistoryMedicStore } from "../store/HistoryMedic";
import { useMostrarHistoriasMedicasQuery } from "../stack/HistoryMedicStack";
import { RowTableHistoryMedic } from "../components/RowTableHistoryMedic";

export const HistoryMedicPage = () => {
  const { modalHistoryMedicState } = useHistoryMedicStore();
  const { data } = useMostrarHistoriasMedicasQuery();

  
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
              <th className="p-2 text-center">ID</th>
              <th className="p-2 text-center">DNI del Paciente</th>
              <th className="p-2 text-center">Estado</th>
              <th className="p-2 text-center">Fecha de Creacion</th>
              <th className="p-2 text-center">Fecha de Actualizacion</th>
              <th className="p-2 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((historiaMedica) => (
              <RowTableHistoryMedic
                key={historiaMedica.id}
                historiaMedica={historiaMedica}
              />
            ))}
          </tbody>
        </table>
      </main>
    </section>
  );
};
