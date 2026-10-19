import React from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

interface IntentionType {
    id: number;
    title:string;
    content:string;
}
interface IntentionsProps {
    intentions: IntentionType[];
}

export default function Intentions({ intentions = [] }: IntentionsProps) {
    
    return (
        <ParishLayout showpic={false}>
            <Head title="Intencje Mszalne" />
            <div className="flex flex-col gap-8 w full mx-auto max-w-5xl">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">
                    Intencje Mszalne
                </h1>
                {intentions.length === 0 ? (
                    <div className="text-center text-stone-500 italic py-8">
                        Brak dostępnych intencji mszalnych.
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        
                            {intentions.map((item) => (
                                <section
                                    key={item.id}
                                    className="bg-white p-6 shadow-sm border-l-4 border-[#dcb98a]"
                                >
                                    <h2 className="text-xl font-bold text-stone-800 uppercase tracking-wide mb-6 border-b border-stone-100 pb-2">
                                        {item.title}
                                    </h2>
                                    <div className="leading-relaxed text-stone-700 text-justify" dangerouslySetInnerHTML={{__html: item.content}}/>
                                        
                                </section>
                            ))},
                        
                    </div>
                )}
            </div>
        </ParishLayout>
    );
}
