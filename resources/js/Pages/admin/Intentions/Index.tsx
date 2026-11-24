import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface Intention {
    id: number;
    title: string;
    content: string;
    created_at?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface IntentionsProps {
    intentions: {
        data: Intention[];
        links: PaginationLink[];
    };
    flash?: {
        success?: string;
    };
}

function stripHtml(html: string): string {
    return html
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export default function Index({ intentions, flash }: IntentionsProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(intentions.data.map((i) => i.id));
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
                `Czy chcesz na pewno usunąć ${selectedIds.length} zaznaczonych intencji?`,
            )
        ) {
            router.delete("/admin/intencje/wiele", {
                data: { ids: selectedIds },
                onSuccess: () => setSelectedIds([]),
            });
        }
    };

    const handleDelete = (id: number) => {
        if (confirm("Czy na pewno chcesz usunąć intencję?")) {
            router.delete(`/admin/intencje/${id}`);
        }
    };

    return (
        <div className="p-4 sm:p-6 w-full">
            <Head title="Zarządzaj intencjami" />
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
                            Intencje Mszalne
                        </h1>
                    </div>
                    <Link
                        href="/admin/intencje/dodaj"
                        className="inline-flex items-center gap-2 bg-parish-navy text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-parish-navy-dark transition-colors shadow-xs"
                    >
                        <Plus className="w-4 h-4 text-parish-gold-light" />
                        <span>Dodaj nową intencję</span>
                    </Link>
                </div>

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

                {flash?.success && (
                    <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-600 text-emerald-800 font-medium rounded-r-lg text-sm">
                        {flash.success}
                    </div>
                )}

                <div className="overflow-x-auto rounded-lg border border-parish-border">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-parish-sand/70 text-parish-navy uppercase text-xs font-bold tracking-wider border-b border-parish-border">
                                <th className="p-4 w-12 text-center">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 accent-parish-navy cursor-pointer"
                                        onChange={handleSelectAll}
                                        checked={
                                            intentions.data.length > 0 &&
                                            selectedIds.length ===
                                                intentions.data.length
                                        }
                                    />
                                </th>
                                <th className="p-4">Tytuł</th>
                                <th className="p-4">Podgląd treści</th>
                                <th className="p-4 text-right">Akcje</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-parish-border/60 text-sm">
                            {intentions.data.length > 0 ? (
                                intentions.data.map((intention) => (
                                    <tr
                                        key={intention.id}
                                        className="hover:bg-parish-cream/60 transition-colors"
                                    >
                                        <td className="p-4 text-center">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-parish-navy cursor-pointer"
                                                checked={selectedIds.includes(
                                                    intention.id,
                                                )}
                                                onChange={() =>
                                                    handleSelect(intention.id)
                                                }
                                            />
                                        </td>
                                        <td className="p-4 font-semibold text-parish-navy whitespace-nowrap">
                                            {intention.title}
                                        </td>
                                        <td className="p-4 text-stone-600 max-w-xl">
                                            <p className="line-clamp-2">
                                                {stripHtml(intention.content)}
                                            </p>
                                        </td>
                                        <td className="p-4 text-right whitespace-nowrap">
                                            <div className="inline-flex items-center gap-2">
                                                <Link
                                                    href={`/admin/intencje/${intention.id}/edytuj`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-parish-border bg-parish-cream hover:bg-parish-navy text-parish-navy hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" />
                                                    <span>Edytuj</span>
                                                </Link>
                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            intention.id,
                                                        )
                                                    }
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    <span>Usuń</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="p-10 text-center text-stone-500 italic"
                                    >
                                        Brak dodanych intencji
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {intentions.links && intentions.links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mt-6">
                        {intentions.links.map((link, index) => {
                            const translatedLabel = link.label
                                .replace("Previous", "Poprzednia")
                                .replace("Next", "Następna");
                            const isUnclickable = !link.url || link.active;

                            return isUnclickable ? (
                                <span
                                    key={index}
                                    className={`px-3.5 py-1.5 text-sm rounded-lg border flex items-center justify-center ${
                                        link.active
                                            ? "bg-parish-navy text-white border-parish-navy font-semibold"
                                            : "bg-parish-sand/50 text-stone-400 border-parish-border cursor-not-allowed"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: translatedLabel,
                                    }}
                                />
                            ) : (
                                <Link
                                    key={index}
                                    href={link.url ?? undefined}
                                    className="px-3.5 py-1.5 text-sm rounded-lg border bg-white text-parish-navy border-parish-border hover:bg-parish-sand transition-all flex items-center justify-center cursor-pointer"
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
