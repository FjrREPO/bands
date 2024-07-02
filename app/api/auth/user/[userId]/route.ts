import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { userId: string } }
) {
    const body = await request.json();
    const {
        name,
        email,
        role
    } = body;

    const users = await prisma.user.update({
        where: { id: params.userId },
        data: {
            name,
            email,
            role,
        },
    });

    return NextResponse.json(users);
}