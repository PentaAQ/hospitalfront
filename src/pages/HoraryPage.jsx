import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, User, Stethoscope, MapPin } from 'lucide-react';
import { useObtenerTodosLosHorariosQuery } from '../stack/HoraryStack';
import { BtnAddHorary } from '../components/ui/BtnAddHorary';
import { ModalHorary } from '../components/ModalHorary';
import { useHoraryStore } from '../store/HoraryStore';

// Datos ficticios - Reemplazar con datos reales del backend
// const mockSchedules = [
//   {
//     id: 1,
//     doctor: {
//       id: 1,
//       dni: "12345678",
//       name: "Juan",
//       lastname: "Pérez",
//       codigo: "DOC001",
//       specialties: [
//         { id: 1, name: "Cardiología", description: "Especialista en corazón", cost: 150, status: true }
//       ]
//     },
//     employee: {
//       id: 1,
//       dni: "87654321",
//       name: "María",
//       lastname: "García",
//       role: "Enfermera",
//       isEnabled: true
//     },
//     specialty: {
//       id: 1,
//       name: "Cardiología",
//       description: "Especialista en corazón",
//       cost: 150,
//       status: true
//     },
//     office: {
//       id: 1,
//       name: "Consultorio A",
//       address: "Av. Principal 123",
//       floor: 2,
//       officeNumber: "201",
//       status: true,
//       specialtyIds: [1]
//     },
//     date: "2025-11-17",
//     startTime: "09:00:00",
//     endTime: "11:00:00",
//     status: true
//   },
//   {
//     id: 2,
//     doctor: {
//       id: 2,
//       dni: "23456789",
//       name: "Ana",
//       lastname: "Martínez",
//       codigo: "DOC002",
//       specialties: [
//         { id: 2, name: "Pediatría", description: "Especialista en niños", cost: 120, status: true }
//       ]
//     },
//     employee: {
//       id: 2,
//       dni: "98765432",
//       name: "Carlos",
//       lastname: "López",
//       role: "Asistente",
//       isEnabled: true
//     },
//     specialty: {
//       id: 2,
//       name: "Pediatría",
//       description: "Especialista en niños",
//       cost: 120,
//       status: true
//     },
//     office: {
//       id: 2,
//       name: "Consultorio B",
//       address: "Av. Principal 123",
//       floor: 1,
//       officeNumber: "105",
//       status: true,
//       specialtyIds: [2]
//     },
//     date: "2025-11-17",
//     startTime: "14:00:00",
//     endTime: "16:00:00",
//     status: true
//   },
//   {
//     id: 3,
//     doctor: {
//       id: 1,
//       dni: "12345678",
//       name: "Juan",
//       lastname: "Pérez",
//       codigo: "DOC001",
//       specialties: [
//         { id: 1, name: "Cardiología", description: "Especialista en corazón", cost: 150, status: true }
//       ]
//     },
//     employee: {
//       id: 1,
//       dni: "87654321",
//       name: "María",
//       lastname: "García",
//       role: "Enfermera",
//       isEnabled: true
//     },
//     specialty: {
//       id: 1,
//       name: "Cardiología",
//       description: "Especialista en corazón",
//       cost: 150,
//       status: true
//     },
//     office: {
//       id: 1,
//       name: "Consultorio A",
//       address: "Av. Principal 123",
//       floor: 2,
//       officeNumber: "201",
//       status: true,
//       specialtyIds: [1]
//     },
//     date: "2025-11-18",
//     startTime: "10:00:00",
//     endTime: "12:00:00",
//     status: true
//   },
//   {
//     id: 4,
//     doctor: {
//       id: 3,
//       dni: "34567890",
//       name: "Roberto",
//       lastname: "Sánchez",
//       codigo: "DOC003",
//       specialties: [
//         { id: 3, name: "Neurología", description: "Especialista en sistema nervioso", cost: 180, status: true }
//       ]
//     },
//     employee: {
//       id: 3,
//       dni: "76543210",
//       name: "Laura",
//       lastname: "Díaz",
//       role: "Enfermera",
//       isEnabled: true
//     },
//     specialty: {
//       id: 3,
//       name: "Neurología",
//       description: "Especialista en sistema nervioso",
//       cost: 180,
//       status: true
//     },
//     office: {
//       id: 3,
//       name: "Consultorio C",
//       address: "Av. Principal 123",
//       floor: 3,
//       officeNumber: "302",
//       status: true,
//       specialtyIds: [3]
//     },
//     date: "2025-11-19",
//     startTime: "15:00:00",
//     endTime: "17:00:00",
//     status: true
//   }
// ];

export const HoraryPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [view, setView] = useState('month'); // 'month' o 'week'

  const { data:mockSchedules } = useObtenerTodosLosHorariosQuery();

  const { modalHoraryState } = useHoraryStore();

  // Función para obtener días del mes
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Días del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length; // 6 semanas
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  // Función para obtener horarios de un día específico
  const getSchedulesForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return mockSchedules?.filter(schedule => schedule.date === dateStr);
  };

  // Navegación
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const days = getDaysInMonth(currentDate);
  const today = new Date().toDateString();

  // Colores por especialidad
  const specialtyColors = {
    'Cardiología': 'bg-red-100 border-red-300 text-red-700',
    'Pediatría': 'bg-blue-100 border-blue-300 text-blue-700',
    'Neurología': 'bg-purple-100 border-purple-300 text-purple-700',
  };

  return (
    <section className="h-full flex flex-col bg-slate-50">
      {modalHoraryState && <ModalHorary />}
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border-b border-slate-200 px-6 py-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Horarios médicos</h1>
          <p className="text-sm text-slate-500">
            Gestiona y visualiza los horarios de consulta de los doctores.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BtnAddHorary />
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
              const schedules = getSchedulesForDate(day.date);
              const isToday = day.date.toDateString() === today;
              
              return (
                <div
                  key={index}
                  className={`h-[90px] p-2 overflow-y-auto ${
                    !day.isCurrentMonth ? 'bg-slate-50' : 'bg-white'
                  } hover:bg-slate-50 transition-colors`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-sm font-medium ${
                        !day.isCurrentMonth
                          ? 'text-slate-400'
                          : isToday
                          ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs'
                          : 'text-slate-700'
                      }`}
                    >
                      {day.date.getDate()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {schedules?.map((schedule) => (
                      <button
                        key={schedule.id}
                        onClick={() => setSelectedSchedule(schedule)}
                        className={`w-full text-left px-2 py-1 rounded border text-xs ${
                          specialtyColors[schedule.specialty.name] || 'bg-gray-100 border-gray-300 text-gray-700'
                        } hover:opacity-80 transition-opacity`}
                      >
                        <div className="font-medium truncate">
                          {schedule.startTime.slice(0, 5)} - {schedule.doctor.name} {schedule.doctor.lastname}
                        </div>
                        <div className="text-xs truncate opacity-75">
                          {schedule.specialty.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Modal de detalles */}
      {selectedSchedule && (
        <div
          className="fixed inset-0 bg-gray-500/90 bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedSchedule(null)}
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
                  onClick={() => setSelectedSchedule(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Doctor */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <User className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">Doctor</div>
                    <div className="text-base font-semibold text-slate-900">
                      Dr. {selectedSchedule.doctor.name} {selectedSchedule.doctor.lastname}
                    </div>
                    <div className="text-sm text-slate-600">
                      DNI: {selectedSchedule.doctor.dni} | Código: {selectedSchedule.doctor.codigo}
                    </div>
                  </div>
                </div>

                {/* Especialidad */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">Especialidad</div>
                    <div className="text-base font-semibold text-slate-900">
                      {selectedSchedule.specialty.name}
                    </div>
                    <div className="text-sm text-slate-600">
                      {selectedSchedule.specialty.description}
                    </div>
                    <div className="text-sm font-medium text-slate-900 mt-1">
                      Costo: S/ {selectedSchedule.specialty.cost}
                    </div>
                  </div>
                </div>

                {/* Horario */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <Clock className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">Horario</div>
                    <div className="text-base font-semibold text-slate-900">
                      {new Date(selectedSchedule.date).toLocaleDateString('es-ES', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-slate-600">
                      {selectedSchedule.startTime.slice(0, 5)} - {selectedSchedule.endTime.slice(0, 5)}
                    </div>
                  </div>
                </div>

                {/* Consultorio */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">Consultorio</div>
                    <div className="text-base font-semibold text-slate-900">
                      {selectedSchedule.office.name} - #{selectedSchedule.office.officeNumber}
                    </div>
                    <div className="text-sm text-slate-600">
                      {selectedSchedule.office.address} - Piso {selectedSchedule.office.floor}
                    </div>
                  </div>
                </div>

                {/* Empleado asistente */}
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <User className="w-5 h-5 text-slate-600 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-500">Asistente</div>
                    <div className="text-base font-semibold text-slate-900">
                      {selectedSchedule.employee.name} {selectedSchedule.employee.lastname}
                    </div>
                    <div className="text-sm text-slate-600">
                      {selectedSchedule.employee.role} | DNI: {selectedSchedule.employee.dni}
                    </div>
                  </div>
                </div>

                {/* Estado */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <span className="text-sm font-medium text-slate-700">Estado</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedSchedule.status
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {selectedSchedule.status ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedSchedule(null)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
