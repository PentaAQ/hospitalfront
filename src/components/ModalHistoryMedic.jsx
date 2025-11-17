import { useState, useEffect, useRef } from 'react';
import { useHistoryMedicStore } from "../store/HistoryMedic";
import { useForm, Controller } from "react-hook-form";
import { useAgregarHistoriaMedicaMutation } from "../stack/HistoryMedicStack";
import { useMostrarPacientesQuery } from "../stack/PacienteStack";
import { useAuthStore } from '../store/AuthStore';

export const ModalHistoryMedic = () => {
  const { setModalHistoryMedicState } = useHistoryMedicStore();
  const { control, handleSubmit, setValue } = useForm();
  const { data: patients = [], isLoading } = useMostrarPacientesQuery();
  const { mutate } = useAgregarHistoriaMedicaMutation();
  const { user } = useAuthStore();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const dropdownRef = useRef(null);

  // Establecer el employeeDni automáticamente cuando el componente se monta
  useEffect(() => {
    if (user?.dni) {
      setValue("employeeDni", user.dni);
    }
  }, [user, setValue]);

  // Filtrar pacientes por DNI
  const filteredPatients = patients.filter(patient =>
    patient.dni?.toString().includes(searchTerm)
  );

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchTerm(patient.dni);
    setValue("patientId", patient.id); // ✅ Guardamos el ID del paciente
    setShowDropdown(false);
  };

  const onSubmit = (data) => {
    // Convertir height y weight a números
    const formattedData = {
      patientId: Number(data.patientId),
      employeeDni: data.employeeDni,
      height: data.height ? Number(data.height) : undefined,
      weight: data.weight ? Number(data.weight) : undefined,
    };
    
    console.log("Datos enviados:", formattedData);
    mutate(formattedData);
  };

  return (
    <div>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center"
        onClick={() => setModalHistoryMedicState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900">Nueva historia clínica</h1>
            <button
              type="button"
              onClick={() => setModalHistoryMedicState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cerrar
            </button>
          </div>
          
          <div className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Buscador de paciente con autocompletado */}
            <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
              <label htmlFor="patientDni" className="text-sm font-medium text-slate-700">
                DNI del paciente
              </label>
              <input
                type="text"
                id="patientDni"
                placeholder="Buscar por DNI..."
                className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                  setSelectedPatient(null);
                }}
                onFocus={() => setShowDropdown(true)}
              />
              
              {/* Paciente seleccionado */}
              {selectedPatient && (
                <div className="mt-2 p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">Paciente:</span> {selectedPatient.name} {selectedPatient.lastname}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    DNI: {selectedPatient.dni} | ID: {selectedPatient.id}
                  </p>
                </div>
              )}

              {/* Dropdown de resultados */}
              {showDropdown && searchTerm && !selectedPatient && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
                  {isLoading ? (
                    <div className="p-3 text-sm text-slate-500 text-center">
                      Cargando pacientes...
                    </div>
                  ) : filteredPatients.length > 0 ? (
                    filteredPatients.map((patient) => (
                      <div
                        key={patient.id}
                        onClick={() => handleSelectPatient(patient)}
                        className="p-3 hover:bg-cyan-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                      >
                        <p className="text-sm font-medium text-slate-900">
                          {patient.name} {patient.lastname}
                        </p>
                        <p className="text-xs text-slate-500">
                          DNI: {patient.dni}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-sm text-slate-500 text-center">
                      No se encontraron pacientes
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Campo oculto para el ID del paciente */}
            <Controller
              name="patientId"
              control={control}
              render={({ field }) => (
                <input
                  type="hidden"
                  {...field}
                  value={field.value ?? ""}
                />
              )}
            />

            {/* Campo oculto para el DNI del empleado */}
            <Controller
              name="employeeDni"
              control={control}
              render={({ field }) => (
                <input
                  type="hidden"
                  {...field}
                  value={field.value ?? ""}
                />
              )}
            />

            <div className="flex flex-col gap-1">
              <label htmlFor="employeeInfo" className="text-sm font-medium text-slate-700">
                Profesional
              </label>
              <input
                type="text"
                id="employeeInfo"
                className="p-2.5 border border-slate-200 rounded-lg text-sm bg-slate-50 text-slate-500"
                value={user ? `${user.name} ${user.lastname} - DNI: ${user.dni}` : ""}
                readOnly
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="height" className="text-sm font-medium text-slate-700">
                  Talla (m)
                </label>
                <Controller
                  name="height"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      step="0.01"
                      id="height"
                      placeholder="Ej: 1.75"
                      className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="weight" className="text-sm font-medium text-slate-700">
                  Peso (kg)
                </label>
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      step="0.1"
                      id="weight"
                      placeholder="Ej: 70.5"
                      className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      {...field}
                      value={field.value ?? ""}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModalHistoryMedicState(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Guardar registro
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};