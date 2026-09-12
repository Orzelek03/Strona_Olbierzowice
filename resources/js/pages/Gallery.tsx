import React from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Head, Link } from "@inertiajs/react";

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
            <Head title="Galeria " />
            <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">
                Galeria zdjęć
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {albums.data.map((album) => (
                    <Link
                        key={album.id}
                        href={`/galeria/${album.id}`}
                        className="group bg-white border border-[#cbb085]/50 rounded shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col"
                    >
                        <div className="aspect-[3/2] overflow-hidden bg-stone-200">
                            {album.cover_image ? (
                                <img
                                    src={album.cover_image}
                                    alt={album.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center text-stone-400 bg-stone-100 font-medium ">
                                    Brak okładki
                                </div>
                            )}
                        </div>
                        <div className="p-4 border-t border-[#cbb085]/30 flex-grow flex flex-col justify-between bg-white/95">
                            <h2 className="text-lg font-bold text-stone-800 group-hover:text-[#cca572] transition-colors line-clamp-2">
                                {album.title}
                            </h2>
                            <div className="mt-3 flex items-center justify-between text-sm text-stone-500">
                                <span>{album.event_date}</span>
                                <span className="uppercase text-xs font-bold tracking-wider text-[#dcb98a] group-hover:text-stone-900 transition-colors">
                                    Zobacz &raquo;
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {albums.data.length === 0 && (
                <div className="text-center text-stone-500 py-12">
                    Brak albumów w galerii
                </div>
            )}
            {albums.links && albums.links.length > 3 && (
                <div className="flex flex-wrap justify-center mt-12 gap-1">
                    {albums.links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.url || "#"}
                            preserveScroll
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            className={`px-4 py-2 border rounded text-sm transition-colors ${link.active ? "bg-[#cca572] text-white border-[#cca572] font-bold" : "bg-white text-stone-600 border-stone-300 hover:bg-stone-100"}${!link.url ? "opacity-50 cursor-not-allowed hover:bg-white" : ""} `}
                            onClick={(e) => !link.url && e.preventDefault()}
                        />
                    ))}
                </div>
            )}
        </ParishLayout>
    );
}
