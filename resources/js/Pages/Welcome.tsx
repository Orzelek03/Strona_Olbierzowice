import { Head, Link } from "@inertiajs/react";
import { ArrowRight, Calendar, Clock, Landmark } from "lucide-react";
import React from "react";
import HeroSlider from "@/components/HeroSlider";
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
    return (
        <ParishLayout hero={<HeroSlider />}>
            <Head title="Strona Główna" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEWA KOLUMNA: Powitanie + Aktualności */}
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <section
                        id="powitanie"
                        aria-label="Słowo powitalne"
                        className="relative bg-white rounded-xl border border-parish-gold/55 border-l-4 border-l-parish-gold shadow-sm overflow-hidden scroll-mt-24"
                    >
                        <div className="bg-parish-sand/55 px-6 sm:px-8 py-3.5 border-b border-parish-border flex items-center gap-2.5">
                            <span className="h-0.5 w-6 bg-parish-gold" />
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-parish-gold-text">
                                Szczęść Boże!
                            </span>
                        </div>

                        <div className="p-6 sm:p-8 space-y-4 text-[#38312b] text-[15.5px] sm:text-base leading-relaxed">
                            <h2 className="font-serif text-xl sm:text-2xl font-bold text-parish-navy leading-snug">
                                Witamy na stronie Parafii pw. św. Wawrzyńca w
                                Olbierzowicach!
                            </h2>

                            <p className="font-medium text-parish-navy">
                                Cieszymy się, że odwiedzasz naszą parafialną
                                przestrzeń w sieci.
                            </p>

                            <p>
                                Nasza wspólnota, której patronuje św. Wawrzyniec
                                – diakon i męczennik, od wieków gromadzi
                                wiernych wokół Chrystusa. Bogata historia,
                                sięgająca początków XIII wieku, jest dla nas
                                cennym dziedzictwem, które z wdzięcznością
                                pielęgnujemy i przekazujemy kolejnym pokoleniom.
                            </p>

                            <p>
                                Parafia to przede wszystkim ludzie, wspólna
                                modlitwa, życzliwość i troska o siebie nawzajem.
                                Spotykając się na Eucharystii, przyjmując
                                Sakramenty, pielgrzymując budujemy naszą duchową
                                rodzinę.
                            </p>

                            <p>
                                Zapraszamy do poznania naszej wspólnoty! Na
                                stronie znajdziesz aktualności parafialne,
                                ogłoszenia, godziny Mszy Świętych i nabożeństw,
                                informacje o wydarzeniach oraz historię naszej
                                parafii.
                            </p>

                            <p>
                                Niech ta strona będzie nie tylko źródłem
                                informacji, ale także zaproszeniem do wspólnej
                                modlitwy i pogłębiania wiary.
                            </p>

                            <p className="font-semibold text-parish-navy">
                                Serdecznie zapraszamy!
                            </p>

                            <div className="pt-4 mt-2 border-t border-parish-border/80 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                <div>
                                    <p className="font-serif italic text-parish-gold-text text-sm sm:text-base">
                                        Z modlitwą i błogosławieństwem –
                                    </p>
                                    <p className="font-serif font-semibold text-parish-navy text-sm sm:text-base mt-0.5">
                                        Duszpasterze i wspólnota Parafii pw. św.
                                        Wawrzyńca w Olbierzowicach
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Aktualności parafialne */}
                    <section className="flex flex-col gap-6">
                        <div className="flex items-center justify-between border-b border-parish-border pb-3.5">
                            <div className="flex items-center gap-3">
                                <span className="h-6 w-1 rounded-full bg-parish-gold" />
                                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-parish-navy">
                                    Aktualności parafialne
                                </h1>
                            </div>
                            <Link
                                href="/galeria"
                                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-parish-gold-text hover:text-parish-navy transition-colors"
                            >
                                <span>Galeria zdjęć</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-5">
                            {posts.data.length === 0 && (
                                <div className="text-center text-stone-500 italic py-12 bg-white rounded-xl border border-parish-border shadow-xs">
                                    Brak aktualności do wyświetlenia.
                                </div>
                            )}

                            {posts.data.map((post) => {
                                const photos = post.image_path
                                    ? [post.image_path]
                                    : [];

                                if (post.album && post.album.photos) {
                                    post.album.photos.forEach((photo) =>
                                        photos.push(photo.image_path),
                                    );
                                }

                                const displayPhotos = photos.slice(0, 3);
                                const remainingCount = photos.length - 3;

                                return (
                                    <Link
                                        key={post.id}
                                        href={`/aktualnosci/${post.id}`}
                                        className="block group"
                                    >
                                        <article className="bg-white rounded-xl border border-parish-border shadow-xs group-hover:shadow-md group-hover:border-parish-gold/60 transition-all duration-300 overflow-hidden flex flex-col md:flex-row">
                                            {/* Treść posta */}
                                            <div
                                                className={`p-6 flex flex-col justify-between flex-grow ${
                                                    displayPhotos.length > 0
                                                        ? "md:w-3/5"
                                                        : "w-full"
                                                }`}
                                            >
                                                <div>
                                                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-parish-gold-text mb-2">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <time>
                                                            {new Date(
                                                                post.created_at,
                                                            ).toLocaleDateString(
                                                                "pl-PL",
                                                                {
                                                                    day: "numeric",
                                                                    month: "long",
                                                                    year: "numeric",
                                                                },
                                                            )}
                                                        </time>
                                                    </div>

                                                    <h2 className="font-serif text-xl font-bold text-parish-navy group-hover:text-parish-gold-text transition-colors line-clamp-2 leading-snug mb-3">
                                                        {post.title}
                                                    </h2>

                                                    <p className="text-sm sm:text-[15px] leading-relaxed text-[#463f38] line-clamp-3 md:line-clamp-4">
                                                        {post.content}
                                                    </p>
                                                </div>

                                                <div className="mt-5 pt-4 border-t border-parish-border/70 flex items-center justify-between">
                                                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-parish-navy group-hover:text-parish-gold-text transition-colors">
                                                        <span>
                                                            Czytaj więcej
                                                        </span>
                                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                                    </span>
                                                    {photos.length > 1 && (
                                                        <span className="text-xs text-stone-500 font-medium">
                                                            {photos.length}{" "}
                                                            zdjęć
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Zdjęcia po prawej */}
                                            {displayPhotos.length > 0 && (
                                                <div className="p-4 pt-0 md:pt-4 md:pl-0 w-full md:w-2/5 flex-shrink-0 flex">
                                                    {displayPhotos.length ===
                                                        1 && (
                                                        <div className="w-full h-52 md:h-full min-h-[13.5rem] relative rounded-lg overflow-hidden bg-parish-sand">
                                                            <img
                                                                src={
                                                                    displayPhotos[0]
                                                                }
                                                                alt={post.title}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                            />
                                                        </div>
                                                    )}

                                                    {displayPhotos.length ===
                                                        2 && (
                                                        <div className="w-full grid grid-cols-2 gap-1.5 h-52 md:h-full min-h-[13.5rem]">
                                                            <div className="relative rounded-lg overflow-hidden bg-parish-sand">
                                                                <img
                                                                    src={
                                                                        displayPhotos[0]
                                                                    }
                                                                    alt={`${post.title} - zdjęcie 1`}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            </div>
                                                            <div className="relative rounded-lg overflow-hidden bg-parish-sand">
                                                                <img
                                                                    src={
                                                                        displayPhotos[1]
                                                                    }
                                                                    alt={`${post.title} - zdjęcie 2`}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {displayPhotos.length >=
                                                        3 && (
                                                        <div className="w-full grid grid-cols-3 gap-1.5 h-52 md:h-full min-h-[13.5rem]">
                                                            <div className="col-span-2 relative rounded-lg overflow-hidden bg-parish-sand">
                                                                <img
                                                                    src={
                                                                        displayPhotos[0]
                                                                    }
                                                                    alt={`${post.title} - główne zdjęcie`}
                                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                                />
                                                            </div>
                                                            <div className="col-span-1 flex flex-col gap-1.5 h-full">
                                                                <div className="relative flex-1 rounded-lg overflow-hidden bg-parish-sand">
                                                                    <img
                                                                        src={
                                                                            displayPhotos[1]
                                                                        }
                                                                        alt={`${post.title} - zdjęcie 2`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                </div>
                                                                <div className="relative flex-1 rounded-lg overflow-hidden bg-parish-sand">
                                                                    <img
                                                                        src={
                                                                            displayPhotos[2]
                                                                        }
                                                                        alt={`${post.title} - zdjęcie 3`}
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                    {remainingCount >
                                                                        0 && (
                                                                        <div className="absolute inset-0 bg-parish-navy-dark/70 flex items-center justify-center text-white font-bold text-base">
                                                                            +
                                                                            {
                                                                                remainingCount
                                                                            }
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </article>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Paginacja */}
                        {posts.links && posts.links.length > 3 && (
                            <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                                {posts.links.map((link, index) => {
                                    const translatedLabel = link.label
                                        .replace("Previous", "Poprzednia")
                                        .replace("Next", "Następna");
                                    const isUnclickable =
                                        !link.url || link.active;

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
                    </section>
                </div>

                {/* PRAWA KOLUMNA: Msze Święte i Nasza Parafia */}
                <aside className="lg:col-span-4 flex flex-col gap-6">
                    {/* Karta: Msze Święte */}
                    <section
                        id="msze-swiete"
                        className="bg-white rounded-xl border border-parish-border shadow-xs overflow-hidden scroll-mt-24"
                    >
                        <div className="bg-parish-navy text-white px-5 py-4 flex items-center gap-3 border-b border-parish-gold/50">
                            <Clock className="w-5 h-5 text-parish-gold-light shrink-0" />
                            <div>
                                <h2 className="font-serif font-bold text-lg leading-tight">
                                    Msze Święte
                                </h2>
                                <p className="text-xs text-[#c7d3e3]">
                                    Stały porządek nabożeństw
                                </p>
                            </div>
                        </div>

                        <div className="p-5 space-y-5 text-sm">
                            <div>
                                <h3 className="font-serif font-bold text-parish-navy text-base flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-parish-crimson" />
                                    Kościół w Olbierzowicach
                                </h3>
                                <div className="space-y-1.5 pl-4 text-[#463f38]">
                                    <p>
                                        <span className="font-semibold text-parish-navy">
                                            Niedziele:
                                        </span>{" "}
                                        7:30, 10:30, 12:00, 17:00{" "}
                                        <span className="text-xs text-stone-500">
                                            (zimą 16:00)
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-semibold text-parish-navy">
                                            Dni powszednie:
                                        </span>{" "}
                                        18:00, 18:30{" "}
                                        <span className="text-xs text-stone-500">
                                            (zimą 17:00, 17:30)
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-parish-border pt-4">
                                <h3 className="font-serif font-bold text-parish-navy text-base flex items-center gap-2 mb-2">
                                    <span className="w-2 h-2 rounded-full bg-parish-gold" />
                                    Kaplica w Nawodzicach
                                </h3>
                                <div className="space-y-1.5 pl-4 text-[#463f38]">
                                    <p>
                                        <span className="font-semibold text-parish-navy">
                                            Niedziele:
                                        </span>{" "}
                                        9:00
                                    </p>
                                    <p>
                                        <span className="font-semibold text-parish-navy">
                                            Dni powszednie:
                                        </span>{" "}
                                        16:30{" "}
                                        <span className="text-xs text-stone-500">
                                            (zimą 15:30)
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div className="pt-2 flex gap-2">
                                <Link
                                    href="/intencje"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 bg-parish-sand hover:bg-parish-navy text-parish-navy hover:text-white font-semibold text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg transition-colors"
                                >
                                    <span>Intencje</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                    href="/kontakt"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 border border-parish-border hover:border-parish-navy text-parish-navy font-semibold text-xs uppercase tracking-wider py-2.5 px-3 rounded-lg transition-colors"
                                >
                                    <span>Kancelaria</span>
                                </Link>
                            </div>
                        </div>
                    </section>

                    {/* Karta: Nasza Parafia */}
                    <section className="bg-parish-sand/65 rounded-xl border border-parish-border shadow-xs overflow-hidden">
                        <div className="relative h-52 overflow-hidden bg-parish-navy">
                            <img
                                src="/images/kosciol-zewnatrz.jpg"
                                alt="Kościół pw. św. Wawrzyńca w Olbierzowicach"
                                className="w-full h-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-parish-navy-dark/80 via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-4 right-4 text-white flex items-center gap-2">
                                <Landmark className="w-4 h-4 text-parish-gold-light shrink-0" />
                                <h2 className="font-serif font-bold text-lg">
                                    Nasza Parafia
                                </h2>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <p className="text-sm leading-relaxed text-[#463f38]">
                                Poznaj ponad 700-letnią historię kościoła św.
                                Wawrzyńca, kaplicy w Nawodzicach i ludzi, którzy
                                przez pokolenia tworzyli naszą wspólnotę wiary.
                            </p>

                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/historia"
                                    className="inline-flex items-center justify-center gap-2 bg-parish-navy hover:bg-parish-navy-dark text-white font-semibold text-sm py-2.5 px-4 rounded-lg transition-colors"
                                >
                                    <span>Poznaj historię parafii</span>
                                    <ArrowRight className="w-4 h-4 text-parish-gold-light" />
                                </Link>
                            </div>
                        </div>
                    </section>
                </aside>
            </div>
        </ParishLayout>
    );
}
