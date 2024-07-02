'use client'

import Homepage from "./_components/Homepage";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  return (
      <Homepage user={session?.user}/>
  );
}
