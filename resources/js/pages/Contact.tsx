import React from 'react';
import ParishLayout from '@/layouts/ParishLayout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <ParishLayout showpic={false}>
            <Head title="Historia" />
            <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">Kontakt</h1>
            <div className="bg-white/40 p-6 rounded-lg shadow-sm border border-white/20">
                
                <p className="text-lg leading-relaxed">
                    xddd
                </p>
            </div>
        </ParishLayout>
    );
}