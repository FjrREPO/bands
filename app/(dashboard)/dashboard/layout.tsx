import { RoleGate } from "@/components/auth/role-gate";
import { UserRole } from "@prisma/client";
import React from "react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <RoleGate allowedRole={UserRole.ADMIN}>
            <main className="relative flex flex-col h-screen w-full">
                <div className="w-full">{children}</div>
            </main>
        </RoleGate>
    );
}
