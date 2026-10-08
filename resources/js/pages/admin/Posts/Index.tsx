import React from "react";
import { Head, Link, router } from "@inertiajs/react";
import ParishLayout from "../../../layouts/ParishLayout";

interface Post {
    id: number;
    title: string;
    image_path: string | null;
    is_published: number | boolean;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedPosts {
    data: Post[];
    links: PaginationLink[];
}

interface IndexProps {
    posts: PaginatedPosts;
}

export default function Index({ posts }: IndexProps) {
    const handleDelete = (id: number) => {
        if (confirm("Czy na pewno chcesz usunąć post?")) {
            router.delete(`/admin/aktualnosci/${id}`, {
                preserveScroll: true,
                onSuccess: () => alert("Post został usunięty"),
                onError: () => alert("Wystąpił błąd podczas usuwania"),
            });
        }
    };

    return (
        <ParishLayout showpic={false}>
            <Head title="Zarządzanie Aktualnościami" />

            <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
                    <Link
                        href="/admin/dashboard"
                        className="text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors"
                    >
                        &laquo; Kokpit
                    </Link>
                    <h1 className="text-2xl font-bold uppercase tracking-wider text-stone-800">
                        Aktualności
                    </h1>
                    <Link
                        href="/admin/aktualnosci/dodaj"
                        className="bg-[#cca572] text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
                    >
                        + Dodaj nowy post
                    </Link>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-stone-200 text-stone-500 text-xs uppercase tracking-wider">
                                <th className="p-3">Zdjęcia</th>
                                <th className="p-3">Tytuł</th>
                                <th className="p-3">Data utworzenia</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-right">Akcje</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100 text-stone-700 text-sm">
                            {posts.data.map((post) => (
                                <tr key={post.id} className="hover:bg-stone-50">
                                    <td className="p-3">
                                        <div className="w-16 h-12 bg-stone-200 rounded overflow-hidden">
                                            {post.image_path ? (
                                                <img
                                                    src={post.image_path}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-[10px] text-stone-400 flex items-center justify-center h-full">
                                                    Brak
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="p-3 font-bold text-stone-900">
                                        {post.title}
                                    </td>
                                    <td className="p-3">
                                        {new Date(
                                            post.created_at,
                                        ).toLocaleDateString("pl-PL")}
                                    </td>
                                    <td className="p-3">
                                        {post.is_published ? (
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                                Opublikowany
                                            </span>
                                        ) : (
                                            <span className="bg-stone-200 text-stone-600 px-2 py-1 rounded text-xs font-semibold">
                                                Ukryty
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 text-right space-x-2">
                                        <Link
                                            href={`/admin/aktualnosci/${post.id}/edytuj`}
                                            className="inline-block text-stone-600 hover:text-stone-900 font-semibold text-xs uppercase tracking-wider border border-stone-200 px-3 py-1 rounded hover:bg-stone-50 transition-colors"
                                        >
                                            Edytuj
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="text-red-600 hover:text-red-900 font-semibold text-xs uppercase tracking-wider border border-red-200 px-3 py-1 rounded hover:bg-red-50 transition-colors"
                                        >
                                            Usuń
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {posts.data.length === 0 && (
                        <div className="text-center text-stone-400 py-12 italic">
                            Brak postów w bazie danych
                        </div>
                    )}
                </div>

                {posts.links && posts.links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-1 mt-6 pt-4 border-t border-stone-200">
                        {posts.links.map((link, index) => {
                            const translatedLabel = link.label.replace('Previous', '&laquo;').replace('Next', '&raquo;');
                            return !link.url ? (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm border bg-stone-50 text-stone-400 border-stone-200"
                                    dangerouslySetInnerHTML={{ __html: translatedLabel }}
                                />
                            ) : (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1 text-sm border flex items-center justify-center transition-all ${
                                        link.active ? "bg-[#cca572] text-white border-[#cca572] font-bold shadow-sm" : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: translatedLabel }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </ParishLayout>
    );
}