import React, { useState } from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Head, Link } from "@inertiajs/react";

interface Photo {
    id: number;
    image_path: string;
}

interface AlbumData {
    id: number;
    title: string;
    photos: Photo[];
}

interface AlbumProps {
    album: AlbumData;
}

export default function Album({ album }: AlbumProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const showNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null && album.photos) {
            setSelectedIndex((selectedIndex + 1) % album.photos.length);
        }
    };

    const showPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null && album.photos) {
            setSelectedIndex(
                (selectedIndex - 1 + album.photos.length) % album.photos.length,
            );
        }
    };

    return (
        <ParishLayout showpic={false}>
            <Head title={`${album.title} - Galeria`} />
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-[#cbb085]/30 pb-4">
                <Link
                    href="/galeria"
                    className="text-[#cca572] hover:text-stone-900 font-bold uppercase tracking-wider text-xl transition-colors mb-4 md:mb-0"
                >
                    &laquo; Powrót do galerii
                </Link>
                
                <div className="lg:col-span-1 hidden md:block"><h1 className="text-xl font-bold uppercase tracking-widest text-stone-900  ">
                    Przeglądasz {album.title}
                </h1></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {album.photos?.map((photo, index) => (
                    <div
                        key={photo.id}
                        onClick={() => setSelectedIndex(index)}
                        className="aspect-square bg-stone-200 overflow-hidden cursor-pointer group rounded border border-[#cbb085]/40 shadow-sm"
                    >
                        <img
                            src={photo.image_path}
                            alt={`Zdjecie ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                    </div>
                ))}
            </div>
            {selectedIndex !== null && (
                <div
                    className="fixed inset-0 bg-stone-900/95 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-sm"
                    onClick={() => setSelectedIndex(null)}
                >
                    <button
                        onClick={showPrev}
                        className="absolute left-2 md:left-10 text-white/70 hover:text-[#cca572] text-5xl md:text-7xl font-light transition-colors z-50 px-4 py-10"
                    >
                        &#10094;
                    </button>
                    <div className="relative max-w-7xl max-h-[90vh] flex flex-col items-center">
                        <button
                            className="absolute -top-10 right-0 text-white font-bold text-xl hover:text-[#cca572] transition-colors"
                            onClick={() => setSelectedIndex(null)}
                        >
                            Zamknij &times;
                        </button>
                        <img
                            src={album.photos[selectedIndex].image_path}
                            alt={`Powiększone zdjęcie ${selectedIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain border-4 border-white shadow-2xl rounded-sm"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="text-stone-300 font-mono tracking-widest text-sm mt-4">
                            {selectedIndex + 1} / {album.photos.length}
                        </div>
                    </div>
                    <button
                        onClick={showNext}
                        className="absolute right-2 md:right-10 text-white/70 hover:text-[#cca572] text-5xl md:text-7xl font-light transition-colors z-50 px-4 py-10"
                    >
                        &#10095;
                    </button>
                </div>
            )}
        </ParishLayout>
    );
}
