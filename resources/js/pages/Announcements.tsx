import React from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Link } from "@inertiajs/react";

export default function Announcements() {
    return (
        <ParishLayout showpic={false}>
            <div className="flex flex-col gap-6 w-full mx-auto max-w-5xl">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">
                    Ogłoszenia Parafialne
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/*Olbierzowice*/}
                    <Link
                        href="/ogloszenia/olbierzowice"
                        className="block bg-white p-6 shadow-sm border-l-4 border-[#dcb98a] hover:bg-[dcb98a] hover:text-white transition-colors cursor-pointer"
                    >
                        <header className="mb-3">
                            <h2 className="text-lg font-bold text-stone-800 uppercase tracking-wide">
                                Ogłoszenia
                            </h2>
                            <span className="text-xs font-semibold text-stone-500 tracking-wider">
                                Olbierzowice
                            </span>
                        </header>
                        <div className="text-sm leading-relaxed text-stone-700">
                            Czytaj dalej
                        </div>
                    </Link>
                    {/*Nawodzice*/}
                    <Link
                        href="/ogloszenia/nawodzice"
                        className="block bg-white p-6 shadow-sm border-l-4 border-[#dcb98a] hover:bg-stone-[dcb98a] hover:text-white transition-colors cursor-pointer"
                    >
                        <header className="mb-3">
                            <h2 className="text-lg font-bold text-stone-800 uppercase tracking-wide">
                                Ogłoszenia
                            </h2>
                            <span className="text-xs font-semibold text-stone-500 tracking-wider">
                                Nawodzice
                            </span>
                        </header>
                        <div className="text-sm leading-relaxed text-stone-700">
                            Czytaj dalej
                        </div>
                    </Link>
                    {/*Katechezy*/}
                    <Link
                        href="/katechezy"
                        className="block bg-white p-6 shadow-sm border-l-4 border-[#dcb98a] hover:bg-stone-[dcb98a] hover:text-white transition-colors cursor-pointer"
                    >
                        <header className="mb-3">
                            <h2 className="text-lg font-bold text-stone-800 uppercase tracking-wide">
                                Katechezy
                            </h2>
                        </header>
                        <div className="text-sm leading-relaxed text-stone-700">
                            Czytaj dalej
                        </div>
                    </Link>
                </div>
            </div>
        </ParishLayout>
    );
}
