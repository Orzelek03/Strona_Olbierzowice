import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ParishLayout from '../../../layouts/ParishLayout';

interface Announcement {
    id: number;
    title: string;
    is_published: number | boolean;
    type: string;
    location: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedAnnouncements {
    data: Announcement[];
    links: PaginationLink[];
}

interface IndexProps {
    announcements: PaginatedAnnouncements;
    flash?: {
        success?: string;
    }
}

export default function Index({ announcements, flash }: IndexProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(announcements.data.map(a => a.id));
        } else {
            setSelectedIds([]);
        }
    }

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        };
    }

    const handleLotDelete = () => {
        if (confirm(`Czy chcesz na pewno usunąć ${selectedIds.length} zaznaczonych wpisów?`)) {
            router.delete('/admin/ogloszenia/wiele', {
                data: { ids: selectedIds },
                onSuccess: () => setSelectedIds([])
            })
        }
    }

    const handleDelete = (id: number) => {
        if (confirm('Czy na pewno chcesz usunąć ten wpis?')) {
            router.delete(`/admin/ogloszenia/${id}`);
        }
    };

    return (
        <ParishLayout showpic={false}>
            <Head title='Zarządzaj ogłoszeniami' />
            <div className="max-w-6xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
                    <Link
                        href="/admin/dashboard"
                        className="text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors"
                    >
                        &laquo; Kokpit
                    </Link>
                    <h1 className="text-2xl font-bold uppercase tracking-wider text-stone-800">
                        Ogłoszenia i Katechezy
                    </h1>
                    <Link
                        href="/admin/ogloszenia/dodaj"
                        className="bg-[#cca572] text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
                    >
                        + Dodaj nowy wpis
                    </Link>
                </div>

                {selectedIds.length > 0 && (
                    <div className="bg-red-50 p-4 mb-4 rounded flex justify-between items-center border border-red-100">
                        <span className="text-red-800 font-semibold text-sm">
                            Zaznaczono elementów: {selectedIds.length}
                        </span>
                        <button
                            onClick={handleLotDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-colors"
                        >
                            Usuń zaznaczone
                        </button>
                    </div>
                )}

                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 font-semibold rounded">
                        {flash.success}
                    </div>
                )}

                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-stone-100 text-stone-700 uppercase text-xs tracking-wider border-b border-stone-200'>
                                <th className='p-4 w-12 text-center'>
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 accent-[#cca572] cursor-pointer"
                                        onChange={handleSelectAll}
                                        checked={announcements.data.length > 0 && selectedIds.length === announcements.data.length}
                                    />
                                </th>
                                <th className='p-4'>Tytuł</th>
                                <th className='p-4'>Data dodania</th>
                                <th className='p-4'>Typ</th>
                                <th className='p-4'>Lokalizacja</th>
                                <th className='p-4'>Status</th>
                                <th className='p-4 text-right'>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {announcements.data.length > 0 ? (
                                announcements.data.map((announcement) => (
                                    <tr key={announcement.id} className='border-b border-stone-100 hover:bg-stone-50 transition-colors'>
                                        <td className='p-4 text-center'>
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 accent-[#cca572] cursor-pointer"
                                                checked={selectedIds.includes(announcement.id)}
                                                onChange={() => handleSelect(announcement.id)}
                                            />
                                        </td>
                                        <td className='p-4 font-semibold text-stone-800'>
                                            {announcement.title}
                                        </td>
                                        <td className='p-4 text-stone-600 text-sm'>
                                            {new Date(announcement.created_at).toLocaleDateString('pl-PL')}
                                        </td>
                                        <td className='p-4'>
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${announcement.type === 'katecheza' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {announcement.type === 'katecheza' ? 'Katecheza' : 'Ogłoszenie'}
                                            </span>
                                        </td>
                                        <td className='p-4'>
    {announcement.type === 'katecheza' ? (
        <span className="text-stone-400 font-bold">-</span>
    ) : (
        <span className={`px-2 py-1 text-xs font-bold rounded ${announcement.location === 'Olbierzowice' ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-700'}`}>
            {announcement.location}
        </span>
    )}
</td>
                                        <td className='p-4'>
                                            {announcement.is_published ? (
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold">
                                                    Opublikowane
                                                </span>
                                            ) : (
                                                <span className="bg-stone-200 text-stone-600 px-2 py-1 rounded text-xs font-semibold">
                                                    Ukryte
                                                </span>
                                            )}
                                        </td>
                                        <td className='p-4 text-right whitespace-nowrap'>
                                            <Link
                                                href={`/admin/ogloszenia/${announcement.id}/edytuj`}
                                                className='text-[#cca572] font-bold text-sm uppercase hover:text-stone-900 mr-4 transition-colors'>
                                                Edytuj
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(announcement.id)}
                                                className='text-red-500 font-bold text-sm uppercase hover:text-red-700 transition-colors'>
                                                Usuń
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className='p-8 text-center text-stone-500 font-semibold'>
                                        Brak dodanych ogłoszeń.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {announcements.links && announcements.links.length > 3 && (
                    <div className='flex flex-wrap justify-center gap-1 mt-8'>
                        {announcements.links.map((link, index) => {
                            const translatedLabel = link.label.replace('Previous', 'Poprzednia').replace('Next', 'Następna');
                            const isUnclickable = !link.url || link.active;

                            return isUnclickable ? (
                                <div key={index} className={`px-4 py-2 text-sm border flex items-center justify-center ${link.active ? 'bg-[#dcb98a] text-white border-[#dcb98a] font-bold shadow-sm' :
                                    'bg-stone-50 text-stone-400 border-stone-200 cursor-not-allowed'}`}
                                    dangerouslySetInnerHTML={{ __html: translatedLabel }} />
                            ) : (
                                <Link
                                    key={index}
                                    href={link.url ?? undefined}
                                    className='px-4 py-2 text-sm border bg-white text-stone-600 border-stone-200 hover:bg-stone-50 transition-all flex items-center justify-center cursor-pointer'
                                    dangerouslySetInnerHTML={{ __html: translatedLabel }} />
                            )
                        })}
                    </div>
                )}
            </div>
        </ParishLayout>
    )
}