import React from 'react';
import ParishLayout from '@/layouts/ParishLayout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <ParishLayout showpic={false}>
            <Head title="Historia" />
            
            <div className="bg-white/40 p-6 rounded-lg shadow-sm border border-white/20">
                <h2 className="text-3xl font-bold mb-4 text-[#7c2529]">
                    Historia Parafii
                </h2>
                <p className="text-lg leading-relaxed">
                    .
                </p>
            </div>
        </ParishLayout>
    );
}