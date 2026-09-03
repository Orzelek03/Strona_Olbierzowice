import React from 'react';
import ParishLayout from '@/layouts/ParishLayout';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <ParishLayout showpic={true}>
            <Head title="Strona Główna" />
            
            <div className="bg-white/40 p-6 rounded-lg shadow-sm border border-white/20">
                <h2 className="text-4xl font-bold mb-4 text-[#7c2529] uppercase text-center tracking-widest">
                    Witamy na nowej stronie Parafialnej!
                </h2>
                <p className="text-2xl leading-relaxed text-center text-stone-800 tracking-wide">
                    Szczęść Boże! Cieszymy się, że odwiedzasz stronę parafii św.Wawrzyńca w Olbierzowicach. <br />
                   <p className="pt-6 text-lg text-justify">  Nasza strona została stworzona, aby ułatwić komunikację i dostęp do informacji dla wszystkich parafian. Znajdziesz tutaj aktualności, ogłoszenia, historię parafii oraz wiele innych przydatnych informacji. Zachęcamy do regularnego odwiedzania naszej strony i korzystania z dostępnych zasobów.</p>
                </p>
            </div>
        </ParishLayout>
    );
}