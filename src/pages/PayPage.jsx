import { ModalPay } from "../components/modals/ModalPay";
import { BtnAddPay } from "../components/ui/BtnAddPay";
import { usePayStore } from "../store/PayStore";
import { useObtenerTodosLosPagosQuery } from "../stack/PayStack";
import { RowtTablePay } from "../components/rows/RowtTablePay";

export const PayPage = () => {
  const { modalPayState } = usePayStore();
  const { data: pay } = useObtenerTodosLosPagosQuery();
  return (
    <section className="h-full flex flex-col">
      {modalPayState && <ModalPay />}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Pagos</h1>
          <p className="text-sm text-slate-500">
            Administra los pagos realizados en el hospital.
          </p>
        </div>
        <BtnAddPay />
      </header>
      <main className="flex-1 overflow-auto">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-center">ID</th>
                <th className="px-4 py-3 text-center">DNI</th>
                <th className="px-4 py-3 text-center">Total</th>
                <th className="px-4 py-3 text-center">Metodo de Pago</th>
                <th className="px-4 py-3 text-center">Fecha</th>
                <th className="px-4 py-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pay?.map((pay) => (
                <RowtTablePay key={pay.id} pay={pay} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};
