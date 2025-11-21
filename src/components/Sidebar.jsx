import { NavLink } from "react-router-dom";
import { BtnLogout } from "./ui/BtnLogout";
import { useAuthStore } from "../store/AuthStore";
import { Icon } from "@iconify/react";

export const Sidebar = () => {
  const links = [
    {
      name: "Horarios",
      to: "/",
      icon: "mdi:clock-time-four-outline",
    },
    {
      name: "Especialidades",
      to: "/especialidades",
      icon: "mdi:injection",
    },
    {
      name: "Usuarios",
      to: "/users",
      icon: "mdi:account-group-outline",
    },
    {
      name: "Citas Médicas",
      to: "/citas",
      icon: "mdi:calendar-blank-outline",
    },
    {
      name: "Historias Médicas",
      to: "/historias",
      icon: "tabler:clock-hour-5",
    },
    {
      name: "Pagos",
      to: "/pagos",
      icon: "material-symbols:payments",
    },
    {
      name: "Pacientes",
      to: "/pacientes",
      icon: "mdi:patient-outline",
    },
    {
      name: "Consultorios",
      to: "/consultorios",
      icon: "vaadin:office",
    },
  ];
  const { user } = useAuthStore();

  return (
    <div className="h-full bg-white text-slate-900 flex flex-col gap-6 p-4 max-lg:p-1">
      <div className="flex flex-col gap-1 pb-4 border-b border-slate-200">
        <span className="text-xs font-semibold tracking-wide text-cyan-600 uppercase max-lg:text-center">
          Hospital Santa Catalina
        </span>
        <span className="text-xl font-semibold max-lg:text-center">
          <span className="font-medium max-lg:hidden">Hola,</span> {user?.name}
        </span>
        <span className="text-xs text-slate-400 max-lg:text-center">
          <span className="font-medium max-lg:hidden">DNI:</span> {user?.dni}
        </span>
      </div>
      <nav className="flex flex-col flex-1 gap-2 ">
        {links.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-cyan-50 text-cyan-700 border border-cyan-100"
                  : "text-slate-700 hover:bg-slate-50 hover:text-cyan-700 border border-transparent"
              } flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200 max-lg:justify-center`
            }
          >
            <Icon icon={item.icon} width="24" height="24" />
            <span className="text-sm font-medium max-lg:hidden">
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>
      <div className="pt-2 border-t border-slate-200">
        <BtnLogout />
      </div>
    </div>
  );
};
