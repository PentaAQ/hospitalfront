import { Icon } from "@iconify/react";

export const RowTablePacients = ({ paciente }) => {
  return (
    <tr>
      <td className="p-2 text-center">{paciente.dni}</td>
      <td className="p-2 text-center">{paciente.nombre}</td>
      <td className="p-2 text-center">{paciente.apellido}</td>
      <td className="p-2 text-center">{paciente.direccion}</td>
      <td className="p-2 text-center">{paciente.telefono}</td>
      <td className="p-2 text-center">{paciente.fechaNacimiento}</td>
      <td className="p-2 text-center">{paciente.sexo}</td>
      <td className="p-2 text-end flex gap-2">
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