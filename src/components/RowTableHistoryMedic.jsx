import { Icon } from "@iconify/react";

export const RowTableHistoryMedic = ({ historiaMedica }) => {
  return (
    <tr>
      <td className="p-2 text-center">{historiaMedica.id}</td>
      <td className="p-2 text-center">{historiaMedica.patient.dni}</td>
      <td className="p-2 text-center">{historiaMedica.status? "✅" : "❌"}</td>
      <td className="p-2 text-center">{historiaMedica.createdAt}</td>
      <td className="p-2 text-center">{historiaMedica.updatedAt}</td>
      <td className="p-2 text-center">
        <button className="bg-cyan-500 text-white p-2 rounded-md hover:bg-cyan-600 transition-colors duration-300 ease-in-out cursor-pointer">
          <Icon icon="tabler:pencil" width="24" height="24" />
        </button>
        <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out cursor-pointer">
          <Icon icon="gg:trash" width="24" height="24" />
        </button>
      </td>
    </tr>
  );
};
