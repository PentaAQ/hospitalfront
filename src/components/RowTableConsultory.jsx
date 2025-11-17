export const RowTableConsultory = ({ consultory }) => {
  return (
    <tr>
      <td className="px-4 py-3 align-middle text-center">{consultory.id}</td>
      <td className="px-4 py-3 align-middle text-center">{consultory.name}</td>
      <td className="px-4 py-3 align-middle text-center">{consultory.address}</td>
      <td className="px-4 py-3 align-middle text-center">{consultory.floor}</td>
      <td className="px-4 py-3 align-middle text-center">{consultory.officeNumber}</td>
      <td className="px-4 py-3 text-center align-middle">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            consultory.status
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {consultory.status ? "Activo" : "Inactivo"}
        </span>
      </td>
      {/* <td>{consultory.specialtyIds}</td> */}
    </tr>
  );
};
