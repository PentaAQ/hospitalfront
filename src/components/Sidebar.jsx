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
      name: "Citas Medicas",
      to: "/citas",
    },
    {
      name: "Historias Medicas",
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
    <div className="h-full bg-white border-r-2 border-gray-200 text-black flex flex-col gap-5 p-3">
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold">
          Bienvenido, {user?.name}{" "}
        </span>
        <i className="text-sm text-gray-400">DNI: {user?.dni}</i>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        {links.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `${
                isActive
                  ? "bg-cyan-200 text-cyan-600 hover:text-cyan-600"
                  : "hover:bg-cyan-100 hover:text-cyan-600"
              } text-center p-2 rounded-md text-neutral-800 font-medium transition-colors duration-300 ease-in-out`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <BtnLogout />
    </div>
  );
};
