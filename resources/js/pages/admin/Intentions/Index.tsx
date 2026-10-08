import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import ParishLayout from '../../../layouts/ParishLayout';

interface Intention {
    id: number;
    Massdate: string;
    Masstime: string;
    intention: string;
    location: string;
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
    }
}

export default function Index({ intentions, flash }: IntentionsProps) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(intentions.data.map(i => i.id));
        } else {
            setSelectedIds([]);
        }
    }

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(selectedId => selectedId !== id)); // Poprawiony błąd!
        } else {
            setSelectedIds([...selectedIds, id]);
        };
    }

    const handleLotDelete = () => {
        if (confirm(`Czy chcesz na pewno usunąć ${selectedIds.length} zaznaczonych intencji?`)) {
            router.delete('/admin/intencje/wiele', { // Poprawiona ścieżka!
                data: { ids: selectedIds },
                onSuccess: () => setSelectedIds([])
            })
        }
    }

    const handleDelete = (id: number) => {
        if (confirm('Czy na pewno chcesz usunąć intencję?')) {
            router.delete(`/admin/intencje/${id}`);
        }
    };

    return (
        <ParishLayout showpic={false}>
            <Head title='Zarządzaj intencjami' />
            <div className="max-w-5xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]">
                <div className="flex justify-between items-center mb-8 border-b border-stone-200 pb-4">
                    <Link
                        href="/admin/dashboard"
                        className="text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors"
                    >
                        &laquo; Kokpit
                    </Link>
                    <h1 className="text-2xl font-bold uppercase tracking-wider text-stone-800">
                        Intencje
                    </h1>
                    <Link
                        href="/admin/intencje/dodaj"
                        className="bg-[#cca572] text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors"
                    >
                        + Dodaj nową intencję
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
                                {/* Dodano kolumnę na checkbox w nagłówku */}
                                <th className='p-4 w-12 text-center'>
                                    <input 
                                        type="checkbox" 
                                        className="w-4 h-4 accent-[#cca572] cursor-pointer"
                                        onChange={handleSelectAll}
                                        checked={intentions.data.length > 0 && selectedIds.length === intentions.data.length}
                                    />
                                </th>
                                <th className='p-4'>Data</th>
                                <th className='p-4'>Godzina</th>
                                <th className='p-4'>Miejscowość</th>
                                <th className='p-4'>Intencja</th>
                                <th className='p-4'>Akcje</th>
                            </tr>
                        </thead>
                        <tbody>
                            {intentions.data.length > 0 ? (
                                intentions.data.map((intention) => (
                                    <tr key={intention.id} className='border-b border-stone-100 hover:bg-stone-50 transition-colors'>
                                        {/* Dodano checkbox w wierszu */}
                                        <td className='p-4 text-center'>
                                            <input 
                                                type="checkbox" 
                                                className="w-4 h-4 accent-[#cca572] cursor-pointer"
                                                checked={selectedIds.includes(intention.id)}
                                                onChange={() => handleSelect(intention.id)}
                                            />
                                        </td>
                                        <td className='p-4 font-semibold text-stone-800 whitespace-nowrap'>
                                            {new Date(intention.Massdate).toLocaleDateString('pl-PL')}
                                        </td>
                                        <td className='p-4 text-stone-600 font-medium'>
                                            {intention.Masstime}
                                        </td>
                                        <td className='p-4 text-stone-600'>
                                            <span className={`px-2 py-1 text-xs font-bold rounded ${intention.location === 'Olbierzowice' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {intention.location}
                                            </span>
                                        </td>
                                        <td className='p-4 text-stone-700'>
                                            {intention.intention}
                                        </td>
                                        <td className='p-4 text-right whitespace-nowrap'>
                                            <Link
                                                href={`/admin/intencje/${intention.id}/edytuj`}
                                                className='text-[#cca572] font-bold text-sm uppercase hover:text-stone-900 mr-4 transition-colors'>
                                                Edytuj
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(intention.id)}
                                                className='text-red-500 font-bold text-sm uppercase hover:text-red-700 transition-colors'>
                                                Usuń
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className='p-8 text-center text-stone-500 font-semibold'> {/* Zmiana colSpan z 5 na 6 */}
                                        Brak dodanych intencji
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {intentions.links && intentions.links.length > 3 && (
                    <div className='flex flex-wrap justify-center gap-1 mt-8'>
                        {intentions.links.map((link, index) => {
                            const translatedLabel = link.label.replace('Previous', 'Poprzednia').replace('Next', 'Następna');
                            const isUnclickable = !link.url || link.active;

                            return isUnclickable ? (
                                <div key={index} className={`px-4 py-2 text-sm border flex items-center justify-center ${link.active ? 'bg-[#dcb98a] text-white border-[dcb98a] font-bold shadow-sm' :
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