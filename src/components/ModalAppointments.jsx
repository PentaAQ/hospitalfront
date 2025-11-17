import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/AuthStore";
import { useAppointmentsStore } from "../store/AppointmentsStore";
import { useObtenerTodosLosHorariosQuery } from "../stack/HoraryStack";
import { useMostrarPacientesQuery } from "../stack/PacienteStack";
import { useAgregarAppointmentMutation } from "../stack/AppointmentsStack";
// import { useMostrarHorariosQuery } from "../stack/HoraryStack";
// import { useMostrarPacientesQuery } from "../stack/PatientStack";
// import { useAgregarCitaMutation } from "../stack/AppointmentsStack";

// Datos ficticios - Reemplazar con datos reales
// const mockSchedules = [
//   {
//     id: 1,
//     doctor: {
//       id: 1,
//       dni: "12345678",
//       name: "Juan",
//       lastname: "Pérez",
//       codigo: "DOC001"
//     },
//     specialty: {
//       id: 1,
//       name: "Cardiología",
//       description: "Especialista en corazón",
//       cost: 150
//     },
//     office: {
//       id: 1,
//       name: "Consultorio A",
//       address: "Av. Principal 123",
//       floor: 2,
//       officeNumber: "201"
//     },
//     date: "2025-11-18",
//     startTime: "09:00:00",
//     endTime: "10:00:00",
//     status: true
//   },
//   {
//     id: 2,
//     doctor: {
//       id: 2,
//       dni: "23456789",
//       name: "Ana",
//       lastname: "Martínez",
//       codigo: "DOC002"
//     },
//     specialty: {
//       id: 2,
//       name: "Pediatría",
//       description: "Especialista en niños",
//       cost: 120
//     },
//     office: {
//       id: 2,
//       name: "Consultorio B",
//       address: "Av. Principal 123",
//       floor: 1,
//       officeNumber: "105"
//     },
//     date: "2025-11-18",
//     startTime: "14:00:00",
//     endTime: "15:00:00",
//     status: true
//   },
//   {
//     id: 3,
//     doctor: {
//       id: 3,
//       dni: "34567890",
//       name: "Roberto",
//       lastname: "Sánchez",
//       codigo: "DOC003"
//     },
//     specialty: {
//       id: 3,
//       name: "Neurología",
//       description: "Especialista en sistema nervioso",
//       cost: 180
//     },
//     office: {
//       id: 3,
//       name: "Consultorio C",
//       address: "Av. Principal 123",
//       floor: 3,
//       officeNumber: "302"
//     },
//     date: "2025-11-19",
//     startTime: "15:00:00",
//     endTime: "16:00:00",
//     status: true
//   }
// ];

// const mockPatients = [
//   {
//     id: 1,
//     dni: "11223344",
//     name: "Pedro",
//     lastname: "Ramírez",
//     phone: "987654321",
//     birthdate: "1985-05-15",
//     gender: "Masculino",
//   },
//   {
//     id: 2,
//     dni: "22334455",
//     name: "Lucía",
//     lastname: "Torres",
//     phone: "912345678",
//     birthdate: "2015-08-20",
//     gender: "Femenino",
//   },
//   {
//     id: 3,
//     dni: "33445566",
//     name: "José",
//     lastname: "Mendoza",
//     phone: "923456789",
//     birthdate: "1970-03-10",
//     gender: "Masculino",
//   },
//   {
//     id: 4,
//     dni: "44556677",
//     name: "Carmen",
//     lastname: "Vega",
//     phone: "934567890",
//     birthdate: "1992-11-25",
//     gender: "Femenino",
//   },
// ];

export const ModalAppointments = () => {
  const { user } = useAuthStore();
  const { setModalAppointmentState } = useAppointmentsStore();

  // Descomentar cuando tengas los hooks reales
  // const { data: schedules } = useMostrarHorariosQuery();
  // const { data: patients } = useMostrarPacientesQuery();
  // const { mutate: agregarCita } = useAgregarCitaMutation();

  const { data: mockSchedules } = useObtenerTodosLosHorariosQuery();
  const {data: mockPatients} = useMostrarPacientesQuery()

  const schedules = mockSchedules;
  const patients = mockPatients;

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      scheduleId: "",
      employeeDni: user?.dni || "",
      patientId: "",
      status: true,
    },
  });

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchPatient, setSearchPatient] = useState("");

  const modalRef = useRef(null);

  // Obtener fechas únicas de los horarios disponibles
  const uniqueDates = [...new Set(schedules?.map((s) => s.date))].sort();

  // Filtrar horarios por fecha seleccionada
  const availableSchedules = selectedDate
    ? schedules.filter(
        (schedule) => schedule.date === selectedDate && schedule.status
      )
    : [];

  // Filtrar pacientes por búsqueda
  const filteredPatients = patients?.filter((patient) => {
    const searchLower = searchPatient.toLowerCase();
    return (
      patient.name.toLowerCase().includes(searchLower) ||
      patient.lastname.toLowerCase().includes(searchLower) ||
      patient.dni.includes(searchPatient)
    );
  });

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setSelectedSchedule(null);
    setValue("scheduleId", "");
  };

  const handleSelectSchedule = (schedule) => {
    setSelectedSchedule(schedule);
    setValue("scheduleId", schedule.id);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setValue("patientId", patient.id);
    setSearchPatient("");
  };

  const { mutate: agregarCita } = useAgregarAppointmentMutation();
  const onSubmit = (data) => {
    // Validar que todos los campos requeridos estén presentes
    if (!data.scheduleId || !data.patientId) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    const formattedData = {
      scheduleId: Number(data.scheduleId),
      employeeDni: data.employeeDni,
      patientId: Number(data.patientId),
      // status: data.status ?? true,
    };

    console.log(formattedData);

    agregarCita(formattedData);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-40"
        onClick={() => setModalAppointmentState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div
          ref={modalRef}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Crear nueva cita
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Seleccione el horario y el paciente para agendar la cita
              </p>
            </div>
            <button
              type="button"
              onClick={() => setModalAppointmentState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium"
            >
              Cerrar
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-5 overflow-y-auto flex-1">
            {/* Paso 1: Seleccionar Fecha */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                  1
                </span>
                Seleccione la fecha
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {uniqueDates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => handleSelectDate(date)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedDate === date
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-xs text-slate-500">
                      {new Date(date + "T00:00:00").toLocaleDateString(
                        "es-ES",
                        {
                          weekday: "short",
                          timeZone: "UTC",
                        }
                      )}
                    </div>
                    <div className="font-semibold">
                      {new Date(date + "T00:00:00").toLocaleDateString(
                        "es-ES",
                        {
                          day: "numeric",
                          month: "short",
                          timeZone: "UTC",
                        }
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 2: Seleccionar Horario */}
            {selectedDate && (
              <div className="space-y-2 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                    2
                  </span>
                  Seleccione el horario disponible
                </label>
                {availableSchedules.length > 0 ? (
                  <div className="grid grid-cols-1 gap-3">
                    {availableSchedules.map((schedule) => (
                      <button
                        key={schedule.id}
                        type="button"
                        onClick={() => handleSelectSchedule(schedule)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          selectedSchedule?.id === schedule.id
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-blue-300"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                                {schedule.startTime.slice(0, 5)} -{" "}
                                {schedule.endTime.slice(0, 5)}
                              </span>
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded">
                                {schedule.specialty.name}
                              </span>
                            </div>
                            <p className="font-semibold text-slate-900">
                              Dr. {schedule.doctor.name}{" "}
                              {schedule.doctor.lastname}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                              {schedule.office.name} - Piso{" "}
                              {schedule.office.floor}, Consultorio{" "}
                              {schedule.office.officeNumber}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-slate-900">
                              S/ {schedule.specialty.cost}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 p-4 bg-slate-50 rounded-lg">
                    No hay horarios disponibles para esta fecha
                  </p>
                )}
              </div>
            )}

            {/* Paso 3: Seleccionar Paciente */}
            {selectedSchedule && (
              <div className="space-y-3 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs">
                    3
                  </span>
                  Seleccione el paciente
                </label>

                {/* Paciente seleccionado */}
                {selectedPatient ? (
                  <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">
                          {selectedPatient.name} {selectedPatient.lastname}
                        </p>
                        <div className="text-sm text-slate-600 mt-1 space-y-0.5">
                          <p>DNI: {selectedPatient.dni}</p>
                          <p>Teléfono: {selectedPatient.phone}</p>
                          <p>Género: {selectedPatient.gender}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPatient(null);
                          setValue("patientId", "");
                        }}
                        className="text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Cambiar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Buscador de pacientes */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Buscar por nombre, apellido o DNI..."
                        value={searchPatient}
                        onChange={(e) => setSearchPatient(e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {searchPatient && (
                        <button
                          type="button"
                          onClick={() => setSearchPatient("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <svg
                            className="w-5 h-5"
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
                      )}
                    </div>

                    {/* Lista de pacientes */}
                    <div className="max-h-60 overflow-y-auto space-y-2 border border-slate-200 rounded-lg p-2">
                      {filteredPatients.length > 0 ? (
                        filteredPatients.map((patient) => (
                          <button
                            key={patient.id}
                            type="button"
                            onClick={() => handleSelectPatient(patient)}
                            className="w-full p-3 rounded-lg border border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-left transition-all"
                          >
                            <p className="font-medium text-slate-900">
                              {patient.name} {patient.lastname}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-slate-600 mt-1">
                              <span>DNI: {patient.dni}</span>
                              <span>Tel: {patient.phone}</span>
                              <span>{patient.gender}</span>
                            </div>
                          </button>
                        ))
                      ) : (
                        <p className="text-sm text-slate-500 text-center py-4">
                          {searchPatient
                            ? "No se encontraron pacientes"
                            : "Escriba para buscar pacientes"}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Resumen de la cita */}
            {selectedSchedule && selectedPatient && (
              <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 animate-fadeIn">
                <h3 className="text-sm font-semibold text-slate-700 mb-3">
                  Resumen de la cita
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Fecha:</span>
                    <span className="font-medium text-slate-900">
                      {formatDate(selectedSchedule.date)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Horario:</span>
                    <span className="font-medium text-slate-900">
                      {selectedSchedule.startTime.slice(0, 5)} -{" "}
                      {selectedSchedule.endTime.slice(0, 5)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Doctor:</span>
                    <span className="font-medium text-slate-900">
                      Dr. {selectedSchedule.doctor.name}{" "}
                      {selectedSchedule.doctor.lastname}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Especialidad:</span>
                    <span className="font-medium text-slate-900">
                      {selectedSchedule.specialty.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Paciente:</span>
                    <span className="font-medium text-slate-900">
                      {selectedPatient.name} {selectedPatient.lastname}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-300">
                    <span className="text-slate-600 font-semibold">Costo:</span>
                    <span className="font-bold text-lg text-green-700">
                      S/ {selectedSchedule.specialty.cost}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Campos ocultos */}
            <input type="hidden" {...register("employeeDni")} />
            <input type="hidden" {...register("scheduleId")} />
            <input type="hidden" {...register("patientId")} />
            <input type="hidden" {...register("status")} />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setModalAppointmentState(false)}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              disabled={!selectedSchedule || !selectedPatient}
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Crear cita
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
