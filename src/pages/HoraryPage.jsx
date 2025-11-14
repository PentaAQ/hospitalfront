import { BtnAddHorary } from "../components/ui/BtnAddHorary";
import { useHoraryStore } from "../store/HoraryStore";
import { ModalHorary } from "../components/ModalHorary";

export const HoraryPage = () => {
    const { modalHoraryState } = useHoraryStore();
  return (
    <section>
      {modalHoraryState && <ModalHorary />}
      <header className="flex justify-between items-center p-4 border-b-2 border-gray-300">
        <h1 className="text-2xl font-semibold">Horarios</h1>
        <BtnAddHorary />
      </header>
      <main className="p-4">
        <table className="w-full">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Especialidad</th>
              <th>Fecha</th>
              <th>Hora Inicial</th>
              <th>Hora Final</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
      </main>
    </section>
  );
};
