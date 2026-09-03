import { Link } from '@inertiajs/react';
import React, { ReactNode } from 'react';

type ParishLayoutProps = {
    children: ReactNode;
    showpic?: boolean;
};

export default function ParishLayout({ children, showpic }: ParishLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col font-sans text-stone-800 bg-fixed bg-cover" style={{backgroundImage: "url('/images/tlo2.jpeg')"}}>
            
            {/* Główna siatka: items-start pozwala kolumnom mieć różną wysokość i umożliwia scrollowanie sticky */}
            <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-0 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start flex-1 my-6">
                
                {/* LEWY PANEL (Linki) - Przyklejony ze scrolliem */}
                <aside className="lg:sticky lg:top-75 lg:col-start-1 lg:col-span-1 bg-[#dcb98a] p-4 flex flex-col items-center justify-center min-h-[300px] shadow-sm">
                    <span className="font-extrabold tracking-widest text-sm uppercase text-stone-900 text-center">LIN<br/>KI</span>
                </aside>

                {/* ŚRODEK - Nagłówek, Nawigacja, Obrazek i Zawartość w jednej kolumnie */}
                <div className="lg:col-start-3 lg:col-span-8 flex flex-col gap-y-4">
                    
                    {/* Header / Baner */}
                    <header className="bg-gray-200 h-30 flex items-center justify-center shadow-sm">
                        {/* Opcjonalny baner */}
                    </header>

                    {/* Nawigacja */}
                    <nav className="bg-[#dcb98a] h-14 flex flex-col sm:flex-row w-full font-bold uppercase text-base tracking-wide shadow-sm">
                        <Link href="/" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Strona główna</Link>
                        <Link href="#" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Historia</Link>
                        <Link href="/intencje" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Intencje</Link>
                        <Link href="/ogloszenia" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Ogłoszenia</Link>
                        <Link href="#" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Kontakt</Link>
                        <Link href="#" className="flex-1 flex items-center justify-center h-14 px-2 hover:text-[#dcb98a] hover:bg-white border-l border-[#cbb085]/30 transition-colors duration-200">Galeria</Link>
                    </nav>

                    {/* Obrazek 700 lat */}{showpic && (
                    <div className="bg-[#cca876] flex items-center justify-center h-90 font-bold uppercase text-sm tracking-widest text-stone-900 overflow-hidden shadow-sm lg:aspect-[4/1]">
                        <img src="/images/700lat.jpeg" alt="700 lat Parafii" className="w-full h-full object-contain" />
                    </div>
                    )}
                    {/* Główna zawartość strony (dynamiczna) */}
                    <main className="bg-[#e8d5bc] p-8 flex flex-col min-h-[800px] shadow-sm">
                        
                        <div className="mt-4 flex-1">
                            {children}
                        </div>
                    </main>

                </div>

                {/* PRAWY PANEL (Słowo Boże + FB) - Przyklejony ze scrolliem */}
                <aside className="lg:sticky lg:top-75 lg:top-6 lg:col-start-12 lg:col-span-1 flex flex-col gap-5 h-84">
                    <div className="bg-[#e8d5bc] flex-1 flex items-center justify-center p-4 font-bold uppercase text-xs text-center shadow-sm">Słowo Boże na dzisiaj</div>
                    <div className="bg-[#e8d5bc] flex-1 flex items-center justify-center p-4 font-bold uppercase text-xs text-center shadow-sm">FB</div>
                </aside>

            </div>

            {/* Stopka na samym dole */}
            <footer className="w-full bg-[#dcb98a] h-16 flex items-center justify-center font-bold uppercase text-xs tracking-widest text-stone-900 mt-auto shadow-inner">
                <span>© 2026 Parafia. Wszelkie prawa zastrzeżone.</span>
            </footer>

        </div>
    );
}