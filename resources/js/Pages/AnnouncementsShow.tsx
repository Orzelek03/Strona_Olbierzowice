import { Head, Link, usePage } from "@inertiajs/react";
import { Calendar, ChevronDown, Megaphone } from "lucide-react";
import React, { useState } from "react";
import ParishLayout from "@/layouts/ParishLayout";

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
    current_page?: number;
}

interface AnnouncementShowProps {
    announcements: PaginatedData;
    title: string;
}

const SECTION_TABS = [
    { label: "Olbierzowice", href: "/ogloszenia/olbierzowice" },
    { label: "Nawodzice", href: "/ogloszenia/nawodzice" },
    { label: "Katechezy", href: "/katechezy" },
];

export default function AnnouncementsShow({
    announcements,
    title,
}: AnnouncementShowProps) {
    const currentPath = usePage().url.split("?")[0];
    const isFirstPage = (announcements.current_page ?? 1) === 1;
    const latestId =
        isFirstPage && announcements.data.length > 0
            ? announcements.data[0].id
            : null;

    const [openArchiveIds, setOpenArchiveIds] = useState<number[]>([]);

    const toggleArchiveItem = (id: number) => {
        setOpenArchiveIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const latestAnnouncement =
        isFirstPage && announcements.data.length > 0
            ? announcements.data[0]
            : null;
    const archivedAnnouncements = isFirstPage
        ? announcements.data.slice(1)
        : announcements.data;

    return (
        <ParishLayout showpic={false}>
            <Head title={title} />

            <div className="flex flex-col gap-7 w-full mx-auto max-w-4xl">
                {/* Nagłówek i szybkie zakładki działów */}
                <header className="space-y-5 border-b border-parish-border pb-6">
                    <div className="text-center space-y-2">
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-parish-gold-text">
                            Aktualności Duszpasterskie
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-parish-navy">
                            {title}
                        </h1>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {SECTION_TABS.map((tab) => {
                            const active = currentPath === tab.href;
                            return (
                                <Link
                                    key={tab.href}
                                    href={tab.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                                        active
                                            ? "bg-parish-navy text-white shadow-xs"
                                            : "bg-white text-parish-navy border border-parish-border hover:bg-parish-sand"
                                    }`}
                                >
                                    {tab.label}
                                </Link>
                            );
                        })}
                    </div>
                </header>

                {announcements.data.length === 0 ? (
                    <div className="text-center text-stone-500 italic py-12 bg-white rounded-xl border border-parish-border shadow-xs">
                        Brak aktualnych ogłoszeń w tym dziale.
                    </div>
                ) : (
                    <>
                        {/* NAJNOWSZE OGŁOSZENIE — DOMYŚLNIE ROZWINIĘTE */}
                        {latestAnnouncement && (
                            <article className="bg-white rounded-xl border border-parish-border border-t-4 border-t-parish-navy shadow-sm overflow-hidden">
                                <div className="p-6 sm:p-8 lg:p-10">
                                    <header className="mb-6 pb-5 border-b border-parish-border flex flex-col gap-2.5">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-parish-crimson/10 text-parish-crimson text-xs font-bold uppercase tracking-wider">
                                                <Megaphone className="w-3.5 h-3.5" />
                                                Aktualne
                                            </span>
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-parish-gold-text">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(
                                                    latestAnnouncement.created_at,
                                                ).toLocaleDateString("pl-PL", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                        <h2 className="font-serif text-xl sm:text-2xl font-bold text-parish-navy leading-snug">
                                            {latestAnnouncement.title}
                                        </h2>
                                    </header>

                                    <div className="text-base sm:text-[17px] leading-relaxed text-[#38312b] space-y-4">
                                        {latestAnnouncement.content
                                            .split("\n")
                                            .map((paragraph, index) =>
                                                paragraph.trim() !== "" ? (
                                                    <p key={index}>
                                                        {paragraph}
                                                    </p>
                                                ) : null,
                                            )}
                                    </div>
                                </div>
                            </article>
                        )}

                        {/* POPRZEDNIE OGŁOSZENIA — ZWIJANE W ZAKŁADKI */}
                        {archivedAnnouncements.length > 0 && (
                            <section className="space-y-3">
                                <div className="flex items-center gap-3 pt-2">
                                    <span className="h-5 w-1 rounded-full bg-parish-gold" />
                                    <h2 className="font-serif text-lg sm:text-xl font-bold text-parish-navy">
                                        {latestId !== null
                                            ? "Poprzednie ogłoszenia"
                                            : "Archiwum ogłoszeń"}
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {archivedAnnouncements.map(
                                        (announcement) => {
                                            const isOpen =
                                                openArchiveIds.includes(
                                                    announcement.id,
                                                );

                                            return (
                                                <article
                                                    key={announcement.id}
                                                    className="bg-white rounded-xl border border-parish-border shadow-xs overflow-hidden transition-colors hover:border-parish-gold/70"
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleArchiveItem(
                                                                announcement.id,
                                                            )
                                                        }
                                                        aria-expanded={isOpen}
                                                        className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-parish-sand/40 transition-colors cursor-pointer"
                                                    >
                                                        <div className="min-w-0">
                                                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-parish-gold-text mb-1">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                {new Date(
                                                                    announcement.created_at,
                                                                ).toLocaleDateString(
                                                                    "pl-PL",
                                                                    {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    },
                                                                )}
                                                            </div>
                                                            <h3 className="font-serif text-base sm:text-lg font-bold text-parish-navy leading-snug">
                                                                {
                                                                    announcement.title
                                                                }
                                                            </h3>
                                                        </div>
                                                        <span className="w-9 h-9 rounded-lg bg-parish-sand/80 flex items-center justify-center text-parish-navy shrink-0">
                                                            <ChevronDown
                                                                className={`w-5 h-5 transition-transform duration-200 ${
                                                                    isOpen
                                                                        ? "rotate-180"
                                                                        : ""
                                                                }`}
                                                            />
                                                        </span>
                                                    </button>

                                                    {isOpen && (
                                                        <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-parish-border/80 text-base sm:text-[17px] leading-relaxed text-[#38312b] space-y-4">
                                                            {announcement.content
                                                                .split("\n")
                                                                .map(
                                                                    (
                                                                        paragraph,
                                                                        index,
                                                                    ) =>
                                                                        paragraph.trim() !==
                                                                        "" ? (
                                                                            <p
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    paragraph
                                                                                }
                                                                            </p>
                                                                        ) : null,
                                                                )}
                                                        </div>
                                                    )}
                                                </article>
                                            );
                                        },
                                    )}
                                </div>
                            </section>
                        )}
                    </>
                )}

                {/* Paginacja */}
                {announcements.links.length > 3 && (
                    <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                        {announcements.links.map((link, index) => {
                            const translatedLabel = link.label
                                .replace("Previous", "Poprzednia")
                                .replace("Next", "Następna");
                            const isUnclickable = !link.url || link.active;

                            return isUnclickable ? (
                                <span
                                    key={index}
                                    className={`px-4 py-2 text-sm rounded-lg border flex items-center justify-center ${
                                        link.active
                                            ? "bg-parish-navy text-white border-parish-navy font-semibold shadow-xs"
                                            : "bg-parish-sand/50 text-stone-400 border-parish-border cursor-not-allowed"
                                    }`}
                                    dangerouslySetInnerHTML={{
                                        __html: translatedLabel,
                                    }}
                                />
                            ) : (
                                <Link
                                    key={index}
                                    href={link.url ?? undefined}
                                    preserveScroll
                                    className="px-4 py-2 text-sm rounded-lg border bg-white text-parish-navy border-parish-border hover:bg-parish-sand hover:border-parish-gold/60 transition-all flex items-center justify-center cursor-pointer"
                                    dangerouslySetInnerHTML={{
                                        __html: translatedLabel,
                                    }}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </ParishLayout>
    );
}
