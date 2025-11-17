import { ModalUser } from "../components/ModalUser";
import { RowTableUsers } from "../components/RowTableUsers";
import { BtnAddUser } from "../components/ui/BtnAddUser";
import { useUserStore } from "../store/UserStore";
import { useMostrarUsuariosQuery } from "../stack/UserStack";

export const UsersPage = () => {
  const { modalUserState } = useUserStore();
  const { data: users } = useMostrarUsuariosQuery();
  console.log(users);
  

  return (
    <section>
        {modalUserState && <ModalUser />}
        <header className="flex justify-between items-center p-4 border-b-2 border-gray-300">
            <h1 className="text-2xl font-semibold">Usuarios</h1>
            <BtnAddUser />
        </header>
        <main className="p-2">
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Rol</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user) => (
                        <RowTableUsers user={user} key={user.id} />
                    ))}
                </tbody>
            </table>
        </main>
    </section>
  );
};
