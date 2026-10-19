import React, { useState, useEffect } from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Head } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

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
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedPosts {
    data: Post[];
    links: PaginationLink[];
}

interface WelcomeProps {
    posts: PaginatedPosts;
}

export default function Welcome({ posts }: WelcomeProps) {
    const [showWelcomePopup, setWelcomePopup] = useState(false);

    useEffect(() => {
        const hasSeenPopup = sessionStorage.getItem("hasSeenWelcomePopup");
        if (!hasSeenPopup) {
            setWelcomePopup(true);
            sessionStorage.setItem("hasSeenWelcomePopup", "true");

            const timer = setTimeout(() => {
                setWelcomePopup(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const closePopup = () => {
        setWelcomePopup(false);
    };
    return (
        <ParishLayout showpic={true}>
            <Head title="Strona Główna" />
            {showWelcomePopup && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none transition-opacity duration-500">
                    <div className="bg-[#e8d5bc] text-stone-900 max-w-md w-full rounded-sm shadow-2xl flex flex-col relative border-2 border-[#dcb98a] animate-fade-in-up pointer-events-auto">
                        <button
                            onClick={closePopup}
                            className="absolute top-3 right-3 text-stone-600 hover:text-stone-900 focus:outline-none transition-colors"
                            aria-label="Zamknij"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <div className="p-8 text-center flex flex-col items-center gap-4">
                            <h2 className="text-xl font-bold uppercase tracking-widest text-stone-900 border-b border-[#cbb085]/40 pb-2">
                                Szczęść Boże!
                            </h2>
                            <p className="text-base font-medium leading-relaxed text-stone-700">
                                Witamy na oficjalnej stronie internetowej
                                Parafii św.Wawrzyńca w Olbierzowicach!
                                Znajdziesz tu ogłoszenia, relacje z wydarzeń
                                parafii, oraz historię naszej wspólnoty.
                            </p>
                        </div>
                        <div className="w-full h-1 bg-[#cbb085]/30">
                            <div className="h-full bg-[#dcb98a] animate-[shrink_5s_linear_forwards]"></div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-8 w-full mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold uppercase tracking-widest text-center text-stone-900 border-b border-[#cbb085]/30 pb-4">
                    Aktualności
                </h1>
                <div className="flex flex-col gap-6">
                    {posts.data.map((post) => {
                        const Photos = post.image_path ? [post.image_path] : [];
                        if (post.album && post.album.photos) {
                            post.album.photos.forEach((photo) =>
                                Photos.push(photo.image_path),
                            );
                        }
                        const displayPhotos = Photos.slice(0, 3);
                        const remainingCount = Photos.length - 3;
                        return (
                            <Link
                                key={post.id}
                                href={`/aktualnosci/${post.id}`}
                                className="block group"
                            >
                                <article className="bg-white shadow-sm flex flex-col md:flex-row border-l-4 border-[#dcb98a] group-hover:shadow-md group-hover:bg-stone-50 transition-all duration-300">
                                    {/*Text*/}
                                    <div
                                        className={`p-6 flex flex-col flex-grow md:w-3/5 lg:w-2/3 ${displayPhotos.length > 0 ? "md:w-3/5 lg:w-2/3" : "w-full"}`}
                                    >
                                        <header className="mb-3">
                                            <h2 className="text-xl font-bold text-stone-800 uppercase tracking-wide line-clamp-2 group-hover:text-[#dcb98a] transition-colors">
                                                {post.title}
                                            </h2>
                                            <span className="text-xs font-semibold text-stone-500 tracking-wider">
                                                {new Date(
                                                    post.created_at,
                                                ).toLocaleDateString("pl-PL")}
                                            </span>
                                        </header>
                                        <div className="text-sm leading-relaxed text-stone-700 text-justify line-clamp-3 md:line-clamp-4">
                                            {post.content}
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                                            <span className="text-[#dcb98a] font-bold text-sm uppercase">
                                                Czytaj dalej... &raquo;
                                            </span>
                                        </div>
                                    </div>
                                    {/*Photos on the right*/}
                                    {displayPhotos.length > 0 && (
                                        <div className="p-4 md:pl-0 w-full md:w-1/3 flex-shrink-0">
                                            <div className="grid grid-cols-3 gap-1 h-56 md:h-full min-h-[14rem]">
                                                <div className="col-span-2 relative">
                                                    <img
                                                        src={displayPhotos[0]}
                                                        alt="main photo"
                                                        className="absolute inset-0 w-full h-full object-cover rounded-sm"
                                                    />
                                                </div>
                                                <div className="col-span-1 flex flex-col gap-1 h-full">
                                                    <div className="flex-1 relative">
                                                        <img
                                                            src={
                                                                displayPhotos[1]
                                                            }
                                                            alt="second photo"
                                                            className="absolute inset-0 w-full h-full object-cover rounded-sm"
                                                        />
                                                    </div>

                                                    <div className="flex-1 relative">
                                                        <img
                                                            src={
                                                                displayPhotos[2]
                                                            }
                                                            alt="Third photo"
                                                            className="absolute inset-0 w-full h-full object-cover rounded-sm"
                                                        />
                                                        {remainingCount > 0 && (
                                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg md:text-xl rounded-sm">
                                                                +
                                                                {remainingCount}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </article>
                            </Link>
                        );
                    })}
                </div>

                {posts.links && posts.links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-1 mt-8">
                        {posts.links.map((link, index) => {
                            const translatedLabel = link.label
                                .replace("Previous", "Poprzednia")
                                .replace("Next", "Następna");
                            const isUnclickable = !link.url || link.active;

                            return isUnclickable ? (
                                <div
                                    key={index}
                                    className={`px-4 py-2 text-sm border flex items-center justify-center ${
                                        link.active
                                            ? "bg-[#dcb98a] text-white border-[#dcb98a] font-bold shadow-sm"
                                            : "bg-stone-50 text-stone-400 border-stone-200 cursor-not-allowed"
                                    }`}
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: translatedLabel,
                                        }}
                                    />
                                </div>
                            ) : (
                                <Link
                                    key={index}
                                    href={link.url ?? undefined}
                                    preserveScroll
                                    className="px-4 py-2 text-sm border bg-white text-stone-600 border-stone-200 hover:bg-stone-50 hover:border-stone-300 transition-all flex items-center justify-center cursor-pointer"
                                >
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: translatedLabel,
                                        }}
                                    />
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </ParishLayout>
    );
}
