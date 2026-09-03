import React from 'react';
import ParishLayout from '@/layouts/ParishLayout';
import {Link} from '@inertiajs/react';

interface IntentionType{
    id:number;
    Massdate:string;
    Masstime:string;
    intention:string;
    location:string;

}
interface IntentionsProps {
    intentions: IntentionType[];
}

export default function Intentions({ intentions = [] }: IntentionsProps) {
    const sortedIntentnions= intentions.reduce((acc, curr) => {
        const loc= curr.location;
        if(!acc[loc]){
            acc[loc]=[];
        }
        acc[loc].push(curr);
        return acc;
    }, {} as Record<string, IntentionType[]>);
    return (
        <ParishLayout showpic={false}>
            <div className="flex flex-col gap-8 w full mx-auto max-w-5xl">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">Intencje Mszalne</h1>
                {Object.keys(sortedIntentnions).length === 0 ? (
                    <div className="text-center text-stone-500 italic py-8">Brak dostępnych intencji mszalnych.</div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {Object.entries(sortedIntentnions).map(([location, locIntentions]) =>(
                            <section key={location} className="bg-white p-6 shadow-sm border-l-4 border-[#dcb98a]">
                                <h2 className="text-xl font-bold text-stone-800 uppercase tracking wide mb-6 border-b border-stone-100 pb-2">
                                    {location}
                                </h2>
                                <div className="flex flex-col gap-5">
                                    {locIntentions.map((item)=> (
                                        <div key={item.id} className="flex flex-col gap-2">
                                            <div className='flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-stone-700'>
                                                {item.Massdate} <span className="text-[#dcb98a] mx-2">|</span> {item.Masstime}
                                            </div>
                                            <div className='leading-relaxed flex-1 text-justify'>
                                                {item.intention}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </ParishLayout>
    );
}
