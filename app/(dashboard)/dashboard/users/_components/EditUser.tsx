"use client";

import { useState } from 'react';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { User } from '@prisma/client';

interface Props {
    trigger: React.ReactNode;
    user: User
}

export default function EditUser({ user, trigger }: Props) {
    const [open, setOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const [username, setUsername] = useState<any>(user.name || '');
    const [userEmail, setUserEmail] = useState<any>(user.email || '');
    const [userRole, setUserRole] = useState<any>(user.role || '');


    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm<FieldValues>({
        defaultValues: {},
    });

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (pending) return;

        setPending(true);
        

        try {
            data.name = username
            data.email = userEmail
            data.role = userRole
            const formattedData = {
                ...data,
            };
            await axios.put(`/api/auth/user/${user.id}`, formattedData);
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
                    <DialogTitle>Edit New User</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className='w-full flex flex-row gap-5'>
                        <div className='w-1/2'>
                            <Label>Username</Label>
                            <Input {...register('name')} value={username} placeholder='Username' onChange={(e) => {
                                setUsername(e.target.value);
                            }} />
                        </div>
                    </div>
                    <div className='w-full'>
                        <Label>Email</Label>
                        <Input type="text" {...register('email')} value={userEmail} onChange={(e) => {
                            setUserEmail(e.target.value);
                        }} />
                    </div>
                    <div className='w-full'>
                        <Label>Role</Label>
                        <Input type="text" {...register('role')} value={userRole} onChange={(e) => {
                            setUserRole(e.target.value);
                        }} />
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