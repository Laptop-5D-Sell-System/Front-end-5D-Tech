import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateAccountBody, UpdateAccountBodyType } from '@/validations/account';
import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem } from '@/components/ui/form';

export default function EditAccount({
    id,
    setId,
    onSubmitSuccess,
}: {
    id?: string | undefined;
    setId: (value: string) => void;
    onSubmitSuccess?: () => void;
}) {
    const [file, setFile] = useState<File | undefined>();
    const avatarInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<UpdateAccountBodyType>({
        resolver: zodResolver(updateAccountBody),
        defaultValues: {
            email: '',
            name: '',
            avatar: '',
            password: '',
            confirmPassword: '',
            changePassword: false,
        },
    });

    const avatar = form.watch('avatar');
    const name = form.watch('name');

    const previewAvatarFromFile = useMemo(() => {
        return file ? URL.createObjectURL(file) : avatar;
    }, [file, avatar]);

    return (
        <Dialog
            open={Boolean(id)}
            onOpenChange={(value) => {
                if (!value) {
                    setId('');
                }
            }}
        >
            <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
                <DialogHeader>
                    <DialogTitle>Cập nhật tài khoản</DialogTitle>
                    <DialogDescription>Các trường tên, email, mật khẩu là bắt buộc</DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form noValidate className="grid auto-rows-max items-start gap-4 md:gap-8" id="edit-employee-form">
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="avatar"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex gap-2 items-start justify-start">
                                            <Avatar className="aspect-square w-[100px] h-[100px] rounded-md object-cover">
                                                <AvatarImage src={previewAvatarFromFile} />
                                                <AvatarFallback className="rounded-none">
                                                    {name || 'Avatar'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={avatarInputRef}
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setFile(file);
                                                        field.onChange('http://localhost:3000/' + file.name);
                                                    }
                                                }}
                                                className="hidden"
                                            />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
