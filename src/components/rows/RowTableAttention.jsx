import { Icon } from "@iconify/react";

export const RowTableAttention = ({ attention }) => {
  const patient = attention.appointment?.patient;
  const doctor = attention.doctor;

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-4 py-3 text-center align-middle">{attention.id}</td>
      <td className="px-4 py-3 text-center align-middle">
        {patient
          ? `${patient.name} ${patient.lastname} (${patient.dni})`
          : "-"}
      </td>
      <td className="px-4 py-3 text-center align-middle">
        {doctor ? `Dr. ${doctor.name} ${doctor.lastname}` : "-"}
      </td>
      <td className="px-4 py-3 text-center align-middle">
        {attention.attentionDateTime
          ? new Date(attention.attentionDateTime).toLocaleString("es-ES")
          : "-"}
      </td>
      <td className="px-4 py-3 text-center align-middle max-w-xs truncate">
        {attention.diagnosis}
      </td>
      <td className="px-4 py-3 text-center align-middle max-w-xs truncate">
        {attention.treatment}
      </td>
      <td className="px-4 py-3 text-center align-middle">
        <div className="inline-flex items-center gap-2">
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 hover:bg-cyan-100 transition-colors">
            <Icon icon="tabler:eye" width="18" height="18" />
          </button>
          <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors">
            <Icon icon="gg:trash" width="16" height="16" />
          </button>
        </div>
      </td>
    </tr>
  );
};
