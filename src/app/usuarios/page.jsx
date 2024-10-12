import axios from "axios";
import Link from "next/link";

async function getUsers() {
  const url = "https://jsonplaceholder.typicode.com/users";
  const users = await axios.get(url);
  return users.data;
}

export default async function Users() {
  const users = await getUsers();
  return (
    <>
      <h1>Usuarios</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i}>
              <td>{user.id}</td>
              <td>
                <Link href={`/usuarios/${user.id}`}>{user.name}</Link> {/* Enlace dinámico */}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
