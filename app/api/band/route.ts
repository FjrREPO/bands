import prisma from "@/lib/prisma/prisma"
import { NextResponse } from "next/server"

export async function POST(
    request: Request,
) {
    const body = await request.json()
    const {
        band_nama,
        band_deskripsi,
        band_follower,
        band_gambar,
        band_rilis,
        band_genre,
        band_id_spotify
    } = body

    const bands = await prisma.band.create({
        data: {
            band_nama,
            band_deskripsi,
            band_follower,
            band_gambar,
            band_rilis,
            band_genre,
            band_id_spotify
        },
    })

    return NextResponse.json(bands)
}

export async function GET(
    request: Request
) {
    const bands = await prisma.band.findMany({})

    return NextResponse.json(bands)
}