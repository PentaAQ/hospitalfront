import { NavLink } from "react-router-dom";
import { BtnLogout } from "./ui/BtnLogout";
import { useAuthStore } from "../store/AuthStore";

export const Sidebar = () => {
  const links = [
    {
      name: "Horarios",
      to: "/",
    },
    {
      name: "Especialidades",
      to: "/especialidades",
    },
    {
      name: "Usuarios",
      to: "/users",
    },
    {
      name: "Citas Médicas",
      to: "/citas",
    },
    {
      name: "Historias Médicas",
      to: "/historias",
    },
    {
      name: "Pagos",
      to: "/pagos",
    },
    {
      name: "Pacientes",
      to: "/pacientes",
    },
  ];
  const { user } = useAuthStore();

  return (
    <div className="h-full bg-white text-slate-900 flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-1 pb-4 border-b border-slate-200">
        <span className="text-xs font-semibold tracking-wide text-cyan-600 uppercase">
          Hospital Santa Catalina
        </span>
        <span className="text-xl font-semibold">
          Hola, {user?.name}
        </span>
        <span className="text-xs text-slate-400">DNI: {user?.dni}</span>
      </div>
      <nav className="flex flex-col flex-1 gap-2">
        {links.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-cyan-50 text-cyan-700 border border-cyan-100"
                  : "text-slate-700 hover:bg-slate-50 hover:text-cyan-700 border border-transparent"
              } flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200`
            }
          >
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="pt-2 border-t border-slate-200">
        <BtnLogout />
      </div>
    </div>
  );
};
