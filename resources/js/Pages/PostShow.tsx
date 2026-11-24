import { Head, Link } from "@inertiajs/react";
import { ArrowLeft, Calendar, Images } from "lucide-react";
import React, { useEffect, useState } from "react";
import ParishLayout from "@/layouts/ParishLayout";

interface Photo {
    id: number;
    image_path: string;
}

interface Album {
    id: number;
    photos: Photo[];
}

interface Post {
    id: number;
    title: string;
    content: string;
    image_path: string | null;
    created_at: string;
    album?: Album | null;
}

interface PostShowProps {
    post: Post;
}

export default function PostShow({ post }: PostShowProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const photos: string[] = [];

    if (post?.image_path) {
        photos.push(post.image_path);
    }

    if (post?.album?.photos) {
        post.album.photos.forEach((photo) => photos.push(photo.image_path));
    }

    useEffect(() => {
        if (lightboxIndex === null) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setLightboxIndex(null);
            } else if (e.key === "ArrowRight" && photos.length > 1) {
                setLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % photos.length : null,
                );
            } else if (e.key === "ArrowLeft" && photos.length > 1) {
                setLightboxIndex((prev) =>
                    prev !== null
                        ? (prev - 1 + photos.length) % photos.length
                        : null,
                );
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [lightboxIndex, photos.length]);

    if (!post) {
        return (
            <ParishLayout showpic={false}>
                <div className="p-10 text-center text-parish-crimson font-semibold bg-white rounded-xl border border-parish-border">
                    Błąd: Brak danych artykułu lub wpis nie istnieje w bazie.
                </div>
            </ParishLayout>
        );
    }

    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex((lightboxIndex + 1) % photos.length);
        }
    };
    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (lightboxIndex !== null) {
            setLightboxIndex(
                (lightboxIndex - 1 + photos.length) % photos.length,
            );
        }
    };

    return (
        <ParishLayout showpic={false}>
            <Head title={post.title} />

            <div className="w-full mx-auto max-w-4xl">
                <nav className="mb-5">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-parish-gold-text hover:text-parish-navy transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Powrót do aktualności</span>
                    </Link>
                </nav>

                <article className="bg-white rounded-xl border border-parish-border border-t-4 border-t-parish-navy shadow-sm p-6 sm:p-10 flex flex-col gap-7">
                    <header className="border-b border-parish-border pb-6 space-y-3">
                        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-parish-gold-text">
                            <Calendar className="w-4 h-4" />
                            <time>
                                Dodano:{" "}
                                {new Date(post.created_at).toLocaleDateString(
                                    "pl-PL",
                                    {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    },
                                )}
                            </time>
                        </div>

                        <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-parish-navy leading-snug">
                            {post.title}
                        </h1>
                    </header>

                    <div className="text-base sm:text-[17px] leading-relaxed text-[#38312b] whitespace-pre-wrap">
                        {post.content}
                    </div>

                    {photos.length > 0 && (
                        <section className="mt-4 border-t border-parish-border pt-7">
                            <div className="flex items-center gap-2.5 mb-5">
                                <Images className="w-5 h-5 text-parish-gold-text" />
                                <h2 className="font-serif text-xl font-bold text-parish-navy">
                                    Fotorelacja ({photos.length})
                                </h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                                {photos.map((imgSrc, index) => (
                                    <button
                                        type="button"
                                        key={index}
                                        onClick={() => setLightboxIndex(index)}
                                        className="aspect-square cursor-pointer overflow-hidden rounded-lg border border-parish-border group shadow-xs bg-parish-sand"
                                    >
                                        <img
                                            src={imgSrc}
                                            alt={`Zdjęcie ${index + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}
                </article>
            </div>

            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-parish-navy-dark/95 backdrop-blur-xs flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        aria-label="Zamknij podgląd"
                        className="absolute top-6 right-6 text-white/80 hover:text-parish-gold-light text-4xl font-bold transition-colors z-50 cursor-pointer"
                    >
                        &times;
                    </button>
                    {photos.length > 1 && (
                        <button
                            onClick={prevImage}
                            aria-label="Poprzednie zdjęcie"
                            className="absolute left-3 md:left-10 text-white/75 hover:text-parish-gold-light text-5xl font-light transition-colors px-4 py-8 z-50 select-none cursor-pointer"
                        >
                            &#10094;
                        </button>
                    )}

                    <div className="w-full h-full p-4 md:p-16 flex items-center justify-center">
                        <img
                            src={photos[lightboxIndex]}
                            alt="Powiększone zdjęcie"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>

                    {photos.length > 1 && (
                        <button
                            onClick={nextImage}
                            aria-label="Następne zdjęcie"
                            className="absolute right-3 md:right-10 text-white/75 hover:text-parish-gold-light text-5xl font-light transition-colors px-4 py-8 z-50 select-none cursor-pointer"
                        >
                            &#10095;
                        </button>
                    )}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest font-semibold">
                        {lightboxIndex + 1} / {photos.length}
                    </div>
                </div>
            )}
        </ParishLayout>
    );
}
