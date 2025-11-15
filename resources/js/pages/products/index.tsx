import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage, } from '@inertiajs/react';
import { Button } from '@headlessui/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Manage Products',
        href: '/product',
    },
];

export default function Index() {
    const { products } = usePage().props as { products: any[] };
    const { props }    = usePage();
    const flash        = props.flash as { success?: string; error?: string };

    // const { flash } = usePage().props
    // const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash.message) {
            setToast({
                message: flash.message,
                type: flash.type || 'success'
            })

            setTimeout(() => setToast(null), 3000)
        }
    }, [flash])

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Products" />

            {/*{toast && (*/}
            {/*    <div className={`toast toast-${toast.type}`}>*/}
            {/*        {toast.message}*/}
            {/*    </div>*/}
            {/*)}*/}

            {flash.success && (
                <div className="mb-4 rounded bg-green-100 text-green-800 justify-end p-3 w-100">
                    {flash.success}
                </div>
            )}

            {flash.error && (
                <div className="mb-4 rounded bg-red-100 text-red-800 p-3">
                    {flash.error}
                </div>
            )}
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Products</h2>
                    <Link  href='product/create'  className="hover:bg-gray-500 bg-gray-700 w-30  text-white text-center border rounded-sm">
                        Add Product
                    </Link>
                </div>
                <div className="overflow-hidden rounded-lg border bg-white shadow-sm">

                    <table className="w-full table-auto">
                        <thead>
                        <tr className="bg-gray-700 text-white">
                            <th className="p-4 border">#</th>
                            <th className="p-4 border">name</th>
                            <th className="p-4 border">Description</th>
                            <th className="p-4 border">Price</th>
                            <th className="p-4 border">Stock</th>
                            <th className="p-4 border">Featured Image</th>
                            <th className="p-4 border">Original Featured Image</th>
                            <th className="p-4 border">Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {products.map((product, index) => (
                            <tr key={product.id}>
                                <td className="px-4 py-2 border text-center">{index + 1}</td>
                                <td className="px-4 py-2 border text-center">{product.name}</td>
                                <td className="px-4 py-2 border text-center">{product.description}</td>
                                <td className="px-4 py-2 border text-center">{product.price}</td>
                                <td className="px-4 py-2 border text-center">{product.stock}</td>
                                {/*<td className="px-4 py-2 border text-center">{product.featured_image}</td>*/}
                                {/*<td className="px-4 py-2 border text-center">{product.original_featured_image}</td>*/}

                                <td className="px-4 py-2 border text-center">
                                    {product.featured_image ? (
                                        <img
                                            src={`${product.featured_image}`}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>

                                <td className="px-4 py-2 border text-center">
                                    {product.original_featured_image ? (
                                        <img
                                            src={`${product.original_featured_image}`}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                    ) : (
                                        <span>-</span>
                                    )}
                                </td>

                                <td className="px-4 py-2 border text-center">
                                    <div className="flex justify-center space-x-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/products/${product.id}`}>
                                                <Eye className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link href={`/products/${product.id}/edit`}>
                                                <Pencil className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-900">
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        </tbody>
                    </table>
                </div>
             </div>
        </AppLayout>
    );
}
