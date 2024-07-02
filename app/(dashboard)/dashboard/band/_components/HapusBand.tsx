"use client";

import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Band } from "@prisma/client";

interface Props {
    trigger: React.ReactNode;
    band: Band;
}

export default function HapusBand({ trigger, band }: Props) {
    const deleteBand = async () => {
        try {
            const response = await axios.delete(`/api/band/${band.band_id}`);
            return response;
        } catch (error) {
            console.error("Error deleting band:", error);
            throw error;
        }
    };

    const handleDeleteClick = async () => {
        toast.loading("Removing band...");
        try {
            await deleteBand();
        } catch (error) {
            toast.error("Error when deleting band");
        } finally {
            toast.success('Band deleted successfully');
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Apakah anda yakin mengahpus band {band.band_nama}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Data yang anda hapus tidak dapat dikembalikan.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteClick}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
