import { Head } from "@inertiajs/react";
import { BookOpen, Calendar, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import ParishLayout from "@/layouts/ParishLayout";

interface IntentionType {
    id: number;
    title: string;
    content: string;
    created_at?: string;
}

interface IntentionsProps {
    intentions: IntentionType[];
}

function sanitizeIntentionHtml(html: string): string {
    return html
        .replace(/&nbsp;/g, " ")
        .replace(/\u00A0/g, " ")
        .replace(/[\u200B-\u200D\uFEFF\u00AD]/g, "")
        .replace(/ style="[^"]*"/gi, "")
        .replace(/ class="[^"]*"/gi, "");
}

const INTENTION_CONTENT_CLASSES =
    "text-base sm:text-[17px] leading-relaxed text-[#38312b] w-full overflow-hidden break-words " +
    "[&_p]:mb-3.5 [&_p:last-child]:mb-0 " +
    "[&_h1]:font-serif [&_h1]:text-xl [&_h1]:font-bold [&_h1]:text-parish-navy [&_h1]:mt-5 [&_h1]:mb-2 " +
    "[&_h2]:font-serif [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-parish-navy [&_h2]:mt-5 [&_h2]:mb-2 " +
    "[&_h3]:font-serif [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-parish-navy [&_h3]:mt-4 [&_h3]:mb-1.5 " +
    "[&_strong]:font-semibold [&_strong]:text-parish-navy " +
    "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 " +
    "[&_li]:mb-1.5";

export default function Intentions({ intentions = [] }: IntentionsProps) {
    const [openArchiveIds, setOpenArchiveIds] = useState<number[]>([]);

    const toggleArchiveItem = (id: number) => {
        setOpenArchiveIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id],
        );
    };

    const latestIntention = intentions.length > 0 ? intentions[0] : null;
    const archivedIntentions = intentions.slice(1);

    return (
        <ParishLayout showpic={false}>
            <Head title="Intencje Mszalne" />

            <div className="flex flex-col gap-7 w-full mx-auto max-w-4xl">
                <header className="text-center space-y-2 border-b border-parish-border pb-6">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-parish-gold-text">
                        Porządek Eucharystii
                    </span>
                    <h1 className="font-serif text-3xl sm:text-4xl font-bold text-parish-navy">
                        Intencje Mszalne
                    </h1>
                    <p className="text-sm sm:text-base text-stone-600">
                        Aktualny porządek intencji oraz archiwum poprzednich
                        tygodni.
                    </p>
                </header>

                {!latestIntention ? (
                    <div className="text-center text-stone-500 italic py-12 bg-white rounded-xl border border-parish-border shadow-xs">
                        Brak dostępnych intencji mszalnych.
                    </div>
                ) : (
                    <>
                        {/* NAJNOWSZE INTENCJE — DOMYŚLNIE ROZWINIĘTE */}
                        <section className="bg-white rounded-xl border border-parish-border border-t-4 border-t-parish-navy shadow-sm overflow-hidden">
                            <div className="p-6 sm:p-8 lg:p-10">
                                <header className="mb-6 pb-5 border-b border-parish-border flex flex-col gap-2.5">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-parish-crimson/10 text-parish-crimson text-xs font-bold uppercase tracking-wider">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            Aktualne
                                        </span>
                                        {latestIntention.created_at && (
                                            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-parish-gold-text">
                                                <Calendar className="w-4 h-4" />
                                                Dodano:{" "}
                                                {new Date(
                                                    latestIntention.created_at,
                                                ).toLocaleDateString("pl-PL", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        )}
                                    </div>
                                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-parish-navy leading-snug">
                                        {latestIntention.title}
                                    </h2>
                                </header>

                                <div
                                    className={INTENTION_CONTENT_CLASSES}
                                    dangerouslySetInnerHTML={{
                                        __html: sanitizeIntentionHtml(
                                            latestIntention.content,
                                        ),
                                    }}
                                />
                            </div>
                        </section>

                        {/* POPRZEDNIE INTENCJE — ZWIJANE W ZAKŁADKI */}
                        {archivedIntentions.length > 0 && (
                            <section className="space-y-3">
                                <div className="flex items-center gap-3 pt-2">
                                    <span className="h-5 w-1 rounded-full bg-parish-gold" />
                                    <h2 className="font-serif text-lg sm:text-xl font-bold text-parish-navy">
                                        Poprzednie intencje
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {archivedIntentions.map((item) => {
                                        const isOpen = openArchiveIds.includes(
                                            item.id,
                                        );

                                        return (
                                            <section
                                                key={item.id}
                                                className="bg-white rounded-xl border border-parish-border shadow-xs overflow-hidden transition-colors hover:border-parish-gold/70"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleArchiveItem(
                                                            item.id,
                                                        )
                                                    }
                                                    aria-expanded={isOpen}
                                                    className="w-full px-5 sm:px-6 py-4 flex items-center justify-between gap-4 text-left hover:bg-parish-sand/40 transition-colors cursor-pointer"
                                                >
                                                    <div className="min-w-0">
                                                        {item.created_at && (
                                                            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-parish-gold-text mb-1">
                                                                <Calendar className="w-3.5 h-3.5" />
                                                                {new Date(
                                                                    item.created_at,
                                                                ).toLocaleDateString(
                                                                    "pl-PL",
                                                                    {
                                                                        day: "numeric",
                                                                        month: "long",
                                                                        year: "numeric",
                                                                    },
                                                                )}
                                                            </div>
                                                        )}
                                                        <h3 className="font-serif text-base sm:text-lg font-bold text-parish-navy leading-snug">
                                                            {item.title}
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
                                                    <div className="px-5 sm:px-6 pb-6 pt-4 border-t border-parish-border/80">
                                                        <div
                                                            className={
                                                                INTENTION_CONTENT_CLASSES
                                                            }
                                                            dangerouslySetInnerHTML={{
                                                                __html: sanitizeIntentionHtml(
                                                                    item.content,
                                                                ),
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </section>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </ParishLayout>
    );
}
