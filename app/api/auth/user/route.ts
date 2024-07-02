import prisma from "@/lib/prisma/prisma";

export async function GET(request: Request) {
    const user = await prisma.user.findMany();
    return Response.json(user);
}

export type getUserType = Awaited<ReturnType<typeof getUserById>>


async function getUserById(user_id: any) {
    const users = await prisma.user.findMany({
        where: {
            id: user_id
        }
    });

    return users.map((user) => ({
        ...user
    }));
}