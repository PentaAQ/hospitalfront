import { ModalUser } from "../components/ModalUser";
import { RowTableUsers } from "../components/RowTableUsers";
import { BtnAddUser } from "../components/ui/BtnAddUser";
import { useUserStore } from "../store/UserStore";
import { useMostrarUsuariosQuery } from "../stack/UserStack";

export const UsersPage = () => {
  const { modalUserState } = useUserStore();
  const { data: users } = useMostrarUsuariosQuery();

  return (
    <section className="h-full flex flex-col">
      {modalUserState && <ModalUser />}
      <header className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-4 mb-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Usuarios</h1>
          <p className="text-sm text-slate-500">
            Gestiona los usuarios y permisos del sistema.
          </p>
        </div>
        <BtnAddUser />
      </header>
      <main className="flex-1 overflow-auto">
        <div className="w-full overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Apellido</th>
                <th className="px-4 py-3 text-left">DNI</th>
                <th className="px-4 py-3 text-left">Rol</th>
                <th className="px-4 py-3 text-center">Estado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users?.map((user) => (
                <RowTableUsers user={user} key={user.id} />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
};
