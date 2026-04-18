import NextAuth from "next-auth";
import { auth } from "@/auth";

const handler = NextAuth(auth);

export const { GET, POST } = handler;
