import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

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
    flash?: {
        success?: string;
    };
}

export default function Index({ posts, flash }: IndexProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(posts.data.map((p) => p.id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(
                selectedIds.filter((selectedId) => selectedId !== id),
            );
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleLotDelete = () => {
        if (
            confirm(
                `Czy chcesz na pewno usunąć ${selectedIds.length} zaznaczonych postów?`,
            )
        ) {
            router.delete("/admin/aktualnosci/wiele", {
                data: { ids: selectedIds },
                preserveScroll: true,
                onSuccess: () => setSelectedIds([]),
                onError: () => alert("Wystąpił błąd podczas usuwania"),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Czy na pewno chcesz usunąć ten post?")) {
            router.delete(`/admin/aktualnosci/${id}`, {
                preserveScroll: true,
                onError: () => alert("Wystąpił błąd podczas usuwania"),
            });
        }
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <Head title="Zarządzanie Aktualnościami" />

            <div className="w-full bg-white p-6 sm:p-8 rounded-xl shadow-xs border border-parish-border border-t-4 border-t-parish-navy">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-6 border-b border-parish-border pb-5">
                    <div>
                        <Link
                            href="/admin/dashboard"
                            className="inline-flex items-center gap-1.5 text-parish-gold-text hover:text-parish-navy text-xs font-semibold uppercase tracking-wider mb-1 transition-colors"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Kokpit</span>
                        </Link>
                        <h1 className="font-serif text-2xl font-bold text-parish-navy">
                            Aktualności
                        </h1>
                    </div>
                    <Link
                        href="/admin/aktualnosci/dodaj"
                        className="inline-flex items-center gap-2 bg-parish-navy text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-parish-navy-dark transition-colors shadow-xs"
                    >
                        <Plus className="w-4 h-4 text-parish-gold-light" />
                        <span>Dodaj nowy post</span>
                    </Link>
                </div>

                {flash?.success && (
                    <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-600 text-emerald-800 font-medium rounded-r-lg text-sm">
                        {flash.success}
                    </div>
                )}

                {selectedIds.length > 0 && (
                    <div className="bg-red-50 p-4 mb-5 rounded-lg flex justify-between items-center border border-red-200">
                        <span className="text-red-800 font-semibold text-sm">
                            Zaznaczono elementów: {selectedIds.length}
                        </span>
                        <button
                            onClick={handleLotDelete}
                            className="inline-flex items-center gap-1.5 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors cursor-pointer"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Usuń zaznaczone</span>
                        </button>
                    </div>
                )}

                <div className="overflow-x-auto rounded-lg border border-parish-border">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-parish-sand/70 text-parish-navy text-xs font-bold uppercase tracking-wider border-b border-parish-border">
                                <th className="p-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-parish-navy cursor-pointer"
                                        onChange={handleSelectAll}
                                        checked={
                                            posts.data.length > 0 &&
                                            selectedIds.length ===
                                                posts.data.length
                                        }
                                    />
                                </th>
                                <th className="p-4">Miniaturka</th>
                                <th className="p-4">Tytuł</th>
                                <th className="p-4">Data utworzenia</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Akcje</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-parish-border/60 text-sm">
                            {posts.data.map((post) => (
                                <tr
                                    key={post.id}
                                    className="hover:bg-parish-cream/60 transition-colors"
                                >
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-parish-navy cursor-pointer"
                                            checked={selectedIds.includes(
                                                post.id,
                                            )}
                                            onChange={() =>
                                                handleSelect(post.id)
                                            }
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="w-16 h-12 bg-parish-sand rounded-md overflow-hidden border border-parish-border">
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
                                    <td className="p-4 font-semibold text-parish-navy">
                                        {post.title}
                                    </td>
                                    <td className="p-4 text-stone-600 whitespace-nowrap">
                                        {new Date(
                                            post.created_at,
                                        ).toLocaleDateString("pl-PL")}
                                    </td>
                                    <td className="p-4 whitespace-nowrap">
                                        {post.is_published ? (
                                            <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-semibold">
                                                Opublikowany
                                            </span>
                                        ) : (
                                            <span className="bg-stone-200 text-stone-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                                                Ukryty
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 text-right whitespace-nowrap">
                                        <div className="inline-flex items-center gap-2">
                                            <Link
                                                href={`/admin/aktualnosci/${post.id}/edytuj`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-parish-border bg-parish-cream hover:bg-parish-navy text-parish-navy hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                                            >
                                                <Pencil className="w-3.5 h-3.5" />
                                                <span>Edytuj</span>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(post.id)
                                                }
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                <span>Usuń</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {posts.data.length === 0 && (
                        <div className="text-center text-stone-500 py-10 italic">
                            Brak postów w bazie danych.
                        </div>
                    )}
                </div>

                {posts.links && posts.links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mt-6">
                        {posts.links.map((link, index) => {
                            const translatedLabel = link.label
                                .replace("Previous", "Poprzednia")
                                .replace("Next", "Następna");

                            return !link.url ? (
                                <span
                                    key={index}
                                    className="px-3.5 py-1.5 text-sm rounded-lg border bg-parish-sand/50 text-stone-400 border-parish-border"
                                    dangerouslySetInnerHTML={{
                                        __html: translatedLabel,
                                    }}
                                />
                            ) : (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3.5 py-1.5 text-sm rounded-lg border flex items-center justify-center transition-all ${
                                        link.active
                                            ? "bg-parish-navy text-white border-parish-navy font-semibold"
                                            : "bg-white text-parish-navy border-parish-border hover:bg-parish-sand"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: translatedLabel,
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
