import React from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Link } from "@inertiajs/react";
import { Head } from "@inertiajs/react";

interface IntentionType {
    id: number;
    title: string;
    content: string;
}
interface IntentionsProps {
    intentions: IntentionType[];
}

export default function Intentions({ intentions = [] }: IntentionsProps) {
    return (
        <ParishLayout showpic={false}>
            <Head title="Intencje Mszalne" />
            <div className="flex flex-col gap-8 w-full px-4 mx-auto max-w-6xl">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">
                    Intencje Mszalne
                </h1>
                {intentions.length === 0 ? (
                    <div className="text-center text-stone-500 italic py-8">
                        Brak dostępnych intencji mszalnych.
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        {intentions.map((item) => {
                            const cleanContent = item.content
                                .replace(/&nbsp;/g, " ")
                                .replace(/\u00A0/g, " ")
                                .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
                                .replace(/ style="[^"]*"/gi, "")
                                .replace(/ class="[^"]*"/gi, "");

                            return (
                                <section
                                    key={item.id}
                                    className="bg-white p-4 sm:p-6 shadow-sm border-l-4 border-[#dcb98a]"
                                >
                                    <h2 className="text-4xl font-bold text-center text-stone-800 uppercase tracking-wide mb-6 border-b border-stone-100 pb-2">
                                        {item.title}
                                    </h2>
                                    <div className="leading-relaxed text-2xl text-stone-800 w-full overflow-hidden break-words hyphens-auto [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-stone-900"
                                    dangerouslySetInnerHTML={{__html: cleanContent}} />
                                    
                                </section>
                            );
                        })}
                    </div>
                )}
            </div>
        </ParishLayout>
    );
}
