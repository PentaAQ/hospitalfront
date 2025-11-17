import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";


export const LayoutAdmin = () => {
  return (
    <div className="h-screen w-full flex">
      <section className="w-1/5 h-full">
        <Sidebar />
      </section>
      <section className="w-4/5 h-full">
        <Outlet />
      </section>
    </div>
  );
};
