import prisma from "@/lib/prisma/prisma";
import { NextResponse } from "next/server";

export async function PUT(
    request: Request,
    { params }: { params: { bandId: string } }
) {
    const body = await request.json();
    const {
        band_nama,
        band_deskripsi,
        band_follower,
        band_rilis,
        band_gambar,
        band_genre,
    } = body;

    const bands = await prisma.band.update({
        where: { band_id: params.bandId },
        data: {
            band_nama,
            band_deskripsi,
            band_follower,
            band_rilis,
            band_gambar,
            band_genre,
        },
    });

    return NextResponse.json(bands);
}

export async function DELETE(
    request: Request,
    { params }: { params: { bandId: string } }
) {
    const bands = await prisma.band.delete({
        where: { band_id: params.bandId },
    });
    return NextResponse.json(bands);
}