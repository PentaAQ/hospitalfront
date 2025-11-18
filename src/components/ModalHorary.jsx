import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useObtenerConsultoriosQuery } from "../stack/ConsultoryStack";
import { useAuthStore } from "../store/AuthStore";
import { useHoraryStore } from "../store/HoraryStore";
import { useMostrarEspecilitiesQuery } from "../stack/EspecilitiesStack";
import { useObtenerTodosLosDoctoresQuery } from "../stack/DoctorStack";
import { useAgregarHorarioMutation } from "../stack/HoraryStack";

// Generar bloques de horarios de 20 minutos
const generateTimeBlocks = () => {
  const blocks = [];
  for (let hour = 8; hour < 18; hour++) {
    for (let min = 0; min < 60; min += 20) {
      const startHour = hour.toString().padStart(2, "0");
      const startMin = min.toString().padStart(2, "0");
      const endMin = ((min + 20) % 60).toString().padStart(2, "0");
      const endHour = (min + 20 >= 60 ? hour + 1 : hour)
        .toString()
        .padStart(2, "0");

      const startTime = `${startHour}:${startMin}`;
      const endTime = `${endHour}:${endMin}`;

      blocks.push({
        id: `${startTime}-${endTime}`,
        start: `${startTime}:00`,
        end: `${endTime}:00`,
        label: `${startTime} - ${endTime}`,
      });
    }
  }
  return blocks;
};

const timeBlocks = generateTimeBlocks();

export const ModalHorary = () => {
  const { user } = useAuthStore();
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      employeeDni: user?.dni || "",
      date: "",
      status: true,
    },
  });
  const { mutate: agregarHorario, isPending } = useAgregarHorarioMutation();

  const { data: specialties } = useMostrarEspecilitiesQuery();
  const { data: doctors } = useObtenerTodosLosDoctoresQuery();
  const { data: offices } = useObtenerConsultoriosQuery();
  const { setModalHoraryState } = useHoraryStore();

  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedTimeBlocks, setSelectedTimeBlocks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const modalRef = useRef(null);

  // Filtrar doctores por especialidad
  const availableDoctors = selectedSpecialty
    ? doctors?.filter(
        (doc) => doc?.specialties?.[0]?.id === selectedSpecialty.id
      )
    : [];

  // Filtrar consultorios por especialidad
  const availableOffices = selectedSpecialty
    ? offices?.filter((office) =>
        office.specialtyIds.includes(selectedSpecialty.id)
      )
    : [];

  const handleSelectSpecialty = (specialty) => {
    setSelectedSpecialty(specialty);
    setSelectedDoctor(null);
    setSelectedOffice(null);
    setSelectedTimeBlocks([]);
    setSelectedDate("");
  };

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedOffice(null);
    setSelectedTimeBlocks([]);
  };

  const handleSelectOffice = (office) => {
    setSelectedOffice(office);
  };

  const handleToggleTimeBlock = (block) => {
    setSelectedTimeBlocks((prev) => {
      const exists = prev.find((b) => b.id === block.id);
      if (exists) {
        return prev.filter((b) => b.id !== block.id);
      } else {
        return [...prev, block];
      }
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setValue("date", date);
  };

  const onSubmit = async (data) => {
    // Validaciones
    if (!selectedDoctor) {
      alert("Por favor seleccione un doctor");
      return;
    }
    if (!selectedOffice) {
      alert("Por favor seleccione un consultorio");
      return;
    }
    if (!selectedDate) {
      alert("Por favor seleccione una fecha");
      return;
    }
    if (selectedTimeBlocks.length === 0) {
      alert("Por favor seleccione al menos un bloque de horario");
      return;
    }

    // Crear una petición por cada bloque de tiempo seleccionado
    const promises = selectedTimeBlocks.map((block) => {
      const horarioData = {
        doctorDni: selectedDoctor.dni,
        employeeDni: data.employeeDni,
        specialtyId: Number(selectedSpecialty.id),
        officeId: Number(selectedOffice.id),
        date: selectedDate,
        startTime: block.start,
        endTime: block.end,
        status: data.status ?? true,
      };

      console.log("Enviando horario:", horarioData);

      return new Promise((resolve, reject) => {
        agregarHorario(horarioData, {
          onSuccess: () => resolve(),
          onError: (error) => reject(error),
        });
      });
    });

    try {
      await Promise.all(promises);
      alert(`Se crearon ${selectedTimeBlocks.length} horarios exitosamente`);
      setModalHoraryState(false);
    } catch (error) {
      console.error("Error al crear horarios:", error);
      alert("Hubo un error al crear algunos horarios");
    }
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
          className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
            <div>
              <h1 className="text-xl font-semibold text-slate-900">
                Crear horario médico
              </h1>
              {selectedTimeBlocks.length > 0 && (
                <p className="text-sm text-cyan-600 mt-1">
                  {selectedTimeBlocks.length} bloque(s) seleccionado(s)
                </p>
              )}
            </div>
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
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">
                  1
                </span>
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
                        ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                        : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300"
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
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">
                    2
                  </span>
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
                            ? "border-cyan-600 bg-cyan-50"
                            : "border-slate-200 bg-white hover:border-cyan-300"
                        }`}
                      >
                        <p className="font-medium text-slate-900">
                          {doctor.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          DNI: {doctor.dni}
                        </p>
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

            {/* Paso 3: Seleccionar Consultorio */}
            {selectedDoctor && (
              <div className="space-y-2 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">
                    3
                  </span>
                  Seleccione el consultorio
                </label>
                {availableOffices?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {availableOffices.map((office) => (
                      <button
                        key={office.id}
                        type="button"
                        onClick={() => handleSelectOffice(office)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                          selectedOffice?.id === office.id
                            ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-cyan-300"
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

            {/* Paso 4: Fecha */}
            {selectedOffice && (
              <div className="space-y-2 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">
                    4
                  </span>
                  Seleccione la fecha
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 w-full max-w-xs"
                />
              </div>
            )}

            {/* Paso 5: Grid de Bloques de Horario */}
            {selectedOffice && selectedDate && (
              <div className="space-y-3 animate-fadeIn">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-600 text-white text-xs">
                    5
                  </span>
                  Seleccione los bloques de horario (8:00 - 18:00)
                </label>
                <p className="text-xs text-slate-500">
                  Haga clic en los bloques para seleccionarlos. Puede
                  seleccionar múltiples bloques.
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-96 overflow-y-auto p-2 bg-slate-50 rounded-lg">
                  {timeBlocks.map((block) => {
                    const isSelected = selectedTimeBlocks.find(
                      (b) => b.id === block.id
                    );
                    return (
                      <button
                        key={block.id}
                        type="button"
                        onClick={() => handleToggleTimeBlock(block)}
                        className={`p-2.5 rounded-lg border-2 text-xs font-medium transition-all ${
                          isSelected
                            ? "border-cyan-600 bg-cyan-600 text-white shadow-md"
                            : "border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:bg-cyan-50"
                        }`}
                      >
                        {block.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Campos ocultos */}
            <input type="hidden" {...register("employeeDni")} />
            <input type="hidden" {...register("date")} />
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
              disabled={isPending || selectedTimeBlocks.length === 0}
              className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isPending
                ? "Guardando..."
                : `Crear ${selectedTimeBlocks.length} horario(s)`}
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
