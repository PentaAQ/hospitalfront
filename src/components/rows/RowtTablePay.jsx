export const RowtTablePay = ({ pay }) => {
  return (
    <tr>
      <td className="px-4 py-3 align-middle text-center">{pay.id}</td>
      <td className="px-4 py-3 align-middle text-center">
        {pay.medicalAppointment.patient.dni}
      </td>
      <td className="px-4 py-3 align-middle text-center">{pay.totalAmount}</td>
      <td className="px-4 py-3 align-middle text-center">
        {pay.paymentMethod}
      </td>
      <td className="px-4 py-3 align-middle text-center">{pay.createdAt}</td>
      <td
        className={`px-4 py-3 align-middle text-center ${
          pay.status === "PENDIENTE"
            ? "text-yellow-500"
            : pay.status === "PAGADO"
            ? "text-green-500"
            : pay.status === "ANULADO"
            ? "text-gray-500"
            : "text-red-500"
        }`}
      >
        {pay.status}
      </td>
    </tr>
  );
};
