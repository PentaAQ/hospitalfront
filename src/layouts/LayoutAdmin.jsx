import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";


export const LayoutAdmin = () => {
  return (
    <div className="h-screen w-full bg-slate-50 flex overflow-hidden">
      <section className="w-1/5 h-full border-r border-slate-200 bg-white">
        <Sidebar />
      </section>
      <section className="w-4/5 h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="h-full w-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};
