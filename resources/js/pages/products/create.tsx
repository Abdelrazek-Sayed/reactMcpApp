import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm } from '@inertiajs/react';
import {  Textarea } from '@headlessui/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add New Product',
        href: '/product/create',
    },
];

export default function Create() {
    const {data, setData, post,errors} = useForm({
        name: '',
        description: '',
        price: '',
        image: null as File | null,
    });


    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/product');
    };

    const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <Card>
                    <CardHeader>
                        <CardTitle>Add New Product</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={submit} className="flex flex-col gap-4" autoComplete="off">
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            id="name"
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            className="mt-1 block w-full"
                                            autoFocus
                                            placeholder="Name"
                                        />
                                    {errors.name && <InputError message={errors.name} />}

                                </div>

                                <div className="grid gap-2">
                                        <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        name="description"
                                               id="description"
                                               className="border border-gray-300 rounded-md p-2"
                                               placeholder="Description"/>
                                    {errors.description && <InputError message={errors.description} />}
                                </div>

                                <div className="grid gap-2">
                                        <Label htmlFor="price">Price</Label>
                                    <Input
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        name="price" id="price" type="number"  placeholder="price" />
                                    {errors.price && <InputError message={errors.price} />}
                                </div>

                                <div className="grid gap-2">
                                        <Label htmlFor="price">Featured Image</Label>
                                    <Input
                                        name="image"
                                        id="image"
                                        type="file"
                                        placeholder="image"
                                        // onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                        onChange={(e) => fileUpload(e)} />
                                    {errors.image && <InputError message={errors.image} />}
                                </div>

                            </div>
                            <Button
                                type="submit"
                                className="w-fit mt-4 bg-gray-700 text-white"
                                tabIndex={4}
                            >
                                Save Product
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
