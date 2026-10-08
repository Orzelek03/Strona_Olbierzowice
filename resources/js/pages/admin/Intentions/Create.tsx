import React from 'react';
import {Head, useForm, Link} from '@inertiajs/react';
import ParishLayout from '../../../layouts/ParishLayout';


export default function Create(){
    const {data, setData, post, processing, errors} = useForm({
        Massdate:'',
        Masstime:'',
        intention:'',
        location:'Olbierzowice',
    });

    const submit=(e: React.FormEvent) =>{
        e.preventDefault();
        post('/admin/intencje');
    };

    return (
        <ParishLayout showpic={false}>
            <Head title='Dodaj nową intencję'/>

            <div className='max-w-4xl mx-auto bg-white p-8 rounded shadow-sm border-t-4 border-[#cca572]'>
                <div className='flex justify-between items-center mb-6 border-b border-stone-200 pb-4'>
                    <h1 className='text-xl font-bold uppercase tracking-wider text-stone-800'>
                        Dodaj nową intencję
                    </h1>
                    <Link href="/admin/intencje" className='text-stone-500 hover:text-stone-800 text-sm font-semibold transition-colors'>
                        &laquo; Powrót do listy
                    </Link>
                </div>

                <form onSubmit={submit} className='flex flex-col gap-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 uppercase mb-2">Data Mszy Świętej</label>
                            <input
                                type="date" 
                                min="2026-01-01"
                                value={data.Massdate}
                                style={{ colorScheme: 'light' }}
                                onChange={e => setData('Massdate', e.target.value)}
                                className="w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none"
                            />

                            
                            {errors.Massdate && <div className="text-red-500 text-xs mt-1">{errors.Massdate}</div>}
                        </div>

                       <div>
                            <label className='block text-sm font-bold text-stone-700 uppercase mb-2'>Godzina</label>
                            <input
                                type="time"
                                value={data.Masstime}
                                style={{ colorScheme: 'light' }}
                                onChange={e => setData('Masstime', e.target.value)}
                                className='w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none'
                            />
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                                {['07:00', '09:00', '10:30', '12:00', '15:30', '16:00', '16:30','17:00','17:30','18:00','18:30'].map((time) => (
                                    <button
                                        key={time}
                                        type="button"
                                        onClick={() => setData('Masstime', time)}
                                        className={`px-3 py-1 text-xs font-bold rounded border transition-colors ${
                                            data.Masstime === time 
                                            ? 'bg-[#cca572] text-white border-[#cca572]' 
                                            : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-200'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                            {errors.Masstime && <div className="text-red-500 text-xs mt-1">{errors.Masstime}</div>}
                        </div>

                        <div>
                            <label className='block text-sm font-bold text-stone-700 uppercase mb-2'>Miejscowość</label>
                                <select
                                    value={data.location}
                                    onChange={e=> setData('location', e.target.value)}
                                    className='w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none bg-white'>
                                        <option value="Olbierzowice">Olbierzowice</option>
                                        <option value="Nawodzice">Nawodzice</option>
                                    </select>
                                    {errors.location && <div className='text-red-500 text-xs mt-1'>{errors.location}</div>}
                        </div>
                        
                        <div>
                            <label className='block text-sm font-bold text-stone-700 uppercase mb-2'>Treść intencji</label>
                                <textarea
                                    value={data.intention}
                                    onChange={e=>setData('intention', e.target.value)}
                                    rows={3}
                                    className='w-full border border-stone-300 rounded p-2 focus:ring-2 focus:ring-[#cca572] focus:outline-none'
                                    placeholder='Za zmarłych...'/>
                                {errors.location && <div className='text-red-500 text-xs mt-1'>{errors.location}</div>}
                        </div>

                        <button
                            type='submit'
                            disabled={processing}
                            className='mt-4 bg-[#cca572] text-white font-bold uppercase tracking-widest py-3 px-6 rounded hover:bg-stone-900 transition-colors disabled:opacity-50 w-full md:w-auto self-start'>
                                {processing? 'Zapisywanie...' : 'Dodaj intencję'}
                            </button>
                    </div>
                </form>
            </div>
        </ParishLayout>
    )
}