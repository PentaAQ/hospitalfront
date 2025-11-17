import { useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import { useObtenerConsultoriosQuery } from '../stack/ConsultoryStack';
import { useAuthStore } from '../store/AuthStore';
import { useHoraryStore } from '../store/HoraryStore';
import { useMostrarEspecilitiesQuery } from '../stack/EspecilitiesStack';
import { useObtenerTodosLosDoctoresQuery } from '../stack/DoctorStack';

// Datos ficticios
// const specialties = [
//   { id: 1, name: "Cardiología" },
//   { id: 2, name: "Pediatría" },
//   { id: 3, name: "Dermatología" },
//   { id: 4, name: "Traumatología" },
//   { id: 5, name: "Neurología" }
// ];

// const doctors = [
//   { dni: "12345678", name: "Dr. Carlos Ramírez", specialtyId: 1 },
//   { dni: "23456789", name: "Dra. María López", specialtyId: 1 },
//   { dni: "34567890", name: "Dr. Juan Pérez", specialtyId: 2 },
//   { dni: "45678901", name: "Dra. Ana Torres", specialtyId: 2 },
//   { dni: "56789012", name: "Dr. Luis Gómez", specialtyId: 3 },
//   { dni: "67890123", name: "Dra. Sofia Mendoza", specialtyId: 4 },
//   { dni: "78901234", name: "Dr. Pedro Castillo", specialtyId: 5 }
// ];

// const offices = [
//   { id: 1, name: "Consultorio 101", specialtyIds: [1, 3] },
//   { id: 2, name: "Consultorio 102", specialtyIds: [2, 4] },
//   { id: 3, name: "Consultorio 103", specialtyIds: [1, 5] },
//   { id: 4, name: "Consultorio 201", specialtyIds: [2, 3] },
//   { id: 5, name: "Consultorio 202", specialtyIds: [4, 5] }
// ];

// Generar horarios en intervalos de 20 minutos
const generateTimeSlots = () => {
  const slots = [];
  for (let hour = 8; hour < 20; hour++) {
    for (let min = 0; min < 60; min += 20) {
      const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      slots.push(time);
    }
  }
  return slots;
};

const timeSlots = generateTimeSlots();

export const ModalHorary = () => {

  const { user } = useAuthStore();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      employeeDni: user?.dni || "",
      doctorDni: "",
      specialtyId: "",
      officeId: "",
      date: "",
      startTime: "",
      endTime: "",
      status: true,
    },
  });
  
  const {data: specialties} = useMostrarEspecilitiesQuery();
  const {data:doctors} = useObtenerTodosLosDoctoresQuery();
  const {data:offices} = useObtenerConsultoriosQuery();
  const {setModalHoraryState} = useHoraryStore();
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  
  const modalRef = useRef(null);
  
  // Filtrar doctores por especialidad
  const availableDoctors = selectedSpecialty
    ? doctors?.filter(doc => doc?.specialties?.[0]?.id === selectedSpecialty.id)
    : [];

  // Filtrar consultorios por especialidad
  const availableOffices = selectedSpecialty
    ? offices.filter(office => office.specialtyIds.includes(selectedSpecialty.id))
    : [];

  // Generar horarios finales basados en el inicio
  const endTimeSlots = startTime
    ? timeSlots.filter(slot => slot > startTime)
    : [];

  const handleSelectSpecialty = (specialty) => {
    setSelectedSpecialty(specialty);
    setSelectedDoctor(null);
    setStartTime("");
    setEndTime("");
    setValue("specialtyId", specialty.id);
    setValue("doctorDni", "");
    setValue("officeId", "");
    setValue("startTime", "");
    setValue("endTime", "");
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setValue("doctorDni", doctor.dni);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setEndTime("");
    setValue("startTime", `${time}:00`);
    setValue("endTime", "");
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    setValue("endTime", `${time}:00`);
  };

  const onSubmit = (data) => {
    // Validar que todos los campos requeridos estén presentes
    if (!data.doctorDni || !data.specialtyId || !data.officeId || !data.date || !data.startTime || !data.endTime) {
      alert("Por favor complete todos los campos requeridos");
      return;
    }

    const formattedData = {
      doctorDni: data.doctorDni,
      employeeDni: data.employeeDni,
      specialtyId: Number(data.specialtyId),
      officeId: Number(data.officeId),
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      status: data.status ?? true
    };
    
    console.log(formattedData);
    // setModalHoraryState(false);
  };


  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-40"
        onClick={() => setModalHoraryState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div 
          ref={modalRef}
          className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <h1 className="text-xl font-semibold text-slate-900">Crear horario médico</h1>
            <button
              type="button"
              onClick={() => setModalHoraryState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium"
            >
              Cerrar
            </button>
          </div>
          
          {/* Content */}
          <div className="px-6 py-4 space-y-5 overflow-y-auto flex-1">
            {/* Paso 1: Seleccionar Especialidad */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">1</span>
                Seleccione la especialidad
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specialties?.map((specialty) => (
                  <button
                    key={specialty.id}
                    type="button"
                    onClick={() => handleSelectSpecialty(specialty)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedSpecialty?.id === specialty.id
                        ? 'border-cyan-600 bg-cyan-50 text-cyan-700'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-300'
                    }`}
                  >
                    {specialty.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 2: Seleccionar Doctor */}
            {selectedSpecialty && (
              <div className="space-y-2 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">2</span>
                  Seleccione el doctor
                </label>
                {availableDoctors?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {availableDoctors.map((doctor) => (
                      <button
                        key={doctor.dni}
                        type="button"
                        onClick={() => handleSelectDoctor(doctor)}
                        className={`p-3 rounded-lg border-2 text-left text-sm transition-all ${
                          selectedDoctor?.dni === doctor.dni
                            ? 'border-cyan-600 bg-cyan-50'
                            : 'border-slate-200 bg-white hover:border-cyan-300'
                        }`}
                      >
                        <p className="font-medium text-slate-900">{doctor.name}</p>
                        <p className="text-xs text-slate-500">DNI: {doctor.dni}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 p-3 bg-slate-50 rounded-lg">
                    No hay doctores disponibles para esta especialidad
                  </p>
                )}
              </div>
            )}

            {/* Paso 3: Fecha y Horario */}
            {selectedDoctor && (
              <div className="space-y-4 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">3</span>
                  Fecha y horario
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Fecha */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="date" className="text-xs font-medium text-slate-600">
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      {...register("date", { required: true })}
                    />
                  </div>

                  {/* Hora Inicio */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="startTime" className="text-xs font-medium text-slate-600">
                      Hora inicio
                    </label>
                    <select
                      id="startTime"
                      value={startTime}
                      onChange={(e) => handleStartTimeChange(e.target.value)}
                      className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    >
                      <option value="">Seleccionar</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hora Fin */}
                  <div className="flex flex-col gap-1">
                    <label htmlFor="endTime" className="text-xs font-medium text-slate-600">
                      Hora fin
                    </label>
                    <select
                      id="endTime"
                      value={endTime}
                      onChange={(e) => handleEndTimeChange(e.target.value)}
                      disabled={!startTime}
                      className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    >
                      <option value="">Seleccionar</option>
                      {endTimeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Paso 4: Seleccionar Consultorio */}
            {selectedDoctor && startTime && endTime && (
              <div className="space-y-2 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">4</span>
                  Seleccione el consultorio
                </label>
                {availableOffices.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableOffices.map((office) => (
                      <button
                        key={office.id}
                        type="button"
                        onClick={() => setValue("officeId", office.id)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          office.id === watch("officeId") ? 'bg-cyan-50 border-cyan-500' : ''
                        }`}
                      >
                        {office.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 p-3 bg-slate-50 rounded-lg">
                    No hay consultorios disponibles para esta especialidad
                  </p>
                )}
              </div>
            )}

            {/* Campos ocultos */}
            <input type="hidden" {...register("employeeDni")} />
            <input type="hidden" {...register("specialtyId")} />
            <input type="hidden" {...register("doctorDni")} />
            <input type="hidden" {...register("officeId", { required: true })} />
            <input type="hidden" {...register("status")} />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setModalHoraryState(false)}
              className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit(onSubmit)}
              className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              Crear horario
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
}