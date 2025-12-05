import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAtencionesStore } from "../../store/AttentionStore";
import { useCrearAtencionMutation } from "../../stack/AttentionStack";
import { useMostrarHistoriasMedicasQuery } from "../../stack/HistoryMedicStack";
import { useObtenerTodasLasCitasQuery } from "../../stack/AppointmentsStack";
import { useObtenerTodosLosDoctoresQuery } from "../../stack/DoctorStack";

export const ModalAttention = () => {
  const { setModalAttentionState } = useAtencionesStore();

  const { register, handleSubmit, setValue } = useForm();
  const { data: appointments = [], isLoading: loadingAppointments } =
    useObtenerTodasLasCitasQuery();
  const { data: histories = [], isLoading: loadingHistories } =
    useMostrarHistoriasMedicasQuery();
  const { data: doctors = [], isLoading: loadingDoctors } =
    useObtenerTodosLosDoctoresQuery();
  const { mutate, isPending } = useCrearAtencionMutation();

  const [appointmentSearch, setAppointmentSearch] = useState("");
  const [historySearch, setHistorySearch] = useState("");
  const [doctorSearch, setDoctorSearch] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showAppointmentDropdown, setShowAppointmentDropdown] = useState(false);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const [showDoctorDropdown, setShowDoctorDropdown] = useState(false);

  const appointmentDropdownRef = useRef(null);
  const historyDropdownRef = useRef(null);
  const doctorDropdownRef = useRef(null);

  const filteredAppointments = appointments?.filter((appointment) => {
    const term = appointmentSearch.toLowerCase();
    return (
      appointment.id.toString().includes(term) ||
      appointment.patient?.dni?.toString().includes(term) ||
      `${appointment.patient?.name} ${appointment.patient?.lastname}`
        .toLowerCase()
        .includes(term)
    );
  });

  const filteredDoctors = doctors?.filter((doctor) => {
    const term = doctorSearch.toLowerCase();
    return (
      doctor.dni?.toString().includes(term) ||
      `${doctor.name} ${doctor.lastname}`.toLowerCase().includes(term)
    );
  });

  const filteredHistories = histories?.filter((history) => {
    const term = historySearch.toLowerCase();
    return (
      history.id.toString().includes(term) ||
      history.patient?.dni?.toString().includes(term) ||
      `${history.patient?.name} ${history.patient?.lastname}`
        .toLowerCase()
        .includes(term)
    );
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        appointmentDropdownRef.current &&
        !appointmentDropdownRef.current.contains(event.target)
      ) {
        setShowAppointmentDropdown(false);
      }
      if (
        historyDropdownRef.current &&
        !historyDropdownRef.current.contains(event.target)
      ) {
        setShowHistoryDropdown(false);
      }
      if (doctorDropdownRef.current && !doctorDropdownRef.current.contains(event.target)) {
        setShowDoctorDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentSearch(
      `${appointment.id} - ${appointment.patient.name} ${appointment.patient.lastname}`
    );
    setValue("appointmentId", appointment.id);
    setShowAppointmentDropdown(false);
  };

  const handleSelectHistory = (history) => {
    setSelectedHistory(history);
    setHistorySearch(
      `${history.id} - ${history.patient.name} ${history.patient.lastname}`
    );
    setValue("medicalHistoryId", history.id);
    setShowHistoryDropdown(false);
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setDoctorSearch(`${doctor.dni} - ${doctor.name} ${doctor.lastname}`);
    setValue("doctorDni", doctor.dni);
    setShowDoctorDropdown(false);
  };

  const onSubmit = (data) => {
    const payload = {
      appointmentId: Number(data.appointmentId),
      doctorDni: data.doctorDni,
      medicalHistoryId: Number(data.medicalHistoryId),
      diagnosis: data.diagnosis,
      treatment: data.treatment,
      notes: data.notes || "",
    };

    mutate(payload);
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center"
        onClick={() => setModalAttentionState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900">
              Nueva atención médica
            </h1>
            <button
              type="button"
              onClick={() => setModalAttentionState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cerrar
            </button>
          </div>

          <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Campos ocultos para IDs y doctorDni */}
            <input type="hidden" {...register("appointmentId")} />
            <input type="hidden" {...register("medicalHistoryId")} />
            <input type="hidden" {...register("doctorDni")} />

            {/* Selección de cita con autocompletado */}
            <div
              className="flex flex-col gap-1 relative"
              ref={appointmentDropdownRef}
            >
              <label className="text-sm font-medium text-slate-700">
                Cita (appointmentId)
              </label>
              <input
                type="text"
                placeholder="Buscar por ID de cita, DNI o nombre del paciente..."
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={appointmentSearch}
                onChange={(e) => {
                  setAppointmentSearch(e.target.value);
                  setShowAppointmentDropdown(true);
                  setSelectedAppointment(null);
                  setValue("appointmentId", "");
                }}
                onFocus={() => setShowAppointmentDropdown(true)}
              />

              {selectedAppointment && (
                <div className="mt-2 p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-xs text-slate-700">
                  <p className="font-medium">
                    Cita #{selectedAppointment.id} -{" "}
                    {selectedAppointment.patient.name}{" "}
                    {selectedAppointment.patient.lastname}
                  </p>
                  <p className="mt-1">
                    Fecha:{" "}
                    {new Date(selectedAppointment.schedule.date).toLocaleDateString("es-ES")}
                  </p>
                </div>
              )}

              {showAppointmentDropdown && (
                <ul className="absolute top-15 z-10 w-full bg-white border border-slate-200 rounded-lg shadow-md mt-2">
                  {filteredAppointments.map((appointment) => (
                    <li
                      key={appointment.id}
                      className="p-3 cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSelectAppointment(appointment)}
                    >
                      <p className="font-medium">
                        Cita #{appointment.id} -{" "}
                        {appointment.patient.name} {appointment.patient.lastname}
                      </p>
                      <p className="mt-1">
                        Fecha:{" "}
                        {new Date(appointment.schedule.date).toLocaleDateString("es-ES")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Selección de doctor con autocompletado */}
            <div
              className="flex flex-col gap-1 relative"
              ref={doctorDropdownRef}
            >
              <label className="text-sm font-medium text-slate-700">
                Doctor (doctorDni)
              </label>
              <input
                type="text"
                placeholder="Buscar por DNI o nombre del doctor..."
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={doctorSearch}
                onChange={(e) => {
                  setDoctorSearch(e.target.value);
                  setShowDoctorDropdown(true);
                  setSelectedDoctor(null);
                  setValue("doctorDni", "");
                }}
                onFocus={() => setShowDoctorDropdown(true)}
              />

              {selectedDoctor && (
                <div className="mt-2 p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-xs text-slate-700">
                  <p className="font-medium">
                    {selectedDoctor.name} {selectedDoctor.lastname}
                  </p>
                  <p className="mt-1">DNI: {selectedDoctor.dni}</p>
                </div>
              )}

              {showDoctorDropdown && (
                <ul className="absolute top-15 z-10 w-full bg-white border border-slate-200 rounded-lg shadow-md mt-2">
                  {filteredDoctors.map((doctor) => (
                    <li
                      key={doctor.id}
                      className="p-3 cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSelectDoctor(doctor)}
                    >
                      <p className="font-medium">
                        {doctor.dni} - {doctor.name} {doctor.lastname}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Selección de historia clínica con autocompletado */}
            <div
              className="flex flex-col gap-1 relative"
              ref={historyDropdownRef}
            >
              <label className="text-sm font-medium text-slate-700">
                Historia clínica (medicalHistoryId)
              </label>
              <input
                type="text"
                placeholder="Buscar por ID de historia clínica, DNI o nombre del paciente..."
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={historySearch}
                onChange={(e) => {
                  setHistorySearch(e.target.value);
                  setShowHistoryDropdown(true);
                  setSelectedHistory(null);
                  setValue("medicalHistoryId", "");
                }}
                onFocus={() => setShowHistoryDropdown(true)}
              />

              {selectedHistory && (
                <div className="mt-2 p-3 bg-cyan-50 border border-cyan-200 rounded-lg text-xs text-slate-700">
                  <p className="font-medium">
                    Historia clínica #{selectedHistory.id} -{" "}
                    {selectedHistory.patient.name} {selectedHistory.patient.lastname}
                  </p>
                </div>
              )}

              {showHistoryDropdown && (
                <ul className="absolute top-15 z-10 w-full bg-white border border-slate-200 rounded-lg shadow-md mt-2">
                  {filteredHistories.map((history) => (
                    <li
                      key={history.id}
                      className="p-3 cursor-pointer hover:bg-slate-100"
                      onClick={() => handleSelectHistory(history)}
                    >
                      <p className="font-medium">
                        Historia clínica #{history.id} -{" "}
                        {history.patient.name} {history.patient.lastname}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Formulario de atención médica */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Diagnóstico
                </label>
                <textarea
                  rows={4}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  {...register("diagnosis", { required: true })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Tratamiento
                </label>
                <textarea
                  rows={4}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  {...register("treatment", { required: true })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">
                  Notas
                </label>
                <textarea
                  rows={4}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                  {...register("notes")}
                />
              </div>

              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg shadow-md"
              >
                Guardar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
