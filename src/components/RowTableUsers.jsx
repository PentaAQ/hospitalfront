import { Icon } from "@iconify/react";

export const RowTableUsers = ({user}) => {

  return (
    <tr>
      <td className="p-2 text-center">{user.nombre}</td>
      <td className="p-2 text-center">{user.apellido}</td>
      <td className="p-2 text-center">{user.dni}</td>
      <td className="p-2 text-center">{user.role}</td>
      <td className="p-2 flex gap-2 justify-center">
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
