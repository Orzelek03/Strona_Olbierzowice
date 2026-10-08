import React from 'react';
import {Head, useForm, Link } from '@inertiajs/react';
import ParishLayout from '@/layouts/ParishLayout';

export default function Create(){
    const {data, setData, post, processing, errors } = useForm({
        title: '',
        event_date:'',
        cover_image: null as File | null,
        photos:[] as File[],
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/albumy');
    }

    return(
        <ParishLayout showpic={false}>
            <Head title='Nowy Album - Panel Administratora' />

            <div className='max-w-3xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]'>
                <div className='flex justify-between items-center mb-6 border-b border-stone-200 pb-4'>
                    <h1 className='text-xl font-bold uppercase tracking-wider text-stone-800'>
                        Dodaj nowy album do galerii
                    </h1>
                    <Link href="/admin/albumy" className='text-stone-500 hover:text-stone-800 text-sm font-semibold'>
                        &laquo; Powrót do listy
                    </Link>
                </div>

                <form onSubmit={submit} className='flex flex-col gap-6'>
                    <div>
                        <label className='block text-sm font-bold text-stone-700 upercase mb-2'>Tytuł albumu</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={e => setData('title', e.target.value)}
                            className='w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none'
                            placeholder='Wydarzenie Rok' />
                        {errors.title && <div className='text-red-500 text-xs mt-1'>{errors.title}</div>}
                    </div>

                    <div>
                        <label className='block text-sm font-bold text-stone-700 upercase mb-2'>Data wydarzenia</label>
                        <input
                            type="date"
                            value={data.event_date}
                            onChange={e => setData('event_date', e.target.value)}
                            className='w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none'/>
                        {errors.event_date && <div className='text-red-500 text-xs mt-1'>{errors.event_date}</div>}
                    </div>

                    <div>
                        <label className='block text-sm font-bold text-stone-700 upercase mb-2'>Zdjęcie okładki</label>
                        <input
                            type="file"
                            onChange={e => setData('cover_image', e.target.files ? e.target.files[0]: null)}
                            className='w-full border border-stone-300 rounded p-2 bg-white text-stone-600 cursor-pointer
                            file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:border file:border-stone-300 file:rounded-sm 
                            file:text-sm file:font-bold file:uppercase file:tracking-wide file:text-stone-800 file:bg-white 
                            hover:file:bg-[#cca572] hover:file:text-white hover:file:border-[#cca572] file:transition-colors'/>
                        {errors.cover_image && <div className='text-red-500 text-xs mt-1'>{errors.cover_image}</div>}
                    </div>

                    <div>
                        <label className='block text-sm font-bold text-stone-700 upercase mb-2'>Zdjęcia do galerii</label>
                        <input
                            type="file"
                            multiple
                            onChange={e=>setData('photos', e.target.files? Array.from(e.target.files):[])}
                            className='w-full border border-stone-300 rounded p-2 bg-white text-stone-600 cursor-pointer
                            file:cursor-pointer file:mr-4 file:py-2 file:px-4 file:border file:border-stone-300 file:rounded-sm 
                            file:text-sm file:font-bold file:uppercase file:tracking-wide file:text-stone-800 file:bg-white 
                            hover:file:bg-[#cca572] hover:file:text-white hover:file:border-[#cca572] file:transition-colors'
                            />
                        {errors.photos && <div className='text-red-500 text-xs mt-1'>{errors.photos}</div>}
                    </div>

                    <button
                        type='submit'
                        disabled={processing}
                        className='mt-4 bg-[#cca572] text-white font-bold uppercase tracking-widest py-3 px-6 rounded hover:bg-stone-900 transition-colors disabled:opacity-50'>
                            {processing ? 'Zapisywanie i wgrywanie plików...':'Zapisz album'}
                    </button>
                </form>
            </div>

        </ParishLayout>
    )
}