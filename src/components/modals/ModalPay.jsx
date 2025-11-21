import { useState } from "react";
import { useForm } from "react-hook-form";
import { Search, X } from "lucide-react";
import { useObtenerTodasLasCitasQuery } from "../../stack/AppointmentsStack";
import { useAuthStore } from "../../store/AuthStore";
import { useAgregarPayMutation } from "../../stack/PayStack";

export const ModalPay = ({ appointmentId, setModalPayState }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const { user } = useAuthStore();
  const { data: appointments } = useObtenerTodasLasCitasQuery();

  const { mutate: agregarPago } = useAgregarPayMutation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employeeDni: user?.dni || "",
      appointmentId: appointmentId || "",
      paymentMethod: "CONTADO",
      status: "PENDIENTE",
    },
  });

  const filteredAppointments = appointments?.filter((apt) => {
    if (!searchTerm) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      apt.id?.toString().includes(searchTerm) ||
      apt.patient?.name?.toLowerCase().includes(searchLower) ||
      apt.patient?.lastname?.toLowerCase().includes(searchLower) ||
      apt.schedule?.specialty?.name?.toLowerCase().includes(searchLower)
    );
  });

  const handleSelectAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setValue("appointmentId", appointment.id);
    setSearchTerm("");
    setShowDropdown(false);
  };

  const handleClearSelection = () => {
    setSelectedAppointment(null);
    setValue("appointmentId", "");
  };

  const onSubmit = (data) => {
    agregarPago(data);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-40"
        onClick={() => setModalPayState(false)}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-100 pointer-events-auto">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-slate-900">
              Registrar Pago
            </h1>
            <button
              type="button"
              onClick={() => setModalPayState(false)}
              className="text-slate-400 hover:text-slate-600 text-sm"
            >
              Cerrar
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-6 py-4 space-y-4 max-h-[70vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 gap-4">
              <div className="hidden flex-col gap-1">
                <label
                  htmlFor="employeeDni"
                  className="text-sm font-medium text-slate-700"
                >
                  DNI del Empleado <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="employeeDni"
                  {...register("employeeDni", {
                    required: "El DNI del empleado es requerido",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    maxLength: { value: 15, message: "Máximo 15 caracteres" },
                  })}
                  className={`p-2.5 border ${
                    errors.employeeDni ? "border-red-300" : "border-slate-200"
                  } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
                  disabled={!!user?.dni}
                />
                {errors.employeeDni && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.employeeDni.message}
                  </p>
                )}
              </div>

              {/* Buscador de Citas */}
              <div className="flex flex-col gap-1 relative">
                <label
                  htmlFor="appointmentSearch"
                  className="text-sm font-medium text-slate-700"
                >
                  Buscar Cita <span className="text-red-500">*</span>
                </label>

                {!selectedAppointment ? (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      id="appointmentSearch"
                      placeholder="Buscar por ID, paciente o servicio..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      disabled={!!appointmentId}
                      className="w-full pl-10 pr-4 p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    />

                    {showDropdown &&
                      searchTerm &&
                      filteredAppointments?.length > 0 && (
                        <div className="absolute top-full mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                          {filteredAppointments.map((apt) => (
                            <button
                              key={apt.id}
                              type="button"
                              onClick={() => handleSelectAppointment(apt)}
                              className="w-full text-left px-4 py-3 hover:bg-slate-50 border-b border-slate-100 last:border-b-0"
                            >
                              <div className="flex justify-between items-start w-full">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-slate-900">
                                    #{apt.id} - {apt.patient.name}{" "}
                                    {apt.patient.lastname}
                                  </p>
                                  <p className="text-xs text-slate-600 mt-1">
                                    {apt.schedule?.specialty?.name}
                                  </p>
                                  <p className="text-xs text-slate-500 mt-1">
                                    Dr(a). {apt.schedule?.doctor?.name}{" "}
                                    {apt.schedule?.doctor?.lastname}
                                  </p>
                                </div>
                                <div className="text-right ml-4">
                                  <p className="text-xs text-slate-500 whitespace-nowrap">
                                    {new Date(
                                      apt.schedule?.date
                                    ).toLocaleDateString()}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {apt.schedule?.startTime?.substring(0, 5)} -{" "}
                                    {apt.schedule?.endTime?.substring(0, 5)}
                                  </p>
                                  <p className="text-sm font-semibold text-cyan-700 mt-1">
                                    S/ {apt.finalCost?.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="p-3 bg-cyan-50 border border-cyan-200 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          Cita #{selectedAppointment.id}
                        </p>
                        <p className="text-xs text-slate-600 mt-1">
                          Paciente: {selectedAppointment.patient?.name}{" "}
                          {selectedAppointment.patient?.lastname}
                        </p>
                        <p className="text-xs text-slate-600">
                          Servicio:{" "}
                          {selectedAppointment.schedule?.specialty?.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          Dr(a). {selectedAppointment.schedule?.doctor?.name}{" "}
                          {selectedAppointment.schedule?.doctor?.lastname}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {new Date(
                            selectedAppointment.schedule?.date
                          ).toLocaleDateString()}{" "}
                          -{" "}
                          {selectedAppointment.schedule?.startTime?.substring(
                            0,
                            5
                          )}{" "}
                          a{" "}
                          {selectedAppointment.schedule?.endTime?.substring(
                            0,
                            5
                          )}
                        </p>
                        <p className="text-sm font-semibold text-cyan-700 mt-1">
                          Total: S/ {selectedAppointment.finalCost?.toFixed(2)}
                        </p>
                      </div>
                      {!appointmentId && (
                        <button
                          type="button"
                          onClick={handleClearSelection}
                          className="text-cyan-600 hover:text-cyan-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <input
                  type="hidden"
                  {...register("appointmentId", {
                    required: "Debe seleccionar una cita",
                    valueAsNumber: true,
                  })}
                />
                {errors.appointmentId && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.appointmentId.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="paymentMethod"
                  className="text-sm font-medium text-slate-700"
                >
                  Método de Pago <span className="text-red-500">*</span>
                </label>
                <select
                  id="paymentMethod"
                  {...register("paymentMethod", {
                    required: "El método de pago es requerido",
                  })}
                  className={`p-2.5 border ${
                    errors.paymentMethod ? "border-red-300" : "border-slate-200"
                  } rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500`}
                >
                  <option value="CONTADO">Contado</option>
                  <option value="CREDITO">Crédito</option>
                  <option value="DEBITO">Débito</option>
                  <option value="TRANSFERENCIA">Transferencia</option>
                </select>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="ruc"
                  className="text-sm font-medium text-slate-700"
                >
                  RUC (opcional)
                </label>
                <input
                  type="text"
                  id="ruc"
                  {...register("ruc", {
                    maxLength: { value: 20, message: "Máximo 20 caracteres" },
                  })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
                {errors.ruc && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.ruc.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="companyName"
                  className="text-sm font-medium text-slate-700"
                >
                  Nombre de Empresa (opcional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  {...register("companyName", {
                    maxLength: { value: 255, message: "Máximo 255 caracteres" },
                  })}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                />
                {errors.companyName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label
                  htmlFor="status"
                  className="text-sm font-medium text-slate-700"
                >
                  Estado
                </label>
                <select
                  id="status"
                  {...register("status")}
                  className="p-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="PENDIENTE">Pendiente</option>
                  <option value="PAGADO">Pagado</option>
                  <option value="ANULADO">Anulado</option>
                  <option value="FALLIDO">Fallido</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setModalPayState(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                Registrar Pago
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
