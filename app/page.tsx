'use client'

import { useSession } from "next-auth/react";
import Homepage from "./_components/Homepage";

export default function Home() {
  const user = useSession().data?.user;

  return (
      <Homepage user={user}/>
  );
}
