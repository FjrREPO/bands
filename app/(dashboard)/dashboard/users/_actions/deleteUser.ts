"use server"

import prisma from "@/lib/prisma/prisma";

export async function DeleteUser(id: string) {
    const movie = await prisma.user.deleteMany({
        where: {
            id: id
        }
    })

    if (!movie) {
        throw new Error("User tidak ditemukan");
    }
}
