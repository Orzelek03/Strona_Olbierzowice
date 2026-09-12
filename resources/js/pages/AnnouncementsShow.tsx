import React from "react";
import ParishLayout from "@/layouts/ParishLayout";
import { Link } from "@inertiajs/react";

interface Announcement {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
interface PaginatedData {
    data: Announcement[];
    links: PaginationLink[];
}
interface AnnouncementShowProps {
    announcements: PaginatedData;
    title: string;
}

export default function AnnouncementsShow({
    announcements,
    title,
}: AnnouncementShowProps) {
    return (
        <ParishLayout showpic={false}>
            <div className="flex flex-col gap-6 w-full mx-auto max-w-5xl">
                <h1 className="text-2xl font-bold uppercase tracking-widest text-center mb-4 text-stone-900 border-b border-[#cbb085]/30 pb-4">
                    {title}
                </h1>
                {announcements.data.map((announcement) => (
                    <article
                        key={announcement.id}
                        className="bg-white p-6 shadow-sm border-l-4 border-[#dcb98a]"
                    >
                        <header className="mb-3">
                            <h2 className="text-lg font-bold text-stone-800 uppercase tracking-wide">
                                {announcement.title}
                            </h2>
                            <span className="text-xs font-semibold text-stone-500 tracking-wider">
                                {new Date(
                                    announcement.created_at,
                                ).toLocaleDateString("PL-pl")}
                            </span>
                        </header>
                        <div className="text-sm leading-relaxed text-stone-700 text-justify">
                            {announcement.content}
                        </div>
                    </article>
                ))}
                {announcements.data.length === 0 && (
                    <div className="text-center text-stone-500 italic py-8">
                        Brak ogłoszeń
                    </div>
                )}

                {/* Nawigacja paginacji */}
                {announcements.links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-1 mt-8">
                        {announcements.links.map((link, index) => {
                            const translatedlabel = link.label
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
                                            __html: translatedlabel,
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
                                            __html: translatedlabel,
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
