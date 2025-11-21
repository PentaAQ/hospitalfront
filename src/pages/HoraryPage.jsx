import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useObtenerTodosLosHorariosQuery } from "../stack/HoraryStack";
import { BtnAddHorary } from "../components/ui/BtnAddHorary";
import { ModalHorary } from "../components/modals/ModalHorary";
import { useHoraryStore } from "../store/HoraryStore";
import { useHoraryCalendar } from "../hooks/useHoraryCalendar";
import { HoraryScheduleDetails } from "../components/HoraryScheduleDetails";

export const HoraryPage = () => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const { data: schedules } = useObtenerTodosLosHorariosQuery();

  const { modalHoraryState } = useHoraryStore();

  const {
    currentDate,
    days,
    today,
    monthNames,
    dayNames,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getSchedulesForDate,
  } = useHoraryCalendar(schedules);

  // Colores por especialidad
  const specialtyColors = {
    Cardiología: "bg-red-100 border-red-300 text-red-700",
    Pediatría: "bg-blue-100 border-blue-300 text-blue-700",
    Neurología: "bg-purple-100 border-purple-300 text-purple-700",
  };

  return (
    <section className="h-full flex flex-col bg-slate-50">
      {modalHoraryState && <ModalHorary />}
      {/* Header */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border-b border-slate-200 px-6 py-4">
        <div>
          <h1 className="text-2xl max-lg:text-xl font-semibold text-slate-900">
            Horarios médicos
          </h1>
          <p className="text-sm text-slate-500 max-lg:hidden">
            Gestiona y visualiza los horarios de consulta de los doctores.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BtnAddHorary />
          <button
            onClick={goToToday}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
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
            <div className="px-4 py-2 font-medium text-slate-900 border-x border-slate-300 min-w-[140px] text-center text-xs">
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
                  </div>

                  <div className="space-y-1">
                    {schedules?.map((schedule) => (
                      <button
                        key={schedule.id}
                        onClick={() => setSelectedSchedule(schedule)}
                        className={`w-full text-left px-2 py-1 rounded border text-xs ${
                          specialtyColors[schedule.specialty.name] ||
                          "bg-gray-100 border-gray-300 text-gray-700"
                        } hover:opacity-80 transition-opacity`}
                      >
                        <div className="font-medium truncate">
                          {schedule.startTime.slice(0, 5)} -{" "}
                          {schedule.doctor.name} {schedule.doctor.lastname}
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
        <HoraryScheduleDetails
          schedule={selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
        />
      )}
    </section>
  );
};
