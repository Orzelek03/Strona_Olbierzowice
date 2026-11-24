import { Head, Link } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import ParishLayout from "@/layouts/ParishLayout";

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
    const photos = album.photos ?? [];

    useEffect(() => {
        if (selectedIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedIndex(null);
            } else if (e.key === "ArrowRight" && photos.length > 1) {
                setSelectedIndex((prev) =>
                    prev !== null ? (prev + 1) % photos.length : null,
                );
            } else if (e.key === "ArrowLeft" && photos.length > 1) {
                setSelectedIndex((prev) =>
                    prev !== null
                        ? (prev - 1 + photos.length) % photos.length
                        : null,
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, photos.length]);

    const showNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null && photos.length > 0) {
            setSelectedIndex((selectedIndex + 1) % photos.length);
        }
    };

    const showPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedIndex !== null && photos.length > 0) {
            setSelectedIndex(
                (selectedIndex - 1 + photos.length) % photos.length,
            );
        }
    };

    return (
        <ParishLayout showpic={false}>
            <Head title={`${album.title} - Galeria`} />

            <div className="flex flex-col gap-7">
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-parish-border pb-5">
                    <div className="space-y-2">
                        <Link
                            href="/galeria"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-parish-gold-text hover:text-parish-navy transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Powrót do galerii</span>
                        </Link>
                        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-parish-navy">
                            {album.title}
                        </h1>
                    </div>
                    {photos.length > 0 && (
                        <span className="inline-flex items-center self-start sm:self-end px-3 py-1 rounded-full bg-parish-sand border border-parish-border text-xs font-semibold text-parish-navy">
                            {photos.length} zdjęć
                        </span>
                    )}
                </header>

                {photos.length === 0 ? (
                    <div className="text-center text-stone-500 italic py-14 bg-white rounded-xl border border-parish-border shadow-xs">
                        Brak zdjęć w tym albumie.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {photos.map((photo, index) => (
                            <button
                                type="button"
                                key={photo.id}
                                onClick={() => setSelectedIndex(index)}
                                className="aspect-square bg-parish-sand overflow-hidden cursor-pointer group rounded-xl border border-parish-border shadow-xs hover:shadow-md transition-all"
                            >
                                <img
                                    src={photo.image_path}
                                    alt={`Zdjęcie ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selectedIndex !== null && photos[selectedIndex] && (
                <div
                    className="fixed inset-0 bg-parish-navy-dark/95 z-50 flex items-center justify-center p-4 cursor-pointer backdrop-blur-xs"
                    onClick={() => setSelectedIndex(null)}
                >
                    {photos.length > 1 && (
                        <button
                            onClick={showPrev}
                            aria-label="Poprzednie zdjęcie"
                            className="absolute left-2 md:left-10 text-white/75 hover:text-parish-gold-light text-5xl md:text-7xl font-light transition-colors z-50 px-4 py-10 cursor-pointer"
                        >
                            &#10094;
                        </button>
                    )}
                    <div className="relative max-w-7xl max-h-[90vh] flex flex-col items-center">
                        <button
                            className="absolute -top-10 right-0 text-white font-semibold text-base hover:text-parish-gold-light transition-colors cursor-pointer"
                            onClick={() => setSelectedIndex(null)}
                        >
                            Zamknij &times;
                        </button>
                        <img
                            src={photos[selectedIndex].image_path}
                            alt={`Powiększone zdjęcie ${selectedIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain border-2 border-white/80 shadow-2xl rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                        <div className="text-stone-300 font-mono tracking-widest text-sm mt-4">
                            {selectedIndex + 1} / {photos.length}
                        </div>
                    </div>
                    {photos.length > 1 && (
                        <button
                            onClick={showNext}
                            aria-label="Następne zdjęcie"
                            className="absolute right-2 md:right-10 text-white/75 hover:text-parish-gold-light text-5xl md:text-7xl font-light transition-colors z-50 px-4 py-10 cursor-pointer"
                        >
                            &#10095;
                        </button>
                    )}
                </div>
            )}
        </ParishLayout>
    );
}
