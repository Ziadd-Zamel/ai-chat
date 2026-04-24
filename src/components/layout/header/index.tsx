import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import Navbar from "./components/navbar";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return <Navbar session={session} />;
}
