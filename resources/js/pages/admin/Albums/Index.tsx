import React from 'react';
import {Head, Link, router} from '@inertiajs/react';
import ParishLayout from '@/layouts/ParishLayout';
import { album } from '@/routes/galeria';

interface Album{
    id: number;
    title:string;
    event_date: string;
    cover_image: string | null;
    photos_count: number;
}

interface IndexProps{
    albums:{
        data:Album[];
        links: any[];
    };
}

export default function Index({albums}:IndexProps){
    const handleDelete = (id:number) =>{
        if(confirm('Czy na pewno chcesz usunąć album wraz z jego zawartością?')){
            router.delete(`/admin/albumy/${id}`);
        }
    };
    const handleEdit = (id:number) =>{
        router.get(`/admin/albumy/${id}/edytuj`);
    };

    return(
        <ParishLayout showpic={false}>
            <Head title='Zarządzanie Albumami' />

            <div className='max-w-5xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]'>
                <div className='flex justify-between items-center mb-8 border-b border-stone-200 pb-4'>
                    <Link href="/dashboard" className='text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors'>
                    &laquo; Kokpit
                    </Link>
                    <h1 className='text-2xl font-bold uppercase tracking-wider text-stone-800'>
                        Albumy w galerii
                    </h1>
                    <Link
                    href="/admin/albumy/dodaj"
                    className='bg-[#cca572] text-white px-4 py-2 rounded text-sm font-bold uppercase tracking-wider hover:bg-stone-900 transition-colors'
                    >
                        + Dodaj nowy Album
                    </Link>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='border-b border-stone-200 text-stone-500 text-xs uppercase tracking wider'>
                                <th className='p-3'>Okładka</th>
                                <th className='p-3'>Tytuł</th>
                                <th className='p-3'>Data</th>
                                <th className='p-3'>Liczba zdjęć</th>
                                <th className='p-3 text-right'>Akcje</th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-stone-100 text-stone-700 text-sm'>
                            {albums.data.map(album => (
                                <tr key={album.id} className='hover:bg-stone-50'>
                                    <td className='p-3'>
                                        <div className='w-16 h-12 bg-stone-200 rounded overflow-hidden'>
                                            {album.cover_image ? (
                                                <img src={album.cover_image} alt="" className='w-full h-full object-cover'/>            
                                            ):(
                                                <span className='text-[10px] text-stone-400 flex items-center justify-center h-full'>Brak</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className='p-3 font-bold text-stone-900'>{album.title}</td>
                                    <td className='p-3'>{album.event_date}</td>
                                    <td className='p-3'>{album.photos_count}szt.</td>
                                    <td className='p-3 text-right space-x-2'>
                                        <button
                                            onClick={()=> handleDelete(album.id)}
                                            className='text-red-600 hover:text-red-900 font-semibold text-xs uppercase tracking-wider border border-red-200 
                                            px-3 py-1 rounded hover:bg-red-50 transition-colors'>
                                                Usuń
                                            </button>
                                            <button
                                            onClick={()=> handleEdit(album.id)}
                                            className='text-black-600 hover:text-black-900 font-semibold text-xs uppercase tracking-wider border border-red-200 
                                            px-3 py-1 rounded hover:bg-red-50 transition-colors'>
                                                Edytuj
                                            </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {albums.data.length === 0 &&(
                        <div className='text-center text-stone-400 py-12 italic'>
                            Brak albumów w bazie danych
                        </div>
                    )}
                </div>
            </div>
        </ParishLayout>
    )
}