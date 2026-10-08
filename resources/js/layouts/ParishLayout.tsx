import { Link } from "@inertiajs/react";
import React, { ReactNode, useState } from "react";

type ParishLayoutProps = {
    children: ReactNode;
    showpic?: boolean;
};

export default function ParishLayout({ children, showpic }: ParishLayoutProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    return (
        <div
            className="min-h-screen flex flex-col font-sans text-stone-800 bg-fixed bg-cover "
            style={{ backgroundImage: "url('/images/tlo2.jpeg')" }}
        >
            {/* mobilny pasek górny */}
            <div className="lg:hidden bg-[#dcb98a] p-3 flex justify-end items-center shadow-md sticky top-0 z-30">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="text-stone-900 focus:outline-none p-2 cursor-pointer hover:bg-white/20 rounded transition-colors"
                    aria-label="Otwórz menu"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* ZACIEMNIONE TŁO (Zamyka menu po kliknięciu obok) */}
            <div 
                className={`lg:hidden fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
                    isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* MOBILNE MENU BOCZNE (Drawer wysuwany z prawej) */}
            <div 
                className={`lg:hidden fixed inset-y-0 right-0 z-50 w-3/4 sm:w-80 bg-[#e8d5bc] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Górny pasek menu bocznego z przyciskiem Zamknij */}
                <div className="flex justify-end p-4 border-b border-[#cbb085]/40">
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-stone-900 p-2 cursor-pointer hover:bg-white/30 rounded transition-colors"
                        aria-label="Zamknij menu"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Zawartość menu z możliwością przewijania */}
                <div className="overflow-y-auto p-6 flex flex-col gap-8 flex-1">
                    <nav className="flex flex-col gap-3 font-bold uppercase text-sm tracking-wide text-center">
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="py-3 bg-white/50 border border-[#cbb085]/50 rounded active:bg-[#dcb98a]">Strona główna</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/historia" className="py-3 bg-white/50 border border-[#cbb085]/50 rounded active:bg-[#dcb98a]">Historia</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/intencje" className="py-3 bg-white/50 border border-[#cbb085]/50 rounded active:bg-[#dcb98a]">Intencje</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/ogloszenia" className="py-3 bg-white/50 border border-[#cbb085]/50 rounded active:bg-[#dcb98a]">Ogłoszenia</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/kontakt" className="py-3 bg-white/50 border border-[#cbb085]/50 rounded active:bg-[#dcb98a]">Kontakt</Link>
                        <Link onClick={() => setIsMobileMenuOpen(false)} href="/galeria" className="py-3 bg-white/50 border border-[#cbb085]/50 rounded active:bg-[#dcb98a]">Galeria</Link>
                    </nav>

                    <div className="flex flex-col gap-3 text-center">
                        <h3 className="font-bold text-stone-900 uppercase tracking-widest mb-1 text-xs">Linki Zewnętrzne</h3>
                        <a href="https://mogily.pl/olbierzowice" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#cca572]/30 border border-[#cbb085] rounded font-semibold uppercase active:bg-[#dcb98a]">Cmentarz</a>
                        <a href="https://niezbednik.niedziela.pl/" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#cca572]/30 border border-[#cbb085] rounded font-semibold uppercase active:bg-[#dcb98a]">Niedziela</a>
                        <a href="https://diecezjasandomierska.pl/" target="_blank" rel="noopener noreferrer" className="py-2.5 bg-[#cca572]/30 border border-[#cbb085] rounded font-semibold uppercase active:bg-[#dcb98a]">Diecezja</a>
                    </div>
                    
                    <div className="flex justify-center mt-auto pt-4 pb-2">
                        <a href="https://www.facebook.com/profile.php?id=100089487466133#" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-[#1877F2]">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            
            {/* GŁÓWNA SIATKA (Desktop) */}
            <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1 my-6">
                
                {/* LEWY PANEL (Desktop) */}
                <aside className="hidden lg:flex lg:sticky lg:top-60 lg:col-span-2 bg-[#dcb98a]/90 backdrop-blur-sm p-4 flex-col rounded shadow-md overflow-hidden items-center justify-center min-h-[200px]">
                    <div className="bg-[#cca572] py-2 px-3 border-b border-[#cbb085]/60 text-center w-full mb-2">
                        <h3 className="text-xs tracking-widest font-bold text-stone-900 uppercase">
                            Linki
                        </h3>
                    </div>
                    <div className="flex flex-col w-full divide-y divide-[#cbb085]/40 text-center">
                        <a href="https://mogily.pl/olbierzowice" target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 text-base font-semibold uppercase tracking-wider text-stone-900 hover:text-[#dcb98a] hover:bg-white transition-colors duration-200">
                            Cmentarz
                        </a>
                        <a href="https://niezbednik.niedziela.pl/" target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 text-base font-semibold uppercase tracking-wider text-stone-900 hover:text-[#dcb98a] hover:bg-white transition-colors duration-200">
                            Niedziela
                        </a>
                        <a href="https://diecezjasandomierska.pl/" target="_blank" rel="noopener noreferrer" className="px-3 py-2.5 text-base font-semibold uppercase tracking-wider text-stone-900 hover:text-[#dcb98a] hover:bg-white transition-colors duration-200">
                            Diecezja
                        </a>
                    </div>
                </aside>

                {/* ŚRODEK (Desktop i Mobile) */}
                <div className="lg:col-span-8 flex flex-col gap-y-4">
                    {/* Nawigacja Desktopowa */}
                    <nav className="hidden lg:flex bg-[#dcb98a] h-14 flex-row w-full font-bold uppercase text-base tracking-wide shadow-sm">
                        <Link href="/" className="flex-1 text-center flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Strona główna</Link>
                        <Link href="/historia" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Historia</Link>
                        <Link href="/intencje" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Intencje</Link>
                        <Link href="/ogloszenia" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Ogłoszenia</Link>
                        <Link href="/kontakt" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Kontakt</Link>
                        <Link href="/galeria" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Galeria</Link>
                    </nav>

                    {/* Baner 700 lat */}
                    {showpic && (
                        <div className="bg-[#cca876] flex items-center justify-center overflow-hidden shadow-sm aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]">
                            <img src="/images/700lat.jpeg" alt="700 lat Parafii" className="hidden lg:block w-full h-full object-cover lg:object-contain" />
                            <img src="/images/baner_mobile.jpeg" alt="700 lat Parafii" className="block lg:hidden w-full h-full object-cover lg:object-contain" />

                        </div>
                    )}

                    <main className="bg-[#e8d5bc] p-4 sm:p-8 flex flex-col min-h-[800px] shadow-sm">
                        <div className="mt-4 flex-1">{children}</div>
                    </main>
                </div>

                {/* PRAWY PANEL (Desktop) */}
                <aside className="hidden lg:flex lg:sticky lg:top-60 lg:col-span-2 bg-[#dcb98a]/90 backdrop-blur-sm p-4 flex-col rounded shadow-md overflow-hidden items-center justify-center min-h-[200px] gap-5 mt-40">
                    <div className="bg-[#e8d5bc] w-full flex font-bold uppercase shadow-sm justify-center p-4 hover:bg-white border border-[#cbb085]/30 transition-colors">
                        <a target="_blank" href="https://niezbednik.niedziela.pl/" rel="noopener noreferrer" className="text-sm xl:text-base font-semibold text-center text-stone-700 leading-relaxed hover:text-[#dcb98a] transition-colors duration-200">
                            Czytania na dziś
                        </a>
                    </div>
                    <div className="bg-[#e8d5bc] w-full flex items-center justify-center p-4 font-bold uppercase text-xs text-center shadow-sm hover:text-[#dcb98a] hover:bg-white border border-[#cbb085]/30 transition-colors duration-200">
                        <a href="https://www.facebook.com/profile.php?id=100089487466133#" target="_blank" rel="noopener noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-[#1877F2] hover:text-[#166fe5] transition-colors">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </aside>
            </div>

            {/* STOPKA */}
            <footer className="w-full bg-[#dcb98a] h-16 flex items-center justify-center font-bold uppercase text-xs tracking-widest text-stone-900 mt-auto shadow-inner z-10">
                <div className="flex items-center text-center justify-center gap-4">
                    <span>© 2026 Parafia. Wszelkie prawa zastrzeżone.</span>
                    <Link href="/login" className="hover:text-[#cca572] transition-colors">Logowanie</Link>
                </div>
            </footer>
        </div>
    );
}