import { Clock, MapPin, Stethoscope, User } from "lucide-react";

// Modal de detalles de un horario médico.
export const HoraryScheduleDetails = ({ schedule, onClose }) => {
  if (!schedule) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500/90 bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-900">
              Detalles del horario
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <User className="w-5 h-5 text-slate-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-500">
                  Doctor
                </div>
                <div className="text-base font-semibold text-slate-900">
                  Dr. {schedule.doctor.name} {schedule.doctor.lastname}
                </div>
                <div className="text-sm text-slate-600">
                  DNI: {schedule.doctor.dni} | Código: {schedule.doctor.codigo}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <Stethoscope className="w-5 h-5 text-slate-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-500">
                  Especialidad
                </div>
                <div className="text-base font-semibold text-slate-900">
                  {schedule.specialty.name}
                </div>
                <div className="text-sm text-slate-600">
                  {schedule.specialty.description}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <Clock className="w-5 h-5 text-slate-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-500">
                  Horario
                </div>
                <div className="text-base font-semibold text-slate-900">
                  {new Date(schedule.date).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="text-sm text-slate-600">
                  {schedule.startTime.slice(0, 5)} - {schedule.endTime.slice(0, 5)}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-500">
                  Consultorio
                </div>
                <div className="text-base font-semibold text-slate-900">
                  {schedule.office.name} - #{schedule.office.officeNumber}
                </div>
                <div className="text-sm text-slate-600">
                  {schedule.office.address} - Piso {schedule.office.floor}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <User className="w-5 h-5 text-slate-600 mt-0.5" />
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-500">
                  Asistente
                </div>
                <div className="text-base font-semibold text-slate-900">
                  {schedule.employee.name} {schedule.employee.lastname}
                </div>
                <div className="text-sm text-slate-600">
                  {schedule.employee.role} | DNI: {schedule.employee.dni}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-sm font-medium text-slate-700">Estado</span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  schedule.status
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {schedule.status ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
