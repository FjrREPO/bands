"use client";

import { useState, useEffect, useContext } from 'react';
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
import { SpotifyContext } from '@/components/providers/SpotifyProviders';
import { getBandsSpotify } from '@/lib/spotify/search/get-band-spotify';
import { getBandsByIdSpotify } from '@/lib/spotify/band/get-band-byid-spotify';

interface Props {
    trigger: React.ReactNode;
}

export default function TambahBand({ trigger }: Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [data, setData] = useState<any>([]);
    const [selectedBandId, setSelectedBandId] = useState<string>('');
    const { token, loading, setLoading, error, setError } = useContext<any>(SpotifyContext);
    const [pending, setPending] = useState(false);

    const [bandRilis, setBandRilis] = useState<string>('');
    const [bandName, setBandName] = useState<string>('');
    const [bandDeskripsi, setBandDeskripsi] = useState<string>('');
    const [bandFollowers, setBandFollowers] = useState<number>(0);
    const [bandImages, setBandImages] = useState<string>('');
    const [bandGenres, setBandGenres] = useState<string[]>([]);
    const [bandSavedId, setBandSavedId] = useState<string>('');


    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {},
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (pending) return;

        setPending(true);

        try {
            const formattedData = {
                ...data
            };
            await axios.post('/api/band', formattedData);
            toast.success('Band created successfully!');
            reset();
            setOpen(false);
            setTimeout(() => {
                window.location.reload()
            }, 1500)
        } catch (error) {
            toast.error('Failed to create band.');
        } finally {
            setPending(false);
        }
    };

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null;

        const fetchSpotifyData = async () => {
            if (!token || query.length < 2) return;
            setLoading(true);
            setError(null);

            try {
                const fetchedData: any = await getBandsSpotify(query, token);
                setData(fetchedData);
            } catch (error) {
                setError('Failed to fetch bands');
            } finally {
                setLoading(false);
            }
        };

        const fetchBandDataById = async () => {
            if (!selectedBandId) return
            try {
                const bandData: any = await getBandsByIdSpotify(selectedBandId, token);
                setBandName(bandData.name);
                setBandFollowers(bandData.followers.total);
                setBandRilis(bandData.release_date);
                setBandImages(bandData.images[0].url);
                setBandGenres(bandData.genres);
                setBandSavedId(bandData.id);

                setValue('band_nama', bandData.name);
                setValue('band_follower', bandData.followers.total);
                setValue('band_rilis', bandData.release_date);
                setValue('band_gambar', bandData.images[0].url);
                setValue('band_genre', bandData.genres);
                setValue('band_id_spotify', bandData.id.toString());
            } catch (error) {
                console.error(error);
            } finally {
                setPending(false);
            }
        }

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fetchSpotifyData();
            fetchBandDataById();
        }, 500);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [query, token, setLoading, setError, selectedBandId, pending]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Band</DialogTitle>
                </DialogHeader>
                <div className='flex flex-row gap-5'>
                    <div className='w-1/2'>
                        <Input
                            type="text"
                            value={query}
                            onChange={(e: any) => setQuery(e.target.value)}
                            placeholder="Search for band"
                        />
                    </div>
                    <div className='w-1/2'>
                        <Select>
                            <SelectTrigger>
                                <Input
                                    type='text'
                                    readOnly
                                    value={bandName ? bandName : "Pilih band"}
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {data.map((band: any) => (
                                    <SelectGroup
                                        key={band.id}
                                        className='cursor-pointer'
                                        onClick={() => {
                                            setSelectedBandId(band.id);
                                        }}
                                    >
                                        {band.name}
                                    </SelectGroup>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-1/2'>
                            <Label>Band Name</Label>
                            <Input {...register('band_name')} value={bandName} placeholder='Band Name' onChange={(e) => {
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
                                                setValue('band_genres', updatedGenres);
                                            }}
                                        >
                                            {genre}
                                        </SelectGroup>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className='w-full'>
                        <Label>Band Rilis</Label>
                        <Input type="date" {...register('band_rilis')} value={bandRilis} onChange={(e) => {
                            setBandRilis(e.target.value);
                        }} />
                    </div>
                    <div className='w-full'>
                        <Label>Band Deskripsi</Label>
                        <Input type="text" {...register('band_deskripsi')} value={bandDeskripsi} onChange={(e) => {
                            setBandDeskripsi(e.target.value);
                        }} />
                    </div>
                    <div className='w-full'>
                        <Label>Band Followers</Label>
                        <Input type="number" {...register('band_follower')} value={bandFollowers} onChange={(e) => {
                            setBandFollowers(parseInt(e.target.value));
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
                        {pending ? "Creating..." : "Create"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}