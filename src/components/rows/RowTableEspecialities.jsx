import { Icon } from "@iconify/react";
import {
  useDesabilitarEspecilitiesMutation,
  useHabilitarEspecilitiesMutation,
} from "../../stack/EspecilitiesStack";

export const RowTableEspecialities = ({ especialidad }) => {
  const { mutate: desabilitar } = useDesabilitarEspecilitiesMutation();
  const { mutate: habilitar } = useHabilitarEspecilitiesMutation();
  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 align-middle text-center">{especialidad.name}</td>
      <td className="px-4 py-3 align-middle text-center">{especialidad.description}</td>
      <td className="px-4 py-3 align-middle text-center">S/ {especialidad.cost}</td>
      <td
        className="px-4 py-3 text-center align-middle cursor-pointer"
        onClick={() =>
          especialidad.status
            ? desabilitar(especialidad.id)
            : habilitar(especialidad.id)
        }
      >
        <span 
          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
            especialidad.status
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {especialidad.status ? "Activo" : "Inactivo"}
        </span>
      </td>
      <td className="px-4 py-3 text-center align-middle">
        <div className="inline-flex items-center gap-2">
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition-colors">
            <Icon icon="tabler:pencil" width="18" height="18" />
          </button>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700 hover:bg-rose-200 transition-colors">
            <Icon icon="gg:trash" width="16" height="16" />
          </button>
        </div>
      </td>
    </tr>
  );
};
