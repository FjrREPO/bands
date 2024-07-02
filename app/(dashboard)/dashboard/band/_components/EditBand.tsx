"use client";

import { useState} from 'react';
import axios from 'axios';
import { Select, SelectContent, SelectGroup, SelectTrigger } from '@/components/ui/select';
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import ImageUpload from '@/components/uploader/image-upload';
import { musicGenres } from '@/data/music-genres';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { Band } from '@prisma/client';

interface Props {
    band: Band;
    trigger: React.ReactNode;
}

export default function EditBand({ band, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const [bandRilis, setBandRilis] = useState<string>(band.band_rilis || '');
    const [bandName, setBandName] = useState<string>(band.band_nama);
    const [bandDeskripsi, setBandDeskripsi] = useState<string>(band.band_deskripsi || "");
    const [bandFollowers, setBandFollowers] = useState<number>(band.band_follower || 0);
    const [bandImages, setBandImages] = useState<string>(band.band_gambar || '');
    const [bandGenres, setBandGenres] = useState<string[]>(band.band_genre || []);

    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {

        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (pending) return;

        setPending(true);
        data.band_nama = bandName;
        data.band_deskripsi = bandDeskripsi;
        data.band_genre = bandGenres;
        data.band_gambar = bandImages;
        data.band_follower = bandFollowers;

        try {
            const formattedData = {
                ...data
            };
            await axios.put(`/api/band/${band.band_id}`, formattedData);
            toast.success('Band created successfully!');
            reset();
            setOpen(false);
            window.location.reload()
        } catch (error) {
            toast.error('Failed to create band.');
        } finally {
            setPending(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Band</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-1/2'>
                            <Label>Band Nama</Label>
                            <Input {...register('band_nama')} value={bandName} placeholder='Band Name' onChange={(e) => {
                                setBandName(e.target.value);
                            }} />
                        </div>
                        <div className='w-1/2'>
                            <Label>Genre</Label>
                            <Select>
                                <SelectTrigger>
                                    <Input
                                        type='text'
                                        readOnly
                                        value={bandGenres.length > 0 ? bandGenres.join(', ') : "Pilih genre"}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {musicGenres.genres.map((genre: string, index: number) => (
                                        <SelectGroup
                                            key={index}
                                            className='cursor-pointer'
                                            onClick={() => {
                                                const updatedGenres = bandGenres.includes(genre)
                                                    ? bandGenres.filter((g) => g !== genre)
                                                    : [...bandGenres, genre];
                                                setBandGenres(updatedGenres);
                                                setValue('band_genre', updatedGenres);
                                            }}
                                        >
                                            {genre}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-1/2'>
                            <Label>Band Deskripsi</Label>
                            <Input type="text" {...register('band_deskripsi')} value={bandDeskripsi} onChange={(e) => {
                                setBandDeskripsi(e.target.value);
                            }} />
                        </div>
                        <div className='w-1/2'>
                            <Label>Band Followers</Label>
                            <Input type="number" {...register('band_follower')} value={bandFollowers} onChange={(e) => {
                                setBandFollowers(parseInt(e.target.value));
                            }} />
                        </div>
                    </div>
                    <div className='w-full'>
                        <Label>Band Rilis</Label>
                        <Input type="date" {...register('band_rilis')} value={bandRilis} onChange={(e) => {
                            setBandRilis(e.target.value);
                        }} />
                    </div>
                    <div className='w-full'>
                        <Label>Band Gambar</Label>
                        <ImageUpload
                            value={bandImages}
                            onChange={(e: any) => {
                                setBandImages(e.target.value);
                                setValue('band_gambar', e);
                            }}
                        />
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSubmit(onSubmit)} disabled={pending}>
                        {pending && <Loader className="shrink-0 h-4 w-4 mr-2 animate-spin" />}
                        {pending ? "Updating..." : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
