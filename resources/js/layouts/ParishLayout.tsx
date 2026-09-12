import { Link } from "@inertiajs/react";
import React, { ReactNode } from "react";

type ParishLayoutProps = {
    children: ReactNode;
    showpic?: boolean;
};

export default function ParishLayout({ children, showpic }: ParishLayoutProps) {
    return (
        <div
            className="min-h-screen flex flex-col font-sans text-stone-800 bg-fixed bg-cover"
            style={{ backgroundImage: "url('/images/tlo2.jpeg')" }}
        >
            {/* Główna siatka*/}
            <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1 my-6">
                {/* LEWY PANEL (Linki)  */}
                <aside className="lg:sticky lg:top-55 lg:col-start-1 lg:col-span-1 bg-[#dcb98a]/90 backdrop-blur-sm p-4 flex flex-col rounded shadow-md overflow-hidden items-center justify-center min-h-[200px] shadow-sm">
                    <div className="bg-[#cca572] ppy-2 px-3 border-b border-[#cbb085]/60 text-center">
                        <h3 className="content-between top-0 inset-x-0 absolute text-center text-xs tracking-widest font-bold text-stone-900 uppercase ">
                            Linki
                        </h3>
                    </div>

                    <div className="flex flex-col divide-y divide-[#cbb085]/40 text-center">
                        <a
                            href="https://mogily.pl/olbierzowice"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2.5 text-base font-semibold uppercase tracking-wider text-stone-900 hover:text-[#dcb98a] hover:bg-white border-1 border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Cmentarz
                        </a>
                    </div>
                    <div className="flex flex-col divide-y divide-[#cbb085]/40 text-center">
                        <a
                            href="https://niezbednik.niedziela.pl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2.5 text-base font-semibold uppercase tracking-wider text-stone-900 hover:text-[#dcb98a] hover:bg-white border-1 border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Niedziela
                        </a>
                    </div>
                    <div className="flex flex-col divide-y divide-[#cbb085]/40 text-center">
                        <a
                            href="https://diecezjasandomierska.pl/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2.5 text-base font-semibold uppercase tracking-wider text-stone-900 hover:text-[#dcb98a] hover:bg-white border-1 border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Diecezja
                        </a>
                    </div>
                </aside>

                {/* ŚRODEK - Nagłówek, Nawigacja */}
                <div className="lg:col-start-3 lg:col-span-8 flex flex-col gap-y-4">
                    {/* Header / Baner */}
                    <header className="bg-gray-200 h-30 flex items-center justify-center shadow-sm">
                        {/* Opcjonalny baner */}
                    </header>

                    {/* Nawigacja */}
                    <nav className="bg-[#dcb98a] h-14 flex flex-col sm:flex-row w-full font-bold uppercase text-base tracking-wide shadow-sm">
                        <Link
                            href="/"
                            className="flex-1 text-center text-sm flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Strona główna
                        </Link>
                        <Link
                            href="/historia"
                            className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Historia
                        </Link>
                        <Link
                            href="/intencje"
                            className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Intencje
                        </Link>
                        <Link
                            href="/ogloszenia"
                            className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Ogłoszenia
                        </Link>
                        <Link
                            href="/kontakt"
                            className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Kontakt
                        </Link>
                        <Link
                            href="/galeria"
                            className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200"
                        >
                            Galeria
                        </Link>
                    </nav>

                    {/* Obrazek 700 lat */}
                    {showpic && (
                        <div className="bg-[#cca876] flex items-center justify-center h-90 font-bold uppercase text-sm tracking-widest text-stone-900 overflow-hidden shadow-sm lg:aspect-[4/1]">
                            <img
                                src="/images/700lat.jpeg"
                                alt="700 lat Parafii"
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                    {/* Główna zawartość strony (dynamiczna) */}
                    <main className="bg-[#e8d5bc] p-8 flex flex-col min-h-[800px] shadow-sm">
                        <div className="mt-4 flex-1">{children}</div>
                    </main>
                </div>

                {/* PRAWY PANEL  */}
                <aside className="lg:sticky lg:top-55 lg:top-6 lg:col-start-12 lg:col-span-3 bg-[#dcb98a]/90 backdrop-blur-sm p-4 flex flex-col rounded shadow-md overflow-hidden items-center justify-center min-h-[200px] shadow-sm gap-5">
                    <div className="bg-[#e8d5bc] flex-0 flex font-bold uppercase shadow-sm justify-items-stretch p-4  hover:bg-white border-1 border-[#cbb085]/30 transition-colors">
                        <a
                            target="_blank"
                            href="https://niezbednik.niedziela.pl/"
                            className="text-base fon-semibold text-center text-stone-700 leading-relaxed hover:text-[#dcb98a] transition-colors duration-200"
                        >
                            Czytania na dziś
                        </a>
                    </div>
                    <div className="bg-[#e8d5bc] flex-2 flex items-center justify-center p-4 font-bold uppercase text-xs text-center shadow-sm hover:text-[#dcb98a] hover:bg-white border-1 border-[#cbb085]/30 transition-colors duration-200">
                        <a
                            href="https://www.facebook.com/profile.php?id=100089487466133#"
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-16 h-16 text-[#1877F2] group-hover:text-[#166fe5] transition-colors"
                            >
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12
                             5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669
                              4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532
                              3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                                />
                            </svg>
                        </a>
                    </div>
                </aside>
            </div>

            {/* Stopka na samym dole */}
            <footer className="w-full bg-[#dcb98a] h-16 flex items-center justify-center font-bold uppercase text-xs tracking-widest text-stone-900 mt-auto shadow-inner">
                <div className= "grid grid-cols-1 items-center text-center justify-center gap-4">
                    <span>© 2026 Parafia. Wszelkie prawa zastrzeżone.</span>
                    <span><Link href="/login" className="hover:text-[#cca572] transition-colors">
                        Logowanie
                    </Link>
                    </span>
                </div>
            </footer>
        </div>
    );
}
