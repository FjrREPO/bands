import prisma from "@/lib/prisma/prisma";

export async function GET(request: Request) {
    const user = await prisma.user.findMany();
    return Response.json(user);
}

export type getUserType = Awaited<ReturnType<typeof getUserById>>

export const getUserById = async(user_id: any) => {
    const user = await prisma.user.findMany({
        where: {
            id: user_id
        }
    })
    return user
}