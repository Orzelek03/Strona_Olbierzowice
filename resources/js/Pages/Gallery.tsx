import { Head, Link } from "@inertiajs/react";
import { ArrowRight, Calendar, ImageOff } from "lucide-react";
import React from "react";
import ParishLayout from "@/layouts/ParishLayout";

interface Album {
    id: number;
    title: string;
    event_date: string;
    cover_image: string | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedAlbums {
    data: Album[];
    links: PaginationLink[];
}

interface GaleriaProps {
    albums: PaginatedAlbums;
}

export default function Galeria({ albums }: GaleriaProps) {
    return (
        <ParishLayout showpic={false}>
            <Head title="Galeria" />

            <div className="flex flex-col gap-8 w-full mx-auto">
                <header className="text-center space-y-2 border-b border-parish-border pb-6">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-parish-gold-text">
                        Wspomnienia Wspólnoty
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-parish-navy">
                        Galeria zdjęć
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600">
                        Fotorelacje z uroczystości, wydarzeń parafialnych i
                        życia naszej wspólnoty.
                    </p>
                </header>

                {albums.data.length === 0 ? (
                    <div className="text-center text-stone-500 italic py-14 bg-white rounded-xl border border-parish-border shadow-xs">
                        Brak albumów w galerii.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {albums.data.map((album) => (
                            <Link
                                key={album.id}
                                href={`/galeria/${album.id}`}
                                className="group bg-white border border-parish-border rounded-xl shadow-xs hover:shadow-md hover:border-parish-gold transition-all duration-300 overflow-hidden flex flex-col"
                            >
                                <div className="aspect-[3/2] overflow-hidden bg-parish-sand relative">
                                    {album.cover_image ? (
                                        <img
                                            src={album.cover_image}
                                            alt={album.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-stone-400 bg-parish-sand/70 font-medium text-sm">
                                            <ImageOff className="w-7 h-7 opacity-60" />
                                            <span>Brak okładki</span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                                    <h2 className="font-serif text-lg font-bold text-parish-navy group-hover:text-parish-gold-text transition-colors line-clamp-2 leading-snug">
                                        {album.title}
                                    </h2>
                                    <div className="flex items-center justify-between text-xs pt-3 border-t border-parish-border/70">
                                        <span className="inline-flex items-center gap-1.5 text-stone-500 font-medium">
                                            <Calendar className="w-3.5 h-3.5 text-parish-gold-text" />
                                            {new Date(
                                                album.event_date,
                                            ).toLocaleDateString("pl-PL", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </span>
                                        <span className="inline-flex items-center gap-1 font-semibold text-parish-navy group-hover:text-parish-gold-text transition-colors">
                                            <span>Otwórz</span>
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {albums.links && albums.links.length > 3 && (
                    <div className="flex flex-wrap justify-center mt-4 gap-1.5">
                        {albums.links.map((link, index) => {
                            const translatedLabel = link.label
                                .replace("Previous", "Poprzednia")
                                .replace("Next", "Następna");
                            const isUnclickable = !link.url || link.active;

                            return isUnclickable ? (
                                <span
                                    key={index}
                                    dangerouslySetInnerHTML={{
                                        __html: translatedLabel,
                                    }}
                                    className={`px-4 py-2 border rounded-lg text-sm ${
                                        link.active
                                            ? "bg-parish-navy text-white border-parish-navy font-semibold shadow-xs"
                                            : "bg-parish-sand/50 text-stone-400 border-parish-border opacity-60 cursor-not-allowed"
                                    }`}
                                />
                            ) : (
                                <Link
                                    key={index}
                                    href={link.url ?? undefined}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{
                                        __html: translatedLabel,
                                    }}
                                    className="px-4 py-2 border rounded-lg text-sm transition-colors bg-white text-parish-navy border-parish-border hover:bg-parish-sand hover:border-parish-gold/60 cursor-pointer"
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </ParishLayout>
    );
}
