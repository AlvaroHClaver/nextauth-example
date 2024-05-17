import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

export default async function () {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <h1>Nome do Usuário: {session?.username}</h1>
      <h1>Id do Usuário: {session?.id}</h1>
      <h1>Papel do Usuário: {session?.role}</h1>
    </>
  );
}
