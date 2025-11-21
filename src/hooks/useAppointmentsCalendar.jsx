import { useMemo, useState } from "react";

// Hook para manejar la lógica del calendario de citas.
// Recibe la lista de citas y el filtro de estado y devuelve
// la fecha actual, los días del mes y helpers para navegar.
export const useAppointmentsCalendar = (appointments = [], filterStatus = "ALL") => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dayNames = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const today = new Date().toDateString();

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDay, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }

    return days;
  };

  const getAppointmentsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    let filtered = appointments?.filter((apt) => apt.schedule.date === dateStr);

    if (filterStatus !== "ALL") {
      filtered = filtered?.filter((apt) => apt.status === filterStatus);
    }

    return filtered?.sort((a, b) =>
      a.schedule.startTime.localeCompare(b.schedule.startTime)
    );
  };

  const days = useMemo(() => getDaysInMonth(currentDate), [currentDate]);

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return {
    currentDate,
    days,
    today,
    monthNames,
    dayNames,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
    getAppointmentsForDate,
  };
};
