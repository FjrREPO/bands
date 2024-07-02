import prisma from "@/lib/prisma/prisma";
import { getSession } from "next-auth/react";

export default async function getUser() {
    try {
        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
        };
    } catch (error: any) {
        return null;
    }
}