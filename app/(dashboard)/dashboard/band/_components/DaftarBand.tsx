"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus, Trash } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import SkeletonWrapper from "@/components/loader/skeleton-wrapper";
import CreateArtistDialog from "./TambahBand";
import DeleteArtistDialog from "./HapusBand";
import Image from "next/image";
import { BsPersonBadge } from "react-icons/bs";
import EditArtistDialog from "./EditBand";
import { Band } from "@prisma/client";

export default function DaftarBand() {
    return (
        <>
            <div className="border-b bg-card">
                <div className="container flex flex-wrap items-center justify-between md:flex-nowrap gap-6 py-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Band</h2>
                        <p>
                            Atur bandmu dengan menambahkan band atau menghapus bandmu.
                        </p>
                    </div>
                </div>
            </div>
            <div className="container flex flex-col gap-4 p-4">
                <CategoryList />
            </div>
        </>
    );
}

function CategoryList() {
    const bands = useQuery({
        queryKey: ["band"],
        queryFn: () =>
            fetch(`/api/band`).then((res) => res.json()),
    });

    const dataAvailable = bands.data && bands.data.length > 0;

    return (
        <SkeletonWrapper isLoading={bands.isLoading}>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <BsPersonBadge className="h-12 w-12 items-center rounded-xl p-2" />
                            <span>
                                Band
                            </span>
                        </div>

                        <CreateArtistDialog
                            trigger={
                                <Button className="gap-2 text-sm flex flex-row items-center">
                                    <Plus className="h-6 w-6" />
                                    <span>Tambah Band</span>
                                </Button>
                            }
                        />
                    </CardTitle>
                </CardHeader>
                <Separator />
                {!dataAvailable && (
                    <div className="flex h-40 w-full flex-col items-center justify-center">
                        <p>
                            Band tidak ditemukan{" "}
                            <span
                                className={cn(
                                    "m-1",
                                    "text-green-500"
                                )}
                            >
                                {"Band"}
                            </span>
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Kamu bisa menambahkan Band.
                        </p>
                    </div>
                )}
                {dataAvailable && (
                    <div className="flex flex-row flex-wrap gap-4 p-4">
                        {bands.data.map((band: Band) => (
                            <CardBand
                                key={band.band_id}
                                band={band}
                            />
                        ))}
                    </div>
                )}
            </Card>
        </SkeletonWrapper>
    );
}

function CardBand({ band }: { band: Band }) {
    return (
        <div className="flex border-separate flex-col px-2 pb-2 justify-between rounded-lg border shadow-sm shadow-black/[0.1] dark:shadow-white/[0.1]">
            <div className="flex flex-col items-center gap-2 p-4">
                <span>{band.band_nama}</span>
                <Image
                    src={band.band_gambar && band?.band_gambar}
                    width={100}
                    height={100}
                    className="rounded-lg"
                    alt="image"
                />
            </div>
            <div className="w-full flex flex-row gap-2">
                <DeleteArtistDialog
                    band={band}
                    trigger={<Button variant="destructive" className="w-1/2"><Trash className="h-4 w-4"/></Button>}
                />
                <EditArtistDialog
                    band={band}
                    trigger={<Button className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white"><Pencil className="h-4 w-4"/></Button>}
                />
            </div>
        </div>
    );
}