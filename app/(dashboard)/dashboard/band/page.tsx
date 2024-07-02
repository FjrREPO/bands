'use client'

import NavbarDashboard from "@/components/NavbarDashboard";
import DaftarBand from "./_components/DaftarBand";
import { useSession } from "next-auth/react";

export default function page() {
    const user = useSession().data?.user;
    
    return (
        <div>
            <NavbarDashboard users={user}/>
            <DaftarBand />
        </div>
    )
}
