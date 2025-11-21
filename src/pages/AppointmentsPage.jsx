import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Stethoscope,
  MapPin,
  CreditCard,
  FileText,
  Filter,
} from "lucide-react";
import { useAppointmentsStore } from "../store/AppointmentsStore";
import { ModalAppointments } from "../components/modals/ModalAppointments";
import { BtnAddAppointments } from "../components/ui/BtnAddAppointments";
import { useObtenerTodasLasCitasQuery } from "../stack/AppointmentsStack";
import { useAppointmentsCalendar } from "../hooks/useAppointmentsCalendar";


export const AppointmentsPage = () => {
  const { modalAppointmentState } = useAppointmentsStore();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [showFilters, setShowFilters] = useState(false);

  const { data: mockAppointments } = useObtenerTodasLasCitasQuery();
  const {
    currentDate,
    days,
    today,
    monthNames,
    dayNames,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getAppointmentsForDate,
  } = useAppointmentsCalendar(mockAppointments, filterStatus);

  // Estilos por estado
  const statusStyles = {
    PENDIENTE: "bg-yellow-100 border-yellow-300 text-yellow-800",
    COMPLETADO: "bg-green-100 border-green-300 text-green-800",
    CANCELADO: "bg-red-100 border-red-300 text-red-800",
    NOASISTIO: "bg-gray-100 border-gray-300 text-gray-800",
  };

  const statusLabels = {
    PENDIENTE: "Pendiente",
    COMPLETADO: "Completado",
    CANCELADO: "Cancelado",
    NOASISTIO: "No asistió",
  };

  const statusBadgeStyles = {
    PENDIENTE: "bg-yellow-100 text-yellow-800",
    COMPLETADO: "bg-green-100 text-green-800",
    CANCELADO: "bg-red-100 text-red-800",
    NOASISTIO: "bg-gray-100 text-gray-800",
  };

  // Colores por especialidad para el borde izquierdo
  const specialtyBorderColors = {
    Cardiología: "border-l-red-500",
    Pediatría: "border-l-blue-500",
    Neurología: "border-l-purple-500",
  };

  return (
    <section className="h-full flex flex-col bg-slate-50">
      {modalAppointmentState && <ModalAppointments />}
      {/* Header */}
      <header className="flex flex-col gap-4 bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Citas médicas
            </h1>
            <p className="text-sm text-slate-500">
              Gestiona y visualiza las citas programadas de los pacientes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filtros
            </button>
            <BtnAddAppointments />
          </div>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-sm font-medium text-slate-700">Estado:</span>
            {["ALL", "PENDIENTE", "COMPLETADO", "CANCELADO", "NOASISTIO"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    filterStatus === status
                      ? "bg-blue-600 text-white"
                      : "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {status === "ALL" ? "Todos" : statusLabels[status]}
                </button>
              )
            )}
          </div>
        )}

        {/* Navegación del calendario */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Hoy
            </button>
            <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="px-4 py-2 text-sm font-medium text-slate-900 border-x border-slate-300 min-w-[140px] text-center">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>

          {/* Leyenda */}
          <div className="flex items-center gap-4 text-xs">
            {Object.entries(statusLabels).map(([status, label]) => (
              <div key={status} className="flex items-center gap-1.5">
                <div
                  className={`w-3 h-3 rounded ${statusBadgeStyles[status]}`}
                />
                <span className="text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Calendar Grid */}
      <main className="flex-1 overflow-auto p-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
            {dayNames.map((day) => (
              <div
                key={day}
                className="px-3 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 divide-x divide-y divide-slate-200">
            {days.map((day, index) => {
              const appointments = getAppointmentsForDate(day.date);
              const isToday = day.date.toDateString() === today;

              return (
                <div
                  key={index}
                  className={`h-[90px] overflow-y-auto p-2 ${
                    !day.isCurrentMonth ? "bg-slate-50" : "bg-white"
                  } hover:bg-slate-50 transition-colors`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        !day.isCurrentMonth
                          ? "text-slate-400"
                          : isToday
                          ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs"
                          : "text-slate-700"
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                    {appointments?.length > 0 && (
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {appointments.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1">
                    {appointments?.slice(0, 3).map((appointment) => (
                      <button
                        key={appointment.id}
                        onClick={() => setSelectedAppointment(appointment)}
                        className={`w-full text-left px-2 py-1.5 rounded border-l-4 text-xs ${
                          statusStyles[appointment.status]
                        } ${
                          specialtyBorderColors[
                            appointment.schedule.specialty.name
                          ] || "border-l-gray-500"
                        } hover:opacity-80 transition-opacity`}
                      >
                        <div className="font-medium truncate text-xs">
                          {appointment.schedule.startTime.slice(0, 5)} -{" "}
                          {appointment.patient.name}{" "}
                          {appointment.patient.lastname}
                        </div>
                        <div className="text-xs truncate opacity-75">
                          Dr. {appointment.schedule.doctor.lastname}
                        </div>
                      </button>
                    ))}
                    {appointments?.length > 3 && (
                      <div className="text-xs text-center text-slate-500 py-1">
                        +{appointments.length - 3} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Modal de detalles */}
      {selectedAppointment && (
        <div
          className="fixed inset-0 bg-gray-900/80 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedAppointment(null)}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Detalles de la cita
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Cita #{selectedAppointment.id}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusBadgeStyles[selectedAppointment.status]
                    }`}
                  >
                    {statusLabels[selectedAppointment.status]}
                  </span>
                  <button
                    onClick={() => setSelectedAppointment(null)}
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Paciente */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg col-span-2">
                  <User className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">
                      Paciente
                    </div>
                    <div className="text-lg font-semibold text-slate-900">
                      {selectedAppointment.patient.name}{" "}
                      {selectedAppointment.patient.lastname}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-slate-600">
                      <div>
                        <span className="font-medium">DNI:</span>{" "}
                        {selectedAppointment.patient.dni}
                      </div>
                      <div>
                        <span className="font-medium">Teléfono:</span>{" "}
                        {selectedAppointment.patient.phone}
                      </div>
                      <div>
                        <span className="font-medium">Género:</span>{" "}
                        {selectedAppointment.patient.gender}
                      </div>
                      <div>
                        <span className="font-medium">Nacimiento:</span>{" "}
                        {new Date(
                          selectedAppointment.patient.birthdate
                        ).toLocaleDateString("es-ES")}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Dirección:</span>{" "}
                        {selectedAppointment.patient.address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">
                      Doctor
                    </div>
                    <div className="text-base font-semibold text-slate-900">
                      Dr. {selectedAppointment.schedule.doctor.name}{" "}
                      {selectedAppointment.schedule.doctor.lastname}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      <div>DNI: {selectedAppointment.schedule.doctor.dni}</div>
                      <div>
                        Código: {selectedAppointment.schedule.doctor.codigo}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Especialidad */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <FileText className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">
                      Especialidad
                    </div>
                    <div className="text-base font-semibold text-slate-900">
                      {selectedAppointment.schedule.specialty.name}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {selectedAppointment.schedule.specialty.description}
                    </div>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <Clock className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">
                      Horario
                    </div>
                    <div className="text-base font-semibold text-slate-900">
                      {new Date(
                        selectedAppointment.schedule.date
                      ).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {selectedAppointment.schedule.startTime.slice(0, 5)} -{" "}
                      {selectedAppointment.schedule.endTime.slice(0, 5)}
                    </div>
                  </div>
                </div>

                {/* Consultorio */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">
                      Consultorio
                    </div>
                    <div className="text-base font-semibold text-slate-900">
                      {selectedAppointment.schedule.office.name} - #
                      {selectedAppointment.schedule.office.officeNumber}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      <div>{selectedAppointment.schedule.office.address}</div>
                      <div>
                        Piso {selectedAppointment.schedule.office.floor}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Costo */}
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                  <CreditCard className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-green-700">
                      Costo final
                    </div>
                    <div className="text-2xl font-bold text-green-900">
                      S/ {selectedAppointment.finalCost.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Empleado que registró */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <User className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">
                      Registrado por
                    </div>
                    <div className="text-base font-semibold text-slate-900">
                      {selectedAppointment.employee.name}{" "}
                      {selectedAppointment.employee.lastname}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {selectedAppointment.employee.role}
                    </div>
                  </div>
                </div>

                {/* Fecha de solicitud */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg col-span-2">
                  <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">
                      Fecha de solicitud
                    </div>
                    <div className="text-base text-slate-900">
                      {new Date(
                        selectedAppointment.solicitationDateTime
                      ).toLocaleString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedAppointment(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cerrar
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                  Editar cita
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
